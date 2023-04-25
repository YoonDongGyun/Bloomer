import React, { useEffect } from "react";
import useGeolocation from "react-hook-geolocation";
import { convertNumFormat } from "../../../utils/utils";
import { SMap } from "./styles";

declare global {
  interface Window {
    kakao: any;
  }
}

function StaticMap({ lat, lng, fid }: any): JSX.Element {
  useEffect(() => {
    // ================================
    //          기본 지도 그리기
    // ================================
    let mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let mapOptions = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
      draggable: false,
    };

    let map = new window.kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴

    // ================================
    //           마커 생성
    // ================================

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(35, 35);
    // var imageSrc =
    //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    var iconRoute_bg = require(`../../../assets/imgs/flower_bgicon/bgicon_f${convertNumFormat(
      fid
    )}.png`);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(iconRoute_bg, imageSize);

    // 마커를 생성합니다
    var yellowMarker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: map.getCenter(), // 마커를 표시할 위치
      image: markerImage, // 마커 이미지
    });
  }, []);

  return <SMap id="map" />;
}

export default StaticMap;
