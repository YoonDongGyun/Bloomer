import React, { useEffect, useRef, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { SMap } from "./styles";

declare global {
  interface Window {
    kakao: any;
  }
}

function SearchMap({ func }: any): JSX.Element {
  const geolocation = useGeolocation();
  let isGeolocation = geolocation.latitude != null;

  const map = useRef<any>();
  // const marker = useRef<any>();
  // const infowindow = useRef<any>();
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    // ================================
    //          기본 지도 그리기
    // ================================
    let mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let mapOptions = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(
        geolocation.latitude ? geolocation.latitude : 37.5128064,
        geolocation.longitude ? geolocation.longitude : 127.0284288
      ), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    map.current = new window.kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴

    kakao.maps.event.addListener(map.current, "dragend", function () {
      // 지도의 중심좌표를 얻어옵니다
      setCenter(map.current.getCenter());
      // console.log(center);
    });

    kakao.maps.event.addListener(map.current, "zoom_changed", function () {
      // 지도의 중심좌표를 얻어옵니다
      setCenter(map.current.getCenter());
      // console.log(center);
    });
  }, [isGeolocation]);

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();
    function searchDetailAddrFromCoords(
      lng: number,
      lat: number,
      callback: any
    ) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(lng, lat, callback);
    }

    if (center) {
      // marker.current.setPosition(center);
      // 가운데 좌표 주소 얻기

      searchDetailAddrFromCoords(
        center.getLng(),
        center.getLat(),
        function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            // 위치 정보 저장
            func.setPlace({
              placeName: "",
              address: detailAddr,
              lng: center.getLng(),
              lat: center.getLat(),
            });
          }
        }
      );
    }
  }, [center]);

  useEffect(() => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    // 장소 검색 객체를 생성합니다
    let ps = new window.kakao.maps.services.Places();

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        if (func.keyword.new) {
          func.setLocations(data);
        }

        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.current.setBounds(bounds);

        // 위치 정보 저장
        func.setPlace({
          placeName: data[0].place_name,
          address: data[0].road_address_name,
          lng: data[0].x,
          lat: data[0].y,
        });
      }
    }

    if (func.keyword.word) {
      ps.keywordSearch(func.keyword.word, placesSearchCB);
    } else {
      map.current.setCenter(
        new kakao.maps.LatLng(
          geolocation.latitude ? geolocation.latitude : 37.5128064,
          geolocation.longitude ? geolocation.longitude : 127.0284288
        )
      );
      setCenter(map.current.getCenter());
    }
  }, [func.keyword]);

  return (
    <SMap id="map">
      <img src={require("../../../assets/imgs/map_marker.png")} />
    </SMap>
  );
}

export default SearchMap;
