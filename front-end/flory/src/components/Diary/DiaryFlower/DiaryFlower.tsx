// three
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { SMain } from "./styles";

import F01 from "../../Flowers/F01"; // 크로커스
import F02 from "../../Flowers/F02"; // 은방울꽃
import F03 from "../../Flowers/F03"; // 빨강 튤립
import F04 from "../../Flowers/F04"; // 칼랑코에
import F05 from "../../Flowers/F05"; // 분홍 장미
import F06 from "../../Flowers/F06"; // 쑥국화
import F07 from "../../Flowers/F07"; // 뱀무
import F08 from "../../Flowers/F08"; // 잉글리쉬데이지
import F09 from "../../Flowers/F09"; // 함박꽃
import F10 from "../../Flowers/F10"; // 무스카리
import F11 from "../../Flowers/F11"; // 흑종초
import F12 from "../../Flowers/F12"; // 해당화
import F13 from "../../Flowers/F13"; // 봉선화
import F14 from "../../Flowers/F14"; // 노란 장미
import F15 from "../../Flowers/F15"; // 풍접초
import F16 from "../../Flowers/F16"; // 매발톱꽃
import F17 from "../../Flowers/F17"; // 빨강 매발톱꽃
import F18 from "../../Flowers/F18"; // 아네모네
import F19 from "../../Flowers/F19"; // 콜레우스
import F20 from "../../Flowers/F20"; // 시네라리아
import F21 from "../../Flowers/F21"; // 알리움
import F22 from "../../Flowers/F22"; // 찔레꽃
import F23 from "../../Flowers/F23"; // 노란 카네이션
import F24 from "../../Flowers/F24"; // 층꽃나무
import F25 from "../../Flowers/F25"; // 제라늄

const Scene = (props: any) => {
  const { flower } = props;

  const num = 6;

  const Flower: any = () => {
    if (flower.flowerName === "크로커스") {
      return <F01 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "은방울꽃") {
      return <F02 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "빨강 튤립") {
      return <F03 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "칼랑코에") {
      return <F04 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "분홍 장미") {
      return <F05 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "쑥국화") {
      return <F06 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "뱀무") {
      return <F07 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "잉글리쉬데이지") {
      return <F08 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "함박꽃") {
      return <F09 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "무스카리") {
      return <F10 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "흑종초") {
      return <F11 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "해당화") {
      return <F12 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "봉선화") {
      return <F13 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "노란 장미") {
      return <F14 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "풍접초") {
      return <F15 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "매발톱꽃") {
      return <F16 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "빨강 매발톱꽃") {
      return <F17 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "아네모네") {
      return <F18 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "콜레우스") {
      return <F19 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "시네라리아") {
      return <F20 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "알리움") {
      return <F21 flowerPosition={{ x: 0, y: -1.2, z: 0 }} scale={5} />;
    } else if (flower.flowerName === "찔레꽃") {
      return <F22 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "노란 카네이션") {
      return <F23 flowerPosition={{ x: 0, y: -0.6, z: 0 }} scale={10} />;
    } else if (flower.flowerName === "층꽃나무") {
      return <F24 flowerPosition={{ x: 0, y: -0.7, z: 0 }} scale={8} />;
    } else if (flower.flowerName === "제라늄") {
      return <F25 flowerPosition={{ x: 0, y: -0.7, z: 0 }} scale={8} />;
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <OrthographicCamera
          makeDefault={true}
          far={1000}
          near={0.1}
          position={[30.37, 10.24 - num, 30.16]}
          rotation={[-0.79, 0.62, 0.52]}
          zoom={20}
        />
        <ambientLight intensity={0.5} />

        <pointLight
          intensity={2}
          decay={2}
          color="#ff6728"
          position={[0, -num, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
        />
        <pointLight
          intensity={3}
          decay={2}
          color="green"
          position={[5, -10 - num, 3]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
        />
        <pointLight
          intensity={3}
          decay={2}
          color="red"
          position={[3.77, 9.82 - num, 5.77]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
        />
        <pointLight
          intensity={3}
          decay={2}
          color="red"
          position={[-3.77, 9.82 - num, -1.77]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
        />
        <pointLight
          intensity={3}
          decay={2}
          color="red"
          position={[3.14, 9.92 - num, -3.19]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
        />

        <Flower />
      </Suspense>
    </>
  );
};

const DiaryFlower = (props: any) => {
  const { flower } = props;

  return (
    <Suspense fallback={null}>
      <SMain>
        <Canvas shadows={true}>
          {/* REMOVE ORBIT CONTROLS TO FORCE THE CAMERA VIEW */}
          <OrbitControls
            maxPolarAngle={0}
            minPolarAngle={Math.PI / 3}
            minZoom={20}
            maxZoom={20}
            enablePan={false}
          />
          <Scene flower={flower}></Scene>
        </Canvas>
      </SMain>
    </Suspense>
  );
};
export default DiaryFlower;
