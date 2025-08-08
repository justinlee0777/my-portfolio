import styles from './form-chatbot-example.module.scss';

import { FormChatbot, FormItemType } from 'ai-ui-components/FormChatbot';
import { JSX, useState } from 'react';

import { ChatCompletionMessageParam } from 'openai/resources';
import { fitnessPromptTemplate } from './form-templates';

export function FormChatbotExample(): JSX.Element {
  const [prompt, setPrompt] = useState(() => {
    return fitnessPromptTemplate.replaceAll(/\$\{.+?\}/g, '__');
  });

  const [sent, setSent] = useState(false);

  const [response, setResponse] = useState<string | undefined>();

  return (
    <div className={styles.formChatbotContainer}>
      <FormChatbot
        promptTemplate={fitnessPromptTemplate}
        onChange={setPrompt}
        tokenConfig={{
          endingDate: {
            transform: (value) => value,
            type: FormItemType.STRING,
          },
          healthCircumstances: {
            transform: (value) => {
              value = value.filter(Boolean);
              if (value.length > 0) {
                return `I have the following health circumstances:\n${value
                  .map((str) => `- ${str}`)
                  .join('\n')}`;
              } else {
                return '';
              }
            },
            type: FormItemType.ARRAY,
          },
          dietaryRestrictions: {
            transform: (value) => {
              value = value.filter(Boolean);
              if (value.length > 0) {
                return `I have the follow dietary restrictions:\n${value
                  .map((str) => `- ${str}`)
                  .join('\n')}`;
              } else {
                return '';
              }
            },
            type: FormItemType.ARRAY,
          },
        }}
      />
      {!response && (
        <button
          type="submit"
          disabled={sent}
          onClick={async (event) => {
            event.preventDefault();

            try {
              setSent(true);

              const messages: Array<ChatCompletionMessageParam> = [
                {
                  role: 'user',
                  content: prompt,
                },
              ];

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

                setResponse(finalMessage);

                streamDone = done;
              }
            } catch {
              setSent(false);
            }
          }}
        >
          {sent ? 'Loading...' : 'Send'}
        </button>
      )}
      {response && <p className={styles.formChatbotResponse}>{response}</p>}
    </div>
  );
}
