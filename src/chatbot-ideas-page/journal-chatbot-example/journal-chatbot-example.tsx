import './journal-chatbot.globals.scss';

import {
  JournalChatbot,
  JournalEntry,
  JournalEntryMessage,
} from 'ai-ui-components/JournalChatbot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { JSX, useState } from 'react';
import { journalChatbotInitial } from './initial';

interface Props {
  useInitial?: boolean;
}

export function JournalChatbotExample({ useInitial }: Props): JSX.Element {
  const [entries, setEntries] = useState<Array<JournalEntry>>(() => {
    if (useInitial) {
      return journalChatbotInitial;
    } else {
      return [];
    }
  });

  return (
    <JournalChatbot
      entries={entries}
      enableClickEvents
      bindListenersToRoot
      sendMessage={async (entry, input, entryIndex) => {
        const userMessage: JournalEntryMessage = {
          speaker: 'user',
          content: input,
        };

        let messages = entries
          .flatMap((entry) => {
            return entry.messages.map((message) => {
              return {
                role: message.speaker === 'ai' ? 'system' : 'user',
                content: message.content,
              } as ChatCompletionMessageParam;
            });
          })
          .concat({
            role: userMessage.speaker,
            content: userMessage.content,
          } as ChatCompletionMessageParam);

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

          const newEntry: JournalEntry = {
            ...entry,
            messages: entry.messages.concat(userMessage, {
              speaker: 'ai',
              content: finalMessage,
            }),
          };

          setEntries([
            ...entries.slice(0, entryIndex),
            newEntry,
            ...entries.slice(entryIndex + 1),
          ]);
          streamDone = done;
        }
      }}
    />
  );
}
