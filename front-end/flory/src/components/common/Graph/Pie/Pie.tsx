import React from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";

interface DataItem {
  id: string;
  label: string;
  value: number;
}

type Props = {
  data?: DataItem[];
};

function Pie(props: Props) {
  const data = props.data || [];
  return (
    <PieBody>
      <ResponsivePie
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: -100 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        colors={[
          "#FFE897",
          "#C2F9B9",
          "#FFB59E",
          "#FF8C9B",
          "#D4AAFA",
          "#6972C0",
          "#A5DFFF",
        ]}
        borderWidth={1}
        borderColor={{ theme: "background" }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={8}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.45}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 1.5]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 29,
            itemsSpacing: 0,
            symbolSize: 11,
            itemDirection: "left-to-right",
          },
        ]}
      />
    </PieBody>
  );
}

const PieBody = styled.div`
  // display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 10px;
  height: 200px;
  user-select: none;
  margin-bottom: 10px;
  overflow: visible;
  svg {
    overflow: visible;
  }
`;
export default Pie;
