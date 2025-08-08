import {
  BasePageProps,
  getBasePageProps,
} from './get-base-page-props.function';

export type ChatbotIdeasProps = BasePageProps;

export async function getStaticProps(): Promise<{ props: ChatbotIdeasProps }> {
  const baseProps = await getBasePageProps('en', '', true);

  return {
    props: {
      ...baseProps,
    },
  };
}
