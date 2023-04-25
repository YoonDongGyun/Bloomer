import styled from "styled-components";

const userHeight = window.innerHeight;

export const SMain = styled.main<any>`
  /* padding-top: 2rem; */
  background-color: #4e126b;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /* head */
  .head {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .down__arrow {
    position: absolute;
    bottom: 1rem;
    animation: blink-effect 1s step-end infinite;
    -webkit-animation: blink 0.5s ease-in-out infinite alternate;
    -moz-animation: blink 0.5s ease-in-out infinite alternate;
    animation: blink 0.5s ease-in-out infinite alternate;
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  #title {
    font-size: 80px;
    font-family: "Niconne";
    color: #ffffff;
    text-align: center;
    margin: 0;
    text-shadow: #805f89 5px 4px 2px;
  }

  /* 애니메이션 효과 */
  .animate__animated.animate__fadeIn {
    --animate-duration: 4s;
  }

  .text-container {
    text-align: center;
    margin: 1rem 0;
    margin-bottom: 5rem;
  }

  /* section 1 */
  .service__info-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.userHeight + "px"};
    text-align: center;
    & > p {
      color: #dfdede;
    }
  }

  /* section 2 */
  .service__info-2 {
    margin-bottom: 20rem;
    position: relative;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${(props) => props.userHeight + "px"};
    text-align: center;
    & > p {
      color: #dfdede;
      z-index: 10;
      transform: translate(4rem, 3rem);
    }
  }

  /* section 3 */
  .service__info-3 {
    position: relative;
    /* opacity: 0; */
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    align-items: center;
    height: ${(props) => props.userHeight - 200 + "px"};
    text-align: center;
    & > p {
      color: #dfdede;
    }
  }

  .content__wrapper {
    margin-bottom: 8rem;
  }

  .info__img-title {
    margin-bottom: 4rem;
    opacity: 0;
  }

  .info__img {
    width: 350px;
    height: 555px;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  video {
    width: 350px;
    height: 555px;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .info__content {
    color: #dfdede;
    font-size: 0.9rem;
  }

  .small {
    font-size: 0.6rem;
  }
  .crocus {
    position: absolute;
    left: 2rem;
  }

  .lastItem {
    padding-bottom: 40px;
  }

  .arrow-up {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: rgb(228, 228, 228);
    color: #4e126b;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: all var(--animation-duration) linear;
  }

  .arrow-up.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .btn__wrapper {
    display: inline-block;
    /* display: flex; */
    /* flex-direction: column; */
    gap: 20px;
    /* justify-content: center; */
    /* align-items: center; */
    margin-top: -30px;
    z-index: 100000;
    transition: all linear 300ms;
    margin-bottom: 80px;
  }
  .btn {
    width: 291.92px;
    height: 57px;
    background: rgba(255, 255, 255, 0.7);
    border: 3px solid #ffffff;
    box-shadow: #ffffff 0px 0px 7px 2px;
    /* filter: blur(4px); */
    border-radius: 30px;

    font-family: "S-CoreDream-7ExtraBold";
    font-size: 20px;
    color: #612fab;
  }
  .btn__wrapper:hover {
    /* transform: scale(1.02); */
    background: rgba(196, 120, 255, 0.7);
    border-radius: 30px;
  }
`;
