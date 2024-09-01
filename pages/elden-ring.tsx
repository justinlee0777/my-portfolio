import styles from './elden-ring.module.scss';

import { ChatCompletionMessageParam } from 'openai/resources';
import { useEffect, useRef, useState } from 'react';
import Chatbot, { ChatbotRef } from '../src/components/chatbot/chatbot';
import Slide from '../src/components/slide/slide';
import { getBasePageProps } from '../src/page-utils/get-base-page-props.function';

export async function getStaticProps() {
  return {
    props: await getBasePageProps('en', '', true),
  };
}

export default function EldenRingPage() {
  const chatbotRef = useRef<ChatbotRef>(null);

  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>([
    {
      content: `Hi, I'm an Elden Ring bot. Ask me questions about Elden Ring lore.`,
      role: 'system',
    },
  ]);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chatbotRef.current?.scrollDown();
  }, [chatbotRef, messages]);

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
          messages={messages}
          disabled={disabled}
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

              while (!streamDone) {
                const { done, value } = await stream.read();

                content += new TextDecoder().decode(value);

                setMessages(newMessages.concat({ role: 'system', content }));

                streamDone = done;
              }
            } finally {
              setDisabled(false);
            }
          }}
        />
      </>
    </Slide>
  );
}
