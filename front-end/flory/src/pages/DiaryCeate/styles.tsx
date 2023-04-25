import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 기록완료 버튼 wrapper */
  .bottom__wrapper {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-2rem);
  }
`;

export const SSection = styled.section`
  z-index: 100;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding: 1rem 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  text-align: center;
  margin-top: 1rem;
  height: 80%;
  width: 90%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25), 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 32px;

  .input__wrapper {
    /* width: 90%; */
    /* margin: auto; */
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.8rem auto;
    margin-bottom: 0;
    /* margin-left: 5%; */
  }

  .preview-image__wrapper {
    position: relative;
    .preview-image {
      /* left: 5.5vh; */
      width: 90%;
      margin: auto;
      margin-top: 0.8rem;
    }
    .cancleBtn {
      position: absolute;
      background-color: #ffffffab;
      color: black;
      width: 1rem;
      height: 1rem;
      top: 1.2rem;
      right: 7.5%;
      border: 2px solid black;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .image__button {
    background-color: #f2f2fc;
    border-radius: 16px;
    padding: 0.6rem;
  }

  .image-input__icon {
    font-size: 1.5rem;
  }

  .file__input {
    display: none;
  }

  .MuiFormGroup-root {
    justify-content: center;
  }

  .MuiFormControlLabel-labelPlacementEnd {
    flex-direction: row-reverse;
  }

  .MuiFormControlLabel-label {
    color: #666161;
  }

  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked {
    color: #3f3371;
  }

  .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked
    + .MuiSwitch-track {
    background-color: #f2f2fc;
  }

  .css-j204z7-MuiFormControlLabel-root {
    margin-right: 0;
  }

  /* 위치 스타일 */
  .location__wrapper {
    margin: 0 auto;
    margin-top: 0.8rem;
    width: 90%;
    & > div {
      text-align: left;
    }

    .location-switch__button {
      margin-top: 1rem;
      float: right;
      background-color: #dec5fd;
      color: #ffffff;
      font-size: 0.8rem;
      border-radius: 12px;
      padding: 0.2rem 0.5rem;
    }
  }

  .location {
    text-align: left;
    font-size: 0.8rem;
    background-color: #f2f2fc;
    border-radius: 8px;
    padding: 0.5rem;
    margin: 0.5rem 0 1.6rem 0;
  }
`;
