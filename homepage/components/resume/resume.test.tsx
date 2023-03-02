jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => '<a href="http://example.com">Baz</a>',
  };
});

import { render, screen, waitFor } from '@testing-library/react';

import { ResumeConfig } from '../../homepage.config';
import Resume from './resume';

describe('<Resume/>', () => {
  const config: ResumeConfig = {
    textContent: {
      lines: [
        'Foo',
        'Bar',
        {
          templateString: '${Baz}',
          urls: ['http://example.com'],
        },
      ],
    },
  };

  test('renders', async () => {
    render(<Resume config={config} />);

    const foo = await waitFor(() => screen.findByText('Foo'));
    expect(foo).toBeTruthy();

    const bar = await waitFor(() => screen.findByText('Bar'));
    expect(bar).toBeTruthy();

    const baz = await waitFor(() => screen.findByText('Baz'));
    expect(baz).toBeTruthy();
    expect(baz.tagName).toBe('A');
  });
});
