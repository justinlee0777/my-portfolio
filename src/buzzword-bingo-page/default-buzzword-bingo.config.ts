import BuzzwordBingoConfig from "./models/buzzword-bingo-config.model";

const defaultBuzzwordBingoConfig: BuzzwordBingoConfig = {
  seo: {
    title: 'Buzzword Bingo Generator',
    description: 'Web app to generate buzzword bingo sheets.',
  },
  textContent: {
    header: 'Buzzword bingo',
    explanation: [
      'Buzzword bingo is typically reserved for stock phrases said during an event, but I personally use it for clichés and themes in general.',
      "It's best used for things that you're half-interested in, as you have a pretty good idea of what will happen, such as Disney and Fast and the Furious movies, and Hell's Kitchen.",
      'Though I use it for things I enjoy as well.',
    ],
  },
};

export default defaultBuzzwordBingoConfig;