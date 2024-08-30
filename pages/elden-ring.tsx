import { ChatCompletionMessageParam } from 'openai/resources';
import { useEffect, useRef, useState } from 'react';
import Chatbot, { ChatbotRef } from '../src/components/chatbot/chatbot';
import { getBasePageProps } from '../src/page-utils/get-base-page-props.function';

export async function getStaticProps() {
  return {
    props: await getBasePageProps('en', '', true),
  };
}

export default function EldenRingPage() {
  const chatbotRef = useRef<ChatbotRef>();

  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>([
    {
      content: `Hi, I'm an Elden Ring bot. Ask me questions about Elden Ring lore.`,
      role: 'system',
    },
  ]);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chatbotRef.current.scrollDown();
  }, [chatbotRef, messages]);

  return (
    <Chatbot
      ref={chatbotRef}
      messages={messages}
      disabled={disabled}
      onSubmit={async (query) => {
        const newMessages = messages.concat({ content: query, role: 'user' });

        setDisabled(true);

        try {
          setMessages(newMessages);

          const response = await fetch('/api/elden-ring/query', {
            method: 'POST',
            body: JSON.stringify({ messages: newMessages }),
            headers: { 'Content-Type': 'application/json' },
          });

          const content = await response.json();

          setMessages((currentMessages) =>
            currentMessages.concat({ role: 'system', content })
          );
        } finally {
          setDisabled(false);
        }
      }}
    />
  );
}
