jest.mock('react-dom/server', () => {
  return {
    __esModule: true,
    renderToString: () => 'The image is not showing.',
  };
});

jest.mock('../../../components/unit-test-check/unit-test-check', () => () => (
  <span></span>
));

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { DeveloperDescriptionConfig } from '../../homepage.config';
import DeveloperDescription from './developer-description';

describe('<DeveloperDescription/>', () => {
  const config: DeveloperDescriptionConfig = {
    textContent: {
      name: 'Bob Test',
      prompt: 'Who is Bob Test?',
      tongueInCheck: 'Bob Test is the best.',
      profileCaption: 'Bob Test',
      profileDescription: 'Bob',
      profileErrorMessage: {
        templateString: 'The image is not showing.',
        urls: [],
      },
    },
  };

  const generatedProfilePictureUrl =
    'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML/image-with-title.png';
  const profilePicturePrompt = 'This is a good photo of Bob.';

  afterEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('renders', async () => {
    render(<DeveloperDescription config={config} />);

    const profileName = await waitFor(() => screen.findByText('Bob Test'));
    expect(profileName).toBeTruthy();
    expect(profileName.tagName).toBe('H1');

    const profilePrompt = screen.queryByText('Who is Bob Test?')!;
    expect(profilePrompt).toBeTruthy();
    expect(profilePrompt.tagName).toBe('H2');

    const profileTongueInCheek = screen.queryByText('Bob Test is the best.');
    expect(profileTongueInCheek).toBeTruthy();

    const caption = screen.queryByText(
      'Bob Test: "This is a good photo of Bob."'
    );
    expect(caption).toBeTruthy();

    const image = screen.queryByAltText('Bob');
    expect(image).toBeTruthy();

    const errorMessage = screen.queryByText('The image is not showing.');
    expect(errorMessage).toBeFalsy();
  });

  test('renders an error message when the image is invalid', async () => {
    render(<DeveloperDescription config={config} />);

    fireEvent.error(screen.getByAltText('Bob'));

    const errorMessage = await waitFor(() =>
      screen.findByText('The image is not showing.')
    );
    expect(errorMessage).toBeTruthy();

    const image = screen.queryByAltText('Bob');
    expect(image).toBeFalsy();
  });
});
