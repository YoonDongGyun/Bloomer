import styled from "styled-components";

export const SSection = styled.section`
  .reg-text {
    transform: translateY(100px);
    opacity: 0;

    transition: transform 3s ease-out, opacity 5s ease;

    &.loaded {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .letter {
    transition: transform 5s cubic-bezier(0.43, 0.1, 0.57, 0.9), filter 5s ease,
      opacity 5s ease;
    opacity: 0;
    filter: blur(5px);

    &:nth-of-type(2) {
      transform: translateY(-160px);
      transition-duration: 5/2;
    }

    &.loaded {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  .spanColor {
    margin: 0;
    padding: 0;
    color: #d7bede;
    letter-spacing: 4px;
    position: relative;
    overflow: hidden;

    background: linear-gradient(90deg, #7f18c9, #fff, #8f4fcc);
    background-repeat: no-repeat;
    background-size: 90%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }
`;
