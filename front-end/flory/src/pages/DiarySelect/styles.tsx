import styled from "styled-components"

export const SMain = styled.main<any>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(254, 219, 217);
  background: linear-gradient(
    135deg,
    rgba(254, 219, 217, 1) 0%,
    rgba(186, 205, 222, 1) 100%
  );
  overflow: hidden;

  .info__wrapper {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    & > span {
      font-size: 0.8rem;
    }
    & > p {
      font-size: 0.8rem;
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

  .arrow-icon {
    cursor: pointer;
    height: 1.5rem;
    width: 100%;
  }

  .bottom__wrapper {
    position: absolute;
    bottom: 5rem;
    width: 100%;
    /* height: 25%; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info__title {
    user-select: none;
  }

  .extract-emotion {
    font-size: 1rem !important;
    font-weight: bold;
    color: ${(props) => props.emoColor};
  }

  .emotion {
    user-select: none;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    text-align: center;
    font-size: 1.6rem;
    background: linear-gradient(#bd00ff 0%, #ff00d6 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .flower__wrapper {
    position: absolute;
    bottom: -1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    margin-bottom: 2.5rem;
  }

  img {
    width: 22rem;
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
    height: 100%;
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
    bottom: 5rem;
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
      background-color: #ecdcff;
    }

    .select__p {
      color: #9a1aff;
    }
  }
`
