import { createLinkElement, Link } from '../../config/link.model';
import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface ErrorScreenProps {
  linkedMessage?: Link;

  errorMessages?: Array<string>;
}

export const defaultLinkedMessage: Link = {
  templateString:
    "This resource could not be loaded. Please contact ${leej40@outlook.com} and, if possible, add a screenshot and the cURL to the email's body.",
  urls: ['mailto:leej40@outlook.com'],
};

export default function ErrorScreen({
  linkedMessage = defaultLinkedMessage,
  errorMessages,
}: ErrorScreenProps): JSX.Element {
  return (
    <>
      <UnitTestCheck componentName="ErrorScreen" />
      <p
        dangerouslySetInnerHTML={{ __html: createLinkElement(linkedMessage) }}
      ></p>
      {errorMessages?.map((errorMessage, i) => (
        <p key={i}>{errorMessage}</p>
      ))}
    </>
  );
}
