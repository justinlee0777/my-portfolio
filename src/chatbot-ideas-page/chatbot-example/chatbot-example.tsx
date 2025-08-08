import './chatbot-example.globals.scss';
import styles from './chatbot-example.module.scss';

import { JSX, useState } from 'react';

import { Chatbot, ChatbotMessage } from 'ai-ui-components/Chatbot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { defaultChatbotMessages } from './initial';

interface Props {
  useInitial?: boolean;
}

export function ChatbotExample({ useInitial }: Props): JSX.Element {
  const [messages, setMessages] = useState<Array<ChatbotMessage>>(() => {
    if (useInitial) {
      return defaultChatbotMessages;
    } else {
      return [];
    }
  });

  return (
    <>
      <Chatbot
        className={styles.customChatbot}
        messages={messages}
        sendMessage={async (input) => {
          const userMessage: ChatbotMessage = {
            speaker: 'human',
            content: input,
          };

          let apiMessages = messages
            .map((message) => {
              return {
                role: message.speaker === 'ai' ? 'system' : 'user',
                content: message.content,
              } as ChatCompletionMessageParam;
            })
            .concat({
              role: 'user',
              content: userMessage.content,
            } as unknown as ChatCompletionMessageParam);

          setMessages([...messages, userMessage]);

          const apiResponse = await fetch('/api/chatbot-ideas/chat', {
            method: 'POST',
            body: JSON.stringify({ messages }),
          });

          const stream = apiResponse.body!.getReader();

          let finalMessage = '';
          let streamDone = false;

          while (!streamDone) {
            const { done, value } = await stream.read();

            const decodedValue = new TextDecoder().decode(value);
            finalMessage += decodedValue;

            const newMessage: ChatbotMessage = {
              speaker: 'ai',
              content: finalMessage,
            };

            setMessages([...messages, userMessage, newMessage]);

            streamDone = done;
          }
        }}
      />
    </>
  );
}
