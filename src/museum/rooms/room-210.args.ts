import { MuseumPartial, TestExitPoint } from '../museum-partial.model';

const height = 8;
const width = 38;

const westExitPoint: TestExitPoint = {
  origin: [width - 1, 0],
  height,
  width: 1,
  metadata: {
    enteringRoomId: 'room-211',
    playerPosition: [1, 3],
  },
};

const glassDisplayWidth = 9;

export const museumArgs: MuseumPartial = {
  id: 'room-210',
  height,
  width,
  objects: [
    {
      origin: [width - 4 - glassDisplayWidth, height - 5],
      height: 1,
      width: glassDisplayWidth,
      sprite: 'glass-display',
      impassable: true,
      interactions: [
        {
          position: [width - 13, height - 5],
          artist: 'Fang Congyi (ca. 1301-ca.1392)',
          title: `Cloudy Mountains`,
          context: 'Yuan dynasty (1271-1368), ca. 1360-70',
          make: 'Handscroll; ink and color on paper',
          acquisition:
            'Ex coll.: C. C. Wang Family, Purchase, Gift of J, Pierpont Morgan, by exchange, 1973 (1973.121.4)',
          description: `According to Daoist geomantic beliefs, a powerful life energy pulsates through mountain ranges and watercourses in patterns known as longmo (dragon veins). No painter better captured this idea than the Daoist priest Fang Congyi, whose paintings reveal visions of landscapes that seem to vibrate with energy. In Cloudy Mountains, the painter's kinetic brushwork charges the mountains with an expressive liveliness that defies their physical structure. The great mountain range, weightless and dematerialized, resembles a dragon ascending into the clouds. Though this painting is not signed, it has been attributed to Fang Congyi since the fifteenth century, when Cheng Nanyun wrote the striking frontispiece.`,
        },
        {
          position: [width - 12, height - 5],
          objects: [
            {
              origin: [1, 1],
              width: 3,
              height: 3,
              sprite: 'painting',
              url: 'https://images.metmuseum.org/CRDImages/as/original/DP302828.jpg',
            },
            {
              position: [2, 5],
              sprite: 'placard',
              artist: 'Cheng Nanyun (active 1403-after 1440)',
              title: 'Frontispiece',
              context: 'Undated',
              acquisition: '',
              make: '',
              description: '',
            },
          ],
          frame: {
            width: 5,
            height: 7,
          },
        },
        {
          position: [width - 11, height - 5],
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP302829.jpg',
        },
        {
          position: [width - 10, height - 5],
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP302830.jpg',
        },
        {
          position: [width - 9, height - 5],
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP302831.jpg',
        },
        {
          position: [width - 8, height - 5],
          objects: [
            {
              url: 'https://images.metmuseum.org/CRDImages/as/original/DP302832.jpg',
              origin: [1, 1],
              width: 3,
              height: 3,
              sprite: 'painting',
            },
            {
              position: [2, 5],
              sprite: 'placard',
              artist: 'Gao Gu (1391-1460)',
              title: 'Colophon',
              context: 'Dated 1447',
              acquisition: '',
              make: '',
              description: `Cloudy Mountains was made by the lofty Daoist monk of the Shangqing [Temple], Fang Fanghu [Fang Congyi]. Connoisseurs collected it because they believed it to be a precious object. Judging from the dexterity of the brushwork and the depth of the conception, clearly [Fang’s] paintings are of the same standard as those by Mi Nangong [Mi Fu, 1052–1107] and Gao Fangshan [Gao Kegong, 1248–1310]; they must not be compared to later artists who learned only the superficials. In this scroll, the layered peaks are tinted with the colors of a clear day, now hidden, now revealed by the drifting mist and clouds; the long strip of mountain slope looks like a sandy embankment. The gates of the mountain home seem so quiet, as if no one is there. This must be either a choice realm of the immortals, or some supreme view of the mortal world.

In my family there used to be a painting by Fanghu, although its composition, treatment of depth, and proportions cannot possibly rival this scroll, the excellence of the spirit and the nuance in its use of ink are certainly comparable. Alas, ink-wash paintings like those of Fanghu are not to be frequently seen, even though his paintings have circulated in the world for only seventy-some years. This cannot help but redouble one’s feeling of admiration [for this work]. So I write a quatrain to commemorate this event:

The guest from Yingzhou cannot be seen;
His soundless poems give profound pleasure.
Intermittent clouds obscure the rustic cottage;
Distant trees girdle the mountain slopes.
Traces of the hermit are not to be found;
The woodcutter has finished his song.
Unrolling the painting, I imagine his loftiness,
How truly I long to be [in this place].

Composed on the thirteenth day of the intercalary fourth lunar month in the summer of the dingmao year, the twelfth year of the Zhengtong era [May 27, 1447], by Right Assistant Minister of Works [of the secondary capital], Academician Expositor-in-waiting in the Hanlin Academy [of the secondary capital] and Official of the Classics Colloquium, Gao Gu of Huainan [in Jiangsu Province][2] [Seals]: Weiyang, Shiyong, Yu Zhai

《雲山圖》 一幅，上清高士方方壺所作也，好事者藏之，以為珍玩。觀其筆法精到，意態悠遠，與米南宮、高房山同一軌度，非後來淺之為學者之比。然而晴嵐疊嶂掩映於煙雲縹緲之際，山坡一帶，長若隄築，巖扉幽邃，闃然無人，蓋仙家之勝境、塵坱之絕觀也。予家有方壺手跡一披，其布置遠近大小，雖不敢差肩於斯，而精神點染之妙，殆不可以優劣論。鳴呼！水墨之筆如方壺者不復多見矣，其流落人間，距今餘七十載，不能不使人重其景仰之思，因為五言律一，以紀其事云：
不見瀛洲客[點去]，無聲意趣多。
斷雲迷野墅，遠樹帶山坡。
木客深潛跡，樵人已罷歌。
披圖想高致，清興欲如何。侶
正統十二年歲在丁卯，夏後四月十有三日工部右侍郎兼翰林院侍講學士兼經筵官淮南高榖識。 [印]： 維揚、世用、育齋`,
            },
          ],
          frame: {
            width: 5,
            height: 7,
          },
        },
        {
          position: [width - 7, height - 5],
          artist: 'Zhou Kai (active early 15th century)',
          title: 'Colophon',
          context: 'Undated',
          acquisition: '',
          make: '',
          description: `The lofty scholar of the Shangqing Temple, Fang Fanghu,
In what year did he paint this Cloudy Mountains?
How can his creativity be bound by common feelings?
This realm is far removed from the mortal world.
From Langfeng the path winds to the isle of Peng [-lai],
The ethereal vapors lead to Daxiabiao.
Rare grasses are fragrant, daylight lingers,
Ripened peaches confer youthfulness.
Towering palaces silhouetted against the azure sky,
White clouds and blue mists making an expansive haze.
As if seeing the shine of cinnabar within the caves,
Or hearing the chirping of orioles in the trees.
Guangcheng and An Qi, where are they?
Facing this painting increases my admiration [for Fang].
When will he return riding the wind
To relieve this dusty world of its deep ailments?
Zhou Kai from Yongjia [in Zhejiang Province]. [Seals]: Ouyue, Zhou shi Zhonglü, Yu zaowu you

上清高士方方壺，何年畫此雲山圖。
玄機豈為俗情繫，異境自與塵寰殊。
閬風逶迤接蓬島，弱水東連大霞表。
瑤草香生白日遲，蟠桃實熟青春好。
臺殿巍峨紫翠分，白雲蒼靄交氤氳。
丹光仿佛洞中見，鶯語依稀樹裏聞。
廣成安期在何處，對此令人益傾慕。
乘風便欲問大還，下與濁世蘇沈痼。
永嘉周凱 [印]： 甌越、周氏中律、與造物游`,
        },
        {
          position: [width - 6, height - 5],
          objects: [
            {
              url: 'https://images.metmuseum.org/CRDImages/as/original/DP302834.jpg',
              origin: [1, 1],
              width: 3,
              height: 3,
              sprite: 'painting',
            },
            {
              position: [1, 5],
              sprite: 'placard',
              artist: 'Gu Han (active early 15th century)',
              title: 'Colophon',
              context: 'Undated',
              acquisition: '',
              make: '',
              description: `The mountains green,
The waters vast.
Unrolling the painting feels like in the [region of the] Xiao and Xiang [Rivers].
It’s been more than twenty years since I was there.
I hear the singing of the fishermen, the rain falling in the trees.
Now seeing this painting is like being in a dream;
Suddenly, I recall this land of seagulls and egrets.
When will I cast off these worldly cares?
Carrying the wine, I’ll go back again to row a boat and enjoy my leisure.
Xuepo Daoren [Seals]: Xuepo, Xiaguo gongsun, Binghu qiuyue

山蒼蒼，水茫茫，披圖彷彿似瀟湘。
二十餘年我曾到，耳聞漁父雨鳴榔。
而今見畫恍若夢，偶然憶此鷗鷺鄉。
何時脫卻世塵慮，載酒重來鼓枻樂徜徉。
雪坡道人 [印]： 雪坡、夏國公孫、冰壺秋月`,
            },
            {
              position: [3, 5],
              sprite: 'placard',
              artist: 'Wang Qian (active mid-15th century)',
              title: 'Colophon',
              context: 'Undated',
              acquisition: '',
              make: '',
              description: `One shower in the mountains does away with dusty air;
A thousand cliffs and myriad ravines are half-hidden by clouds.
Rocks conceal the clear water of the flowing brook;
The path traversing the woods is obscure and hard to follow.
In high and low abodes the immortals dwell;
In various fields rest groups of cranes.
Someday, I will move my home to this place.
In spring, I will plow the land along the dikes.
Wang Qian from Qiantang [in Zhejiang Province] [Seals]: Wang shi, Muzhi, Wushan jiuyin

山中一雨絕塵氛，萬壑千崖半是雲。
石隱橫溪清易見，路穿深樹杳難分。
參差樓觀棲仙侶，遠近芝田下鶴群。
何日移家來此住，春風隴上課耕耘。
錢唐王謙 [印]： 王氏、牧之、吳山舊隱`,
            },
          ],
          frame: {
            width: 5,
            height: 7,
          },
        },
      ],
    },
    {
      origin: [width - 4 - glassDisplayWidth, height - 4],
      height: 1,
      width: glassDisplayWidth,
      sprite: 'glass-display',
      impassable: true,
      metadata: {
        flipHorizontal: true,
      },
      interactions: [
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP202773_CRD.jpg',
          position: [width - 13, height - 4],
        },
        {
          position: [width - 12, height - 4],
          artist: 'Unidentified artist (14th century)',
          title: `Chinese bulbuls on flowering crab apple`,
          context: 'Yuan (1271-1368) or Ming dynasty (1368-1644)',
          make: 'Handscroll; ink on paper',
          acquisition:
            'From the Collection of A. W. Bahr, Purchase, Fletcher Fund, 1947 (47.18.149)',
          description: `This painting encodes a visual pun called a rebus: the bulbul bird, known as the “white-headed old man” (baitou weng 白頭翁) in Chinese, combined with the crab-apple tree (haitang 海棠) evokes the phrase “white heads at the front of the hall” (tangshang baitou 堂上白頭), an auspicious wish for shared longevity for the matriarch and patriarch of a family. Though bearing a fake inscription and seals of the Northern Song emperor Huizong (1082–1135; r. 1100–25), this fine painting shows qualities of the fourteenth-century painters Wang Yuan and Zhang Zhong and may be dated to that time based on its style.`,
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278130.jpg',
          position: [width - 11, height - 4],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278129.jpg',
          position: [width - 10, height - 4],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278128.jpg',
          position: [width - 9, height - 4],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278127.jpg',
          position: [width - 8, height - 4],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278126.jpg',
          position: [width - 7, height - 4],
        },
        {
          url: 'https://images.metmuseum.org/CRDImages/as/original/DP278125.jpg',
          position: [width - 6, height - 4],
        },
        {
          position: [width - 5, height - 4],
          artist: 'Zhang Yucai',
          title: `Beneficent Rain`,
          context: 'Yuan dynasty (1271-1368), late 13th-early 14th century',
          make: 'Handscroll; ink on silk',
          acquisition: 'Gift of Douglas Dillon, 1985 (1985.227.2)',
          description: `Zhang Yucai, the thirty-eighth Daoist Celestial Master of Mount Longhu, was renowned for his paintings of bamboo and dragons. In this scroll, Zhang uses virtuoso painting techniques to depict a group of four dragons in clouds and waves - the dragons' bodies are mostly reserved blank silk with contour lines, while the murky world around them is built up with graded ink washes. According to traditional Daoist beliefs, dragons controlled rainfall, and Zhang was praised for his ability to summon rain through ritual. That Zhang himself named this painting Beneficent Rain suggests that it may have played some role in such a ritual.`,
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
      origin: [width - 1, 0],
      height: 3,
    },
    {
      origin: [width - 1, 6],
      height: 2,
    },
    {
      origin: [0, height - 1],
      width: 23,
    },
    {
      origin: [26, height - 1],
      width: width - 26,
    },
    {
      origin: [0, 0],
      height: 3,
    },
    {
      origin: [0, 6],
      height: 2,
    },
  ],
  exitPoints: [westExitPoint],
};
