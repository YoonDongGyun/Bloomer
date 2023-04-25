interface LocalData {
  setAccessToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  getAccessToken: () => any;
  getRefreshToken: () => any;
  remove: (key: string) => void;
  clear: () => void;
}

export const localData: LocalData = {
  // 로컬 스토리지에 엑세스 토큰 저장
  setAccessToken: (value: string) => {
    localStorage.setItem("accessToken", value);
  },
  // 로컬 스토리지에 리프레시 토큰 저장
  setRefreshToken: (value: string) => {
    localStorage.setItem("refreshToken", value);
  },
  // 로컬 스토리지에서 엑세스 토큰 얻기
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  // 로컬 스토리지에서 리프레시 토큰 얻기
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  // key에 해당하는 토큰을 로컬스토리지에서 제거
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  // 로컬 스토리지 비우기
  clear: () => {
    localStorage.clear();
  },
};
