export type DiaryCreateStateType = {
  diaryCreateData: {
    address: string;
    content: string;
    fid: number | null;
    gid: number | null;
    groupList: any;
    lat: string;
    lng: string;
    musicTitle: string | null;
    publicStatus: string;
    x: number;
    y: number;
    z: number;
  };
  imgSrc: any;
  currentEmotionData: any;
  currentFlowerData: any;
  currentMusicData: any;
  currentMusicUrls: any;
};
