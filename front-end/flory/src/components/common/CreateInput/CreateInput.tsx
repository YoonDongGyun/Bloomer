import React from "react";
import { STextarea } from "./styles";

function CreateInput({
  contentInput,
  placeholder,
  page,
  isTotal,
}: any): JSX.Element {
  return (
    <STextarea
      page={page}
      placeholder={placeholder}
      ref={contentInput}
      isTotal={isTotal}
    />
  );
}

export default CreateInput;
