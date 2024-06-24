import './styles.scss';
import 'buzzword-bingo-generator/index.css';

import Page, { PageProps } from '../src/page';

interface ErrorPageProps {
  statusCode: number;
}

type MyAppProps = PageProps | ErrorPageProps;

export default function App({
  Component,
  pageProps,
}: {
  Component;
  pageProps: MyAppProps;
}): JSX.Element {
  if ('statusCode' in pageProps && pageProps.statusCode >= 400) {
    return <Component {...pageProps} />;
  } else {
    return <Page Component={Component} pageProps={pageProps as PageProps} />;
  }
}
