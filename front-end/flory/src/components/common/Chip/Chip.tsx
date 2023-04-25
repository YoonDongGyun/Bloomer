import React from "react";
import { SButton, SSection } from "./styles";

export interface IChipProps {
  content?: string;
  addStyle?: {
    borderColor?: string;
    hoverColor?: string;
    fontColor?: string;
    activeColor?: string;
  };
  active?: boolean;
  onClick?: () => void;
}

const Chip = (props: IChipProps) => {
  const { addStyle, content, active, onClick } = props;

  return (
    <>
      <SButton addStyle={addStyle} active={active} onClick={onClick}>
        {content}
      </SButton>
    </>
  );
};

export default Chip;
