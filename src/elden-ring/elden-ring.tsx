import styles from './elden-ring.module.scss';

import { ChatCompletionMessageParam } from 'openai/resources';
import { ElementType, useEffect, useMemo, useRef, useState } from 'react';
import { GoCrossReference } from 'react-icons/go';
import { Tooltip } from 'react-tooltip';
import Chatbot, { ChatbotRef } from '../components/chatbot/chatbot';
import Slide from '../components/slide/slide';
import { EldenRingEmbeddings } from '../models/elden-ring-embeddings.model';

type EldenRingMessage = ChatCompletionMessageParam & {
  references?: Array<Pick<EldenRingEmbeddings, 'itemName' | 'referenceUrl'>>;
};

export default function EldenRingPage() {
  const chatbotRef = useRef<ChatbotRef>(null);

  const [messages, setMessages] = useState<Array<EldenRingMessage>>([
    {
      content: `Hi, I'm an Elden Ring bot. Ask me questions about Elden Ring lore.`,
      role: 'system',
    },
  ]);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chatbotRef.current?.scrollDown();
  }, [chatbotRef, messages]);

  const tooltipId = useMemo(() => `message-reference`, []);

  const CrossReferenceIcon = GoCrossReference as ElementType;

  return (
    <Slide className={styles.eldenRingPage}>
      <>
        <h1>Elden Ring lore chatbot</h1>
        <p>I am such an Elden Ring nerd.</p>
        <p>
          One of the peculiarities of Elden Ring is that most of the story is
          told through text, usually item descriptions.
        </p>
        <p>
          I thought it would be funny to sum up my current knowledge on AI by
          making a bot that answers Elden Ring lore questions using a database
          fed with Elden Ring item descriptions.
        </p>
        <Chatbot
          ref={chatbotRef}
          className={styles.eldenRingChatbot}
          messages={messages}
          disabled={disabled}
          messageActions={[
            (message: EldenRingMessage, i) => {
              if (message.role === 'system' && i > 0) {
                return (
                  <>
                    <button
                      className={styles.eldenRingCitationButton}
                      data-tooltip-id={tooltipId}
                      data-tooltip-content="Click to see references"
                      onClick={() => {
                        chatbotRef.current?.openSidebar({
                          header: `References for "${messages[i - 1].content}"`,
                          content: (
                            <ol>
                              {message.references?.map((reference, i) => (
                                <li className={styles.reference} key={i}>
                                  <a href={reference.referenceUrl}>
                                    {reference.itemName}
                                  </a>
                                </li>
                              ))}
                            </ol>
                          ),
                        });
                      }}
                    >
                      <CrossReferenceIcon />
                    </button>
                  </>
                );
              }
            },
          ]}
          onSubmit={async (query) => {
            const newMessages = messages.concat({
              content: query,
              role: 'user',
            });

            setDisabled(true);

            try {
              setMessages(newMessages);

              const response = await fetch('/api/elden-ring/query', {
                method: 'POST',
                body: JSON.stringify({ messages: newMessages }),
                headers: { 'Content-Type': 'application/json' },
              });

              const stream = response.body!.getReader();

              let streamDone = false;
              let content = '';
              let references: Array<
                Pick<EldenRingEmbeddings, 'itemName' | 'referenceUrl'>
              > = [];

              while (!streamDone) {
                const { done, value } = await stream.read();

                const decodedValue = new TextDecoder().decode(value);

                /*
                 * It looks like the reader can ingest multiple chunks at a time.
                 * So... I will try to split them up.
                 */
                const payloadRegex = /(\{.+?\})/g;

                const matches = [...decodedValue.matchAll(payloadRegex)];

                for (const match of matches) {
                  const payload = JSON.parse(match[1]);

                  if (payload.content) {
                    content += payload.content;
                  } else if (payload.referenceUrl) {
                    references.push(payload);
                  }
                }

                setMessages(
                  newMessages.concat({ role: 'system', content, references })
                );

                streamDone = done;
              }
            } finally {
              setDisabled(false);
            }
          }}
        />
        <Tooltip id={tooltipId} place="top" />
      </>
    </Slide>
  );
}
