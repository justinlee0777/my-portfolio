import { render, screen, waitFor } from '@testing-library/react';

import Slide from './slide';

describe('<Slide/>', () => {
  test('renders', async () => {
    const result = render(
      <Slide className="slide01">
        <>
          <span>Foo</span>
          <span>Bar</span>
          <p>Baz</p>
        </>
      </Slide>
    );

    expect(
      (result.container.firstChild as HTMLElement).classList.contains('slide01')
    ).toBe(true);

    const foo = await waitFor(() => screen.findByText('Foo'));
    expect(foo).toBeTruthy();

    const bar = await waitFor(() => screen.findByText('Bar'));
    expect(bar).toBeTruthy();

    const baz = await waitFor(() => screen.findByText('Baz'));
    expect(baz).toBeTruthy();
  });
});
