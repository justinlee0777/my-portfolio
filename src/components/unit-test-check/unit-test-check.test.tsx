import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';

import UnitTestContextData from '../../contexts/unit-test/unit-test-context-data.model';
import UnitTestContext from '../../contexts/unit-test/unit-test.context';
import UnitTestCheck from './unit-test-check';

describe('UnitTestCheck', () => {
  let result: UnitTestContextData;

  let renderResult: RenderResult;

  beforeEach(() => {
    result = {
      developerMode: false,
      results: {
        MockComponent: {
          numFailingTests: 0,
          numPassingTests: 2,
          tests: [
            {
              testName: 'renders',
              passed: true,
            },
            {
              testName: 'activates',
              passed: true,
            },
          ],
        },
      },
    };
  });

  function createComponent(): void {
    renderResult = render(
      <UnitTestContext.Provider value={result}>
        <UnitTestCheck componentName="MockComponent" />
      </UnitTestContext.Provider>
    );
  }

  test('renders an empty component when developer mode is off', () => {
    createComponent();

    expect(renderResult.container.children.length).toBe(0);
  });

  test('renders an empty component when no test results can be found', () => {
    delete result.results.MockComponent;
    result.developerMode = false;

    createComponent();

    expect(renderResult.container.children.length).toBe(0);
  });

  test('renders a checkmark button when developer mode is on', () => {
    result.developerMode = true;

    createComponent();

    const checkmark = screen.queryByRole('button', {
      name: 'Click to see the unit test results for this component.',
    });
    expect(checkmark).toBeTruthy();
  });

  test('renders a tooltip showing the unit tests written for a component', () => {
    result.developerMode = true;

    createComponent();

    const checkmark = screen.queryByRole('button', {
      name: 'Click to see the unit test results for this component.',
    });
    fireEvent.click(checkmark);

    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeTruthy();

    const header = screen.queryByText('<MockComponent/> unit tests');
    expect(header).toBeTruthy();

    let unitTest = screen.queryByText('renders', { exact: false });
    expect(unitTest).toBeTruthy();

    unitTest = screen.queryByText('activates', { exact: false });
    expect(unitTest).toBeTruthy();
  });
});
