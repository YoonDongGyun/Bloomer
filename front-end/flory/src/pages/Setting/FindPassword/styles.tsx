import styled from "styled-components"

export const SMain = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  .password__title {
    width: 78%;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

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
    margin-bottom: 2rem;
  }

  .inner-header {
    height: 6rem;
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

export const SForm = styled.form<any>`
  text-align: center;
  width: 80%;
  .input__wrapper {
    position: relative;
    margin-bottom: 2rem;
  }

  .icon {
    position: absolute;
    left: 3%;
    top: 10%;
    color: #b0b0b0;
  }

  .active {
    color: #bfc6ff;
  }

  p {
    text-align: left;
    font-size: 0.5rem;
    padding-left: 0.5rem;
    color: #dc3545;
    visibility: hidden;
  }

  #pwAlarm {
    color: ${(props) => (props.alarm.pw === "alarm" ? "#dc3545" : "green")};
    visibility: ${(props) => (props.alarm.pw ? "visible" : "hidden")};
  }
  #pwConfAlarm {
    color: ${(props) => (props.alarm.pwConf === "alarm" ? "#dc3545" : "green")};
    visibility: ${(props) => (props.alarm.pwConf ? "visible" : "hidden")};
  }
`;

export const SInput = styled.input<any>`
  font-size: 0.8rem;
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 3px solid #bfc6ff;
  padding-left: 2.5rem;
  padding-bottom: 1rem;
`;
