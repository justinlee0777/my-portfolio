import './styles.scss';

import dynamic from 'next/dynamic';

import { PageProps } from '../src/page';

const Page = dynamic(() => import('../src/page'), {
  ssr: false,
});

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
