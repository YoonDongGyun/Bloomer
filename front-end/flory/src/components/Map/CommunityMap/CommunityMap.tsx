import React, { useEffect, useRef } from "react";
import useGeolocation from "react-hook-geolocation";
import { DiaryType } from "../../../models/diary/diaryType";
import { convertNumFormat } from "../../../utils/utils";
import { SMap } from "./styles";

declare global {
  interface Window {
    kakao: any;
  }
}

const CommunityMap = ({ setBound, diaries }: any): JSX.Element => {
  const geolocation = useGeolocation();
  let isGeolocation = geolocation.latitude != null;
  let bounds;
  const map = useRef<any>();

  useEffect(() => {
    // 좌표 가져오기
    let mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let mapOptions = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(
        geolocation.latitude ? geolocation.latitude : 37.5128064,
        geolocation.longitude ? geolocation.longitude : 127.0284288
      ), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    map.current = new window.kakao.maps.Map(mapContainer, mapOptions);

    // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map.current, "dragend", function () {
      // 지도 범위 가져오기
      bounds = map.current.getBounds();
      setBound({
        lng1: String(bounds.ha),
        lat2: String(bounds.qa),
        lng2: String(bounds.oa),
        lat1: String(bounds.pa),
      });
    });

    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map.current, "zoom_changed", function () {
      // 지도 범위 가져오기
      bounds = map.current.getBounds();
      setBound({
        lng1: String(bounds.ha),
        lat2: String(bounds.qa),
        lng2: String(bounds.oa),
        lat1: String(bounds.pa),
      });
    });
  }, [bounds, isGeolocation]);

  useEffect(() => {
    // 마커를 표시할 위치와 title 객체 배열입니다
    let positions = diaries.map((diary: DiaryType) => {
      return {
        title: diary.content,
        latlng: new kakao.maps.LatLng(diary.lat, diary.lng),
        fid: convertNumFormat(diary.flowerEmotion.fid),
      };
    });

    for (var i = 0; i < positions.length; i++) {
      var iconRoute_bg = require(`../../../assets/imgs/flower_bgicon/bgicon_f${positions[i].fid}.png`);

      // 마커 이미지의 이미지 크기
      var imageSize = new kakao.maps.Size(32, 32);

      // 마커 이미지를 생성
      var markerImage = new kakao.maps.MarkerImage(iconRoute_bg, imageSize);

      // 마커를 생성
      var marker = new kakao.maps.Marker({
        map: map.current, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      // marker.setMap(map.current);
    }
  }, [bounds, diaries, isGeolocation]);

  return <SMap id="map" />;
};

export default CommunityMap;
