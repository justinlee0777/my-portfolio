export interface Painting {
  title: string;
  artist: string;
  images: {
    inline: string;
    highRes: string;
  };
  credit: string;
  creditRef: string;
}
