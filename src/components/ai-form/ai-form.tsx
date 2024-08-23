import styles from './ai-form.module.scss';

import set from 'lodash-es/set';
import { useMemo, useState } from 'react';

import FormMetadataConfig, { FormMetadata } from '../../utils/ai-form-config';

interface Message {
  content: string;
  type: 'user' | 'system';
}

export default function AIForm(): JSX.Element {
  const formConfig: FormMetadataConfig = useMemo(
    () => ({
      firstName: {
        type: 'string',
        label: `What's your first name?`,
      },
      lastName: {
        type: 'string',
        label: `What's your last name?`,
      },
      age: {
        type: 'number',
        label: `What's your age?`,
      },
      personal: {
        coffee: {
          type: 'boolean',
          label: 'Do you drink coffee?',
        },
        pineapplePizza: {
          type: 'boolean',
          label: `Do you like pineapple on pizza?`,
        },
        musicalInstrument: {
          type: 'boolean',
          label: `Can you play a musical instrument?`,
        },
      },
    }),
    []
  );

  const [formValue, setFormValue] = useState<any>({});

  const [messages, setMessages] = useState<Array<Message>>([]);

  function fetchNextQuestion() {
    const formMetadata = new FormMetadata(formConfig, formValue);
    const nextQuestion = formMetadata.getNextQuestionPrompt();

    if (nextQuestion !== null) {
      setMessages((oldMessages) =>
        oldMessages.concat({
          content: nextQuestion.config.label,
          type: 'system',
        })
      );
    } else {
      setMessages((oldMessages) =>
        oldMessages.concat({
          content: 'The form is finished. Thank you!',
          type: 'system',
        })
      );
    }

    return nextQuestion;
  }

  const [currentQuestion, setCurrentQuestion] = useState(fetchNextQuestion);

  const [inputValue, setInputValue] = useState('');

  const [disabled, setDisabled] = useState(false);

  return (
    <div className={styles.formContent}>
      <div>Current form value: {JSON.stringify(formValue, null, 2)}</div>
      <div className={styles.messages}>
        {messages.map((message, i) => (
          <p key={i} className={styles[`message_${message.type}`]}>
            {message.content}
          </p>
        ))}
      </div>
      {currentQuestion !== null && (
        <form
          className={styles.inputRow}
          onSubmit={async (event) => {
            event.preventDefault();

            setDisabled(true);
            setMessages((oldMessages) =>
              oldMessages.concat({ content: inputValue, type: 'user' })
            );

            try {
              setInputValue('');

              const response = await fetch('/api/ai-form/answer', {
                method: 'POST',
                body: JSON.stringify({
                  formConfig: currentQuestion.config,
                  answer: inputValue,
                }),
              });

              const responseJson = await response.json();

              const coercedInputValue = responseJson.value;

              if (coercedInputValue !== null) {
                const newFormValue = set(
                  formValue,
                  currentQuestion.config.path,
                  coercedInputValue
                );

                setFormValue(newFormValue);

                const nextQuestion = fetchNextQuestion();
                setCurrentQuestion(nextQuestion);

                setInputValue('');
              } else {
                setMessages((oldMessages) =>
                  oldMessages.concat({
                    content:
                      responseJson.answer ??
                      `There was an error understanding your response. Please try again.`,
                    type: 'system',
                  })
                );
              }
            } finally {
              setDisabled(false);
            }
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
