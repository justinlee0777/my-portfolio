import { ChatCompletionMessageParam } from 'openai/resources';
import { useState } from 'react';
import styles from './chatbot.module.scss';

interface Props {
  messages: Array<ChatCompletionMessageParam>;

  disabled?: boolean;
  headerContent?: JSX.Element;
  hideInput?: boolean;

  onSubmit?: (query: string) => void;
}

export default function Chatbot({
  messages,
  disabled,
  headerContent,
  hideInput,
  onSubmit,
}: Props): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.formContent}>
      {headerContent}
      <div className={styles.messages}>
        {messages.map((message, i) => (
          <p key={i} className={styles[`message_${message.role}`]}>
            {message.content as string}
          </p>
        ))}
      </div>
      {!hideInput && (
        <form
          className={styles.inputRow}
          onSubmit={async (event) => {
            event.preventDefault();

            onSubmit(inputValue);

            setInputValue('');
          }}
        >
          <input
            className={styles.input}
            value={inputValue}
            disabled={disabled}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit" disabled={disabled}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
