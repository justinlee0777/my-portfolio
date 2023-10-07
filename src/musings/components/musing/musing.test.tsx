jest.mock('prospero/web/flexible-book', () => () => null);
jest.mock('prospero/web/transformers', () => ({
  NewlineTransformer: null,
}));
jest.mock('prospero/web/book/listeners', () => ({
  listenToClickEvents: null,
  listenToKeyboardEvents: null,
}));
jest.mock('prospero/web/book/animations', () => ({
  DoublePageBookAnimation: null,
  SinglePageBookAnimation: null,
}));
jest.mock('prospero/web/react', () => ({
  useBook: jest.fn(),
}));

jest.mock('../../../components/unit-test-check/unit-test-check', () => () => (
  <span></span>
));

import { render, RenderResult } from '@testing-library/react';

import Musing from './musing';
import Font from '../../../models/font.enum';

describe('<Musing/>', () => {
  function renderMusing(): RenderResult {
    return render(
      <Musing
        font={Font.ARIAL}
        config={{
          slug: 'good-article',
          display: {
            title: 'Good article',
            description: 'A good article to read.',
            timestamp: '',
            contentHtml:
              '<p>This is worth reading.</p><p>Tell this to everyone.</p>',
          },
          seo: {
            title: 'Good article',
            description: 'Click on this article.',
          },
        }}
      />
    );
  }

  test('renders', () => {
    const renderResult = renderMusing();

    const linkElement = renderResult.queryByRole('link') as HTMLLinkElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.href).toMatch('/musings');

    expect(renderResult.queryByText('This is worth reading.')).toBeTruthy();

    expect(renderResult.queryByText('Tell this to everyone.')).toBeTruthy();
  });
});
