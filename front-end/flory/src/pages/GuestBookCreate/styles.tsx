import styled from "styled-components";

export const SSection = styled.section<any>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  position: relative;
  background-color: #f6f6f6;
  background-image: linear-gradient(
      90deg,
      #cdcccc 0px,
      #cdcccc 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      #cdcccc 0px,
      #cdcccc 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      #e0e0e0 0px,
      #e0e0e0 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      90deg,
      #e0e0e0 0px,
      #e0e0e0 1px,
      transparent 1px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(
      transparent 0px,
      transparent 5px,
      #f6f6f6 5px,
      #f6f6f6 95px,
      transparent 95px,
      transparent 100px
    ),
    linear-gradient(
      90deg,
      #e0e0e0 0px,
      #e0e0e0 1px,
      transparent 1px,
      transparent 99px,
      #e0e0e0 99px,
      #e0e0e0 100px
    ),
    linear-gradient(
      90deg,
      transparent 0px,
      transparent 5px,
      #f6f6f6 5px,
      #f6f6f6 95px,
      transparent 95px,
      transparent 100px
    ),
    linear-gradient(
      transparent 0px,
      transparent 1px,
      #f6f6f6 1px,
      #f6f6f6 99px,
      transparent 99px,
      transparent 100px
    ),
    linear-gradient(#cdcccc, #cdcccc);
  background-size: 100px 100%, 100% 100px, 100% 10px, 10px 100%, 100% 100px,
    100px 100%, 100px 100%, 100px 100px, 100px 100px;

  button {
    top: 1rem;
    left: 1rem;
  }

  .create__wrapper {
    position: relative;
    /* display: */
    width: 22rem;
    height: 24rem;
    background-color: ${(props) => props.backgroundColor};
  }

  .color-button__wrapper {
    background-color: ${(props) => props.backgroundColor};
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    margin-left: 1rem;
  }

  .color {
    margin: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 2px solid white;
  }

  textarea {
    resize: none;
    width: 22rem;
    height: 20rem;
    border: none;
    outline: none;
    padding: 1rem;
    font-size: 1rem;
    background-color: ${(props) => props.backgroundColor};
    font-family: "S-CoreDream-4Regular";
  }

  .yellow {
    background-color: #f4f39e;
  }

  .pink {
    background-color: #fdd7db;
  }

  .blue {
    background-color: #b9eaf6;
  }

  .complete {
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .limit {
    position: absolute;
    right: 1rem;
    bottom: 4rem;
    color: #8a8a8a;
    font-size: 0.8rem;
  }
`;
