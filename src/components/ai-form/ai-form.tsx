import set from 'lodash-es/set';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChatCompletionMessageParam } from 'openai/resources';
import FormMetadataConfig, { FormMetadata } from '../../utils/ai-form-config';
import Chatbot, { ChatbotRef } from '../chatbot/chatbot';

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

  const chatbotRef = useRef<ChatbotRef>();

  const [formValue, setFormValue] = useState<any>({});

  const [messages, setMessages] = useState<Array<ChatCompletionMessageParam>>(
    []
  );

  function fetchNextQuestion() {
    const formMetadata = new FormMetadata(formConfig, formValue);
    const nextQuestion = formMetadata.getNextQuestionPrompt();

    if (nextQuestion !== null) {
      setMessages((oldMessages) =>
        oldMessages.concat({
          content: nextQuestion.config.label,
          role: 'system',
        })
      );
    } else {
      setMessages((oldMessages) =>
        oldMessages.concat({
          content: 'The form is finished. Thank you!',
          role: 'system',
        })
      );
    }

    return nextQuestion;
  }

  const [currentQuestion, setCurrentQuestion] = useState(fetchNextQuestion);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chatbotRef.current.scrollDown();
  }, [chatbotRef, messages]);

  return (
    <Chatbot
      ref={chatbotRef}
      messages={messages}
      disabled={disabled}
      headerContent={
        <div>Current form value: {JSON.stringify(formValue, null, 2)}</div>
      }
      hideInput={currentQuestion === null}
      onSubmit={async (inputValue) => {
        setDisabled(true);
        setMessages((oldMessages) =>
          oldMessages.concat({ content: inputValue, role: 'user' })
        );

        try {
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
          } else {
            setMessages((oldMessages) =>
              oldMessages.concat({
                content:
                  responseJson.answer ??
                  `There was an error understanding your response. Please try again.`,
                role: 'system',
              })
            );
          }
        } finally {
          setDisabled(false);
        }
      }}
    />
  );
}
