import React from "react";
import { Html, useProgress } from "@react-three/drei";
import Lottie from "react-lottie";
import animationData from "../../assets/imgs/lotties/Loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div>
        <Lottie options={defaultOptions} height={250} />
        <h1 style={{ color: "white" }}>Loading</h1>
      </div>
    </Html>
  );
};

export default Loading;
