import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 26;

const westExitPoint: TestExitPoint = {
  origin: [width - 1, 3],
  height: 3,
  width: 1,
  metadata: {
    enteringRoomId: 'room-215',
    playerPosition: [1, 4],
  },
};

export const museumArgs: MuseumPartial = {
  id: 'room-216',
  height,
  width,
  objects: [
    {
      origin: [2, 0],
      height: 1,
      width: 1,
      sprite: 'fan',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP104399.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [3, 0],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Xu Yang',
          title: `Palaces of the Immortals`,
          context: 'Qing Dynasty (1644 - 1911), dated 1753',
          make: 'Folding fan mounted as an album leaf; ink, color, and gold on paper',
          acquisition:
            'Purchase, The B. D. G. Leviton Foundation Gift, in honor of Marie-Hélène and Guy Weill, 2003 (2003.132)',
          description: `Xu Yang was recruited as a court painter in 1751 and became one of the Qianlong emperor's leading artists. This fan painting shows Xu working in a vibrant palette of blue, green, and gold to form a crystalline, otherworldly mountainscape with sumptuous palaces. Azurite blue and malachite green are combined to evoke both antiquity and Daoist paradises. According to the artist's inscription, he was commanded by the emperor to paint this work as a birthday gift to a certain Mr. Li, for whom it would have conjured thoughts of a long life achieved through Daoist practices.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [width - 11, 0],
      height: 1,
      width: 9,
      sprite: 'long-painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105286.jpg',
          position: [width - 11, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105285.jpg',
          position: [width - 10, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105284.jpg',
          position: [width - 9, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105283.jpg',
          position: [width - 8, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105282.jpg',
          position: [width - 7, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105281.jpg',
          position: [width - 6, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105280.jpg',
          position: [width - 5, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105279.jpg',
          position: [width - 4, 0],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP105278.jpg',
          position: [width - 3, 0],
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
          artist: 'Xu Yang',
          title: `The Qianlong Emperor's Southern Inspection Tour, Scroll Four: The Confluence of the Huai and Yellow Rivers`,
          context: 'Qing Dynasty (1644 - 1911), dated 1770',
          make: 'Handscroll; ink and color on silk',
          acquisition: 'Purchase, The Dillon Fund Gift, 1984 (1984.16)',
          description:
            'This scroll is the fourth in a set of twelve commissioned by the Qianlong Emperor to document his first tour in Southern China, made in 1751. The scroll portrays Qianlong inspecting flood-control measures along the Yellow River. He stands beside the spillway that directs the clear blue waters of the Huai River into the silt-laden Yellow River, diluting its sediment content and helping to flush the silt out to sea. The remainder of the scroll depicts various flood-prevention techniques, including double-sluice gates to reduce the force and flow of water in the Grand Canal, pounded-earth and stone-faced levees, and large bundles of sorghum used for repairing breaches in the dikes.',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [2, height - 1],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Pan Gongshou',
          title: 'Landscapes after old masters',
          context: 'Qing Dynasty (1644 - 1911), dated 1783',
          make: 'Album of eight leaves; ink and color on paper',
          acquisition:
            'Purchase, Oscar L. Tang and H.M. Agnes Hsu-Tang Gift, 2024',
          description: `In the waning years of the eighteenth century, the city of Zhenjiang gave rise to a new painting movement that would become one of the most vital forces in the visual arts of the late Qing dynasty. While sharing their contemporaries’ interest in studying old master styles, the painters of Zhenjiang brought their own sensibility to this practice, foregrounding patternization and a bold approach to surface texture. This album by Pan Gongshou, one of the founders of the school, shows him cycling through old masters both familiar and unknown, bringing a fresh new voice to a centuries-old discipline.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [3, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-006.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [4, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-005.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [5, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-008.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [6, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-001.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [7, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-002.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [8, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-003.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [9, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-003.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [10, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP-33644-007.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [12, height - 1],
      height: 1,
      width: 1,
      sprite: 'placard',
      interactions: [
        {
          artist: 'Qian Weicheng',
          title: 'Winter landscapes and flowers',
          context: 'Qing dynasty (1644 - 1911)',
          make: 'Album of twelve paintings; ink and color on paper',
          acquisition: 'Purchase, The Dillon Fund, 1988 (1988.153.1)',
          description: `One of Qian Weicheng's finest surviving works, this album alternates between desolate wintry landscapes and bright, lavish images of flowers that blossom in the colder months. Originally one of a four-album set featuring landscapes and flowers of the four seasons, the album was painted for the Qianlong emperor, who later inscribed poems on the leaves. The emperor admired Qian for both his scholarship and his painting, and he was devastated when the artist died at the age of just fifty-two. This album is one of several by Qian that the emperor inscribed in the years after Qian's untimely death.`,
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [13, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120312.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [14, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120313.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [15, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120314.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [16, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120315.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [17, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120316.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [18, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120317.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [19, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120318.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [20, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120319.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [21, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120320.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [22, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120321.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [23, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120322.jpg',
          sameAsObject: true,
        },
      ],
    },
    {
      origin: [24, height - 1],
      height: 1,
      width: 1,
      sprite: 'painting',
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP120323.jpg',
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
      height: 3,
    },
    {
      origin: [0, 6],
      height: 2,
    },
    {
      origin: [width - 1, 0],
      height: 3,
    },
    {
      origin: [width - 1, 6],
      height: 2,
    },
    {
      origin: [0, 7],
      width,
    },
  ],
  exitPoints: [westExitPoint],
};
