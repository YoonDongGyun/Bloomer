import styled from "styled-components"

export const SMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  .login__title {
    width: 78%;
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .sns-title-wrapper {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-wrapper {
    width: 80%;
    display: flex;
    justify-content: center;
  }

  .reverse {
    transform: scaleX(-1);
  }

  span {
    font-size: 0.8rem;
    margin: 0 1rem;
  }

  /* 테스트 */
  .header {
    /* position: absolute;
    top: 0; */
    text-align: center;
    background: linear-gradient(
      60deg,
      rgba(84, 58, 183, 1) 0%,
      rgba(255, 160, 211, 1) 100%
    );
    color: white;
  }

  .inner-header {
    height: 8rem;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -8px; /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;
  }

  /* Animation */

  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
`

export const SButton = styled.button`
  width: 12rem;
  height: 3rem;
  background-color: #858aeb;
  border-radius: 30px;
  box-shadow: 5px 5px 5px #3737372d;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: var(--color-white);
      font-size: 14px;
    }
  }

  img {
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`
