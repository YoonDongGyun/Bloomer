import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "https://j8a205.p.ssafy.io",
    // 기본 주소 넣기
  });
  return instance;
}
