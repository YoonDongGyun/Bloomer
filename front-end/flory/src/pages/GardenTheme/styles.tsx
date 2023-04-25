import styled from "styled-components";

export const SMain = styled.main<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all linear 300ms;
  background: ${(props: any) =>
    props.active === 0
      ? "linear-gradient(140deg, rgba(205, 178, 255, 1) 0%, rgba(255, 160, 211, 1) 100%)"
      : props.active === 1
      ? "linear-gradient(140deg, rgb(246, 214, 15) 0%, rgba(241,227,139,1) 100%)"
      : "linear-gradient(140deg, rgba(209,115,81,1) 0%, rgba(242,207,141,1) 100%)"};

  .info__wrapper {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    & > p {
      font-size: 0.8rem;
    }

    .red {
      color: #dc3545;
      font-size: 0.6rem;
    }

    width: 90%;
    text-align: center;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25), 0px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 1rem 0.8rem;
    margin-bottom: 2rem;
  }

  .info__title {
    user-select: none;
  }

  .flower__wrapper {
    position: absolute;
    bottom: -2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    & > p {
      margin: 0;
      color: var(--color-white);
    }

    .name__title {
      font-size: 1.6rem;
      user-select: none;
    }

    .flower__language {
      font-size: 1.2rem;
      user-select: none;
    }
  }

  /* Carousel */
  .emotion__wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    height: 23rem;
    overflow: hidden;
  }

  img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
  }

  .carousel {
    position: relative;
    width: 55%;
    perspective: 500px;
    transform-style: preserve-3d;
  }

  .card-container {
    position: absolute;
    width: 100%;
    height: 90%;
    transform: rotateY(calc(var(--offset) * 50deg))
      scaleY(calc(1 + var(--abs-offset) * -0.4))
      translateZ(calc(var(--abs-offset) * -30rem))
      translateX(calc(var(--direction) * -5rem));
    filter: blur(calc(var(--abs-offset) * 1rem));
    transition: all 0.3s ease-out;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 100%;
    height: 100%;
    padding: 2rem;
    background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
    border-radius: 1rem;
    color: #9ca3af;
    text-align: justify;
    transition: all 0.3s ease-out;

    h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      margin: 0 0 0.7em;
      color: #1f2937;
    }

    p,
    h2 {
      transition: all 0.3s ease-out;
      opacity: var(--active);
    }
  }

  .nav {
    color: white;
    font-size: 5rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    background: unset;
    border: unset;

    &.left {
      transform: translateX(-100%) translatey(-50%);
    }

    &.right {
      right: 0;
      transform: translateX(100%) translatey(-50%);
    }
  }

  .select__wrapper {
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    text-align: center;

    .background {
      background-color: rgba(255, 255, 255, 0.32);
      padding: 0.4rem 0;
      border-radius: 12px;
      border: 2px solid var(--color-white);
      transition: all linear 300ms;
    }

    .select__p {
      font-size: 1rem;
      color: var(--color-white);
      z-index: 10;
      user-select: none;
    }
  }

  .select__wrapper:hover {
    .background {
      /* background-color: #ecdcff; */
      background-color: ${(props) =>
        props.active === 0
          ? "#ecdcff"
          : props.active === 1
          ? "#fbf6d5"
          : "#fedace"};
    }

    .select__p {
      /* color: #9a1aff; */
      color: ${(props) =>
        props.active === 0
          ? "#9a1aff"
          : props.active === 1
          ? "#ffdf0d"
          : "#ff4608"};
    }
  }
`;
