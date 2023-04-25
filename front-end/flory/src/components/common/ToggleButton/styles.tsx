import styled from "styled-components";

export const SNav = styled.nav<any>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;

  a {
    color: inherit;
  }

  .menu-item,
  .menu-open-button {
    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : props.gardenType === 2
        ? "rgb(253 200 167)"
        : "white"};
    border-radius: 100%;
    width: 2.5rem;
    height: 2.5rem;
    margin-left: -40px;
    position: absolute;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    color: #ffffff;
    text-align: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform ease-out 200ms;
    transition: -webkit-transform ease-out 200ms;
    transition: transform ease-out 200ms;
    transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
  }

  .menu-open {
    display: none;
  }

  .lines {
    width: 1rem;
    /* height: 0.15rem; */
    color: #000000;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* margin-left: -12.5px;
    margin-top: -1.5px; */
    -webkit-transition: -webkit-transform 200ms;
    transition: -webkit-transform 200ms;
    transition: transform 200ms;
    transition: transform 200ms, -webkit-transform 200ms;
  }

  .line-1 {
    -webkit-transform: translate3d(0, -8px, 0);
    transform: translate3d(0, -8px, 0);
  }

  .line-2 {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .line-3 {
    -webkit-transform: translate3d(0, 8px, 0);
    transform: translate3d(0, 8px, 0);
  }

  .menu-open:checked + .menu-open-button .line-1 {
    -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
    transform: translate3d(0, 0, 0) rotate(45deg);
  }

  .menu-open:checked + .menu-open-button .line-2 {
    -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
    transform: translate3d(0, 0, 0) scale(0.1, 1);
  }

  .menu-open:checked + .menu-open-button .line-3 {
    -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
    transform: translate3d(0, 0, 0) rotate(-45deg);
  }

  .menu {
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80px;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    font-size: 26px;
  }

  .menu-item {
    color: #000000;
    transition: all 0.1s ease 0s;
  }

  .menu-item:hover {
    /* background: red; */
    /* color: #3290b1; */
  }

  .menu-item:nth-child(3) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(4) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(5) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-open-button {
    z-index: 2;
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
    transform: scale(1.1, 1.1) translate3d(0, 0, 0);
    cursor: pointer;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
  }

  .menu-open-button:hover {
    -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
    transform: scale(1.2, 1.2) translate3d(0, 0, 0);
    .lines {
      color: ${(props) =>
        props.gardenType === 0
          ? "#af5df8"
          : props.gardenType === 1
          ? "white"
          : "#E58649"};
    }
  }

  .menu-open:checked + .menu-open-button {
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
    transform: scale(0.8, 0.8) translate3d(0, 0, 0);
  }

  .menu-open:checked ~ .menu-item {
    -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
    transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  }

  .menu-open:checked ~ .menu-item:nth-child(3) {
    transition-duration: 180ms;
    -webkit-transition-duration: 180ms;
    -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
    transform: translate3d(0, 60px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(4) {
    transition-duration: 280ms;
    -webkit-transition-duration: 280ms;
    -webkit-transform: translate3d(0, -52.47586px, 0);
    transform: translate3d(0, 120px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(5) {
    transition-duration: 380ms;
    -webkit-transition-duration: 380ms;
    -webkit-transform: translate3d(0, 52.47586px, 0);
    transform: translate3d(0, 180px, 0);
  }

  .gardenList {
    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : "rgb(253 200 167)"};
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
  }

  .gardenList:hover {
    .gardenList__icon {
      color: ${(props) =>
        props.gardenType === 0
          ? "#af5df8"
          : props.gardenType === 1
          ? "white"
          : "#E58649"};
    }
    text-shadow: none;
  }

  .volume {
    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : "rgb(253 200 167)"};
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
  }

  .volume:hover {
    .volumeMute__icon {
      color: ${(props) =>
        props.gardenType === 0
          ? "#af5df8"
          : props.gardenType === 1
          ? "white"
          : "#E58649"};
    }
    text-shadow: none;
  }

  .camera {
    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : "rgb(253 200 167)"};
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
  }

  .camera:hover {
    .camera__icon {
      color: ${(props) =>
        props.gardenType === 0
          ? "#af5df8"
          : props.gardenType === 1
          ? "white"
          : "#E58649"};
    }
    text-shadow: none;
  }
`;
