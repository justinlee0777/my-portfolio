import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 6;
const width = 8;

const southExitPoint: TestExitPoint = {
  origin: [0, height - 1],
  height: 1,
  width,
  metadata: {
    enteringRoomId: 'room-211',
    playerPosition: [2, 1],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-212',
  height,
  width,
  objects: [
    {
      origin: [width - 1, height - 2],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Unidentified artist (late 14th century)',
          title: `White-Robed Guanyin`,
          context: 'Ming dynasty (1368–1644)',
          make: 'Hanging scroll; ink on paper',
          acquisition:
            'Edward Elliott Family Collection, Purchase, The Dillon Fund Gift, 1982',
          description: `According to Buddhist belief, Guanyin (Avalokiteshvara, in Sanskrit), Bodhisattva of Infinite Compassion, reveals himself in many forms. In one such manifestation, known simply as the White-Robed Guanyin, the Bodhisattva sits on the rocky island of Putuo (Potalaka, in Sanskrit), believed by the Chinese to be located offshore from Ningbo, in Zhejiang Province.\nThe poem was inscribed (from left to right) by Quanshi Zongle:\n\nThe body is as small as specks of dust and as ephemeral,\nSo is the doctrine ephemeral and small as specks of dust;\nThe world of all living things is but emptiness,\nAnd so Guanyin’s compassionate heart is at rest.\n\nQuanshi Zongle, appointed by the first Ming emperor to the highest administrative position governing Chan institutions, served as abbot of the Tianjie temple, near Nanjing, first about 1375 and later from 1388 until his death in 1391. The painting, inscribed at the Tianjie temple, is datable to the end of the fourteenth century.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [width - 1, height - 3],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP235484.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [width - 2, 0],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Unidentified artist (late 13th-early 14th century)',
          title: `Shakyamuni coming down from the mountains`,
          context: 'Yuan dynasty (1271-1368), late 13th-early 14th century',
          make: 'Hanging scroll; ink on paper',
          acquisition: 'Purchase, The Dillon Fund Gift, 1987 (1987.9)',
          description: `The person who became Shakyamuni, the historical Buddha, was born a prince named Siddhartha Gautama. In his late twenties, he encountered four scenes of human pain that led to his initial awakening; life was suffering. Wishing to master the appetites that led to suffering, the prince renounced his posessions and became an ascetic, living in the mountains and eventually subsisting on a single grain of rice per day. This scene shows the Buddha coming down from the mountains, disheveled and emaciated. Convinced that enlightenment would not come from extreme practice, he abandoned asceticism for a moderate path he called the "Middle Way." Paintings of this scene usually show Shakyamuni alone; here, he is accompanied by two bodhisattvas.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [width - 3, 0],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP235493.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [2, 0],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Unidentified artist (16th century)',
          title: `Marshal Yang`,
          context: 'Ming dynasty (1368-1644), dated 1542',
          make: 'Hanging scroll; ink on paper',
          acquisition:
            'Purchase, Bequest of Dorothy Graham Bennett, 1969 (1969.155)',
          description: `Marshal Wang, one of the fierce guardian deities of Daoism, is charged with protecting Daoist temples. Like many popular Daoist deities, Wang was originally a human who was posthumously deified and revered as a god. Here, he rides a flaming wheel, vanquishing the evil serpent spirits in the river below. The gold inscription at upper right indicates that this painting was commissioned by an imperial concubine at the court of the Ming emperor Jiajing, a generous patron of Daoism.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [1, 0],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-18070-022.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [0, height - 3],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Unidentified artist (early 17th century)',
          title: `Shakyamuni with luohan, heavenly king, and boys`,
          context: 'Ming dynasty (1368-1644), early 17th century',
          make: 'Hanging scroll; ink on paper',
          acquisition: 'John Stewart Kennedy Fund, 1913 (13.220.12)',
          description: `Young boys are a common auspicious motif in Chinese painting and decorative arts. Here, a group of four boys playfully deliver offerings to Shakyamuni, the historical Buddha, who is attended by a luohan and a heavenly king, a martial figure who guards one of the cardinal directions.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [0, height - 2],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-18086-002.jpg',
          sameAsObject: true,
        },
      ],
    },
  ],
  walls: [
    {
      origin: [0, 0],
      width,
    },
    {
      origin: [0, 0],
      height,
    },
    {
      origin: [width - 1, 0],
      height,
    },
    {
      origin: [width - 2, height - 1],
      width: 2,
    },
    {
      origin: [0, height - 1],
      width: 2,
    },
  ],
  exitPoints: [southExitPoint],
};
