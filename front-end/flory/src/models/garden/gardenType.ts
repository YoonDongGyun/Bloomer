export type gardenType = {
  nickname: string;
  userId: number | null;
  gardenId: number | null;
  musicTitle: string | null;
  img: string | null;
  deadline: string;
  type: number | null;
};

export type PositionType = {
  flowerPosition: {
    x: number;
    y: number;
    z: number;
  };
};
