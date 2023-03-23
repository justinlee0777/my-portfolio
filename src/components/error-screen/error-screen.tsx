import { createLinkElement, Link } from '../../config/link.model';
import UnitTestCheck from '../unit-test-check/unit-test-check';

export interface ErrorScreenProps {
  linkedMessage: Link;

  errorMessages?: Array<string>;
}

export default function ErrorScreen({
  linkedMessage,
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
