import React, { useState } from "react";
import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";

interface DataItem {
  [key: string]: any;
}

type Props = {
  data?: DataItem[];
};

function Bar(props: Props) {
  const data = props.data || [];
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const handleBarMouseOver = (index: number) => {
    setHoveredBarIndex(index);
  };

  const handleBarMouseLeave = () => {
    setHoveredBarIndex(null);
  };

  return (
    <BarBody>
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="emotion"
        // padding={0.3}
        groupMode="grouped"
        // valueScale={{ type: "linear", min: -20, max: 20 }}
        indexScale={{ type: "band"}}
        
        // axisBottom={{
        //   tickSize: 0,
        //   legend: "",
        //   axisLine: {
        //     stroke: "#999999",
        //     strokeWidth: 1
        //   }
        // }}        
        
        layers={[
          // "bars",
          "axes",
          "legends",
          (props) => {
            const { bars } = props;

            const gradients = data.map((d: any) => {
              const stops = d.color.colors.map((stop: any, i: number) => (
                <stop key={i} offset={stop.offset} stopColor={stop.color} />
              ));
              return (
                <linearGradient key={d.emotion} id={d.color.id}>
                  {stops}
                </linearGradient>
              );
            });

            return (
              <g>
                <defs>{gradients}</defs>
                {bars.map((bar: any, index: number) => (
                  <React.Fragment key={bar.key}>
                    <rect
                      x={bar.x + 17}
                      y={bar.y}
                      rx={10}
                      ry={15}
                      fill={
                        hoveredBarIndex === index
                          ? `url(#gradient-${index})`
                          : `url(#gradient-${index})`
                      }
                      width={bar.width - 35}
                      height={bar.height}
                      onMouseOver={() => handleBarMouseOver(index)}
                      onMouseLeave={handleBarMouseLeave}
                    />
                    {hoveredBarIndex === index && (
                      <text
                        x={bar.x + bar.width / 2 - 5}
                        y={bar.y + bar.height / 2}
                        dy=".35em"
                        textAnchor="middle"
                        style={{ fontSize: "14px"}}
                      >
                        <tspan x={bar.x + bar.width / 2 - 5} dy="-1.2em">
                          {bar.data.data.emotion}
                        </tspan>
                        <tspan x={bar.x + bar.width / 2 - 5} dy="1.2em">
                          {bar.data.value}
                        </tspan>
                      </text>
                    )}
                  </React.Fragment>
                ))}
              </g>
            );
          },
        ]}
      />
    </BarBody>
  );
}

const BarBody = styled.div`
  align-items: center;
  cursor: pointer;
  height: 180px;
  user-select: none;
  padding-top: 15px;
`;

export default Bar;

