import React from "react";
import { Float } from "@react-three/drei";

const FloatWrapper = ({ children }: any) => {
  return (
    <Float
      speed={20} // Animation speed, defaults to 1
      rotationIntensity={0} // XYZ rotation intensity, defaults to 1
      floatingRange={[0, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      {children}
    </Float>
  );
};

export default FloatWrapper;
