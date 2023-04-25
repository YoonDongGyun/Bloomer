import styled from "styled-components";

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

  #nicknameAlarm {
    color: ${(props) =>
      props.alarm.nickname === "alarm" ? "#dc3545" : "green"};
    visibility: ${(props) =>
      props.alarm.nickname === "alarm" ? "visible" : "hidden"};
  }
  #emailAlarm {
    color: ${(props) =>
      props.alarm.email === "alarm"
        ? "#dc3545"
        : props.alarm.email === "validation"
        ? "#dc3545"
        : "green"};
    visibility: ${(props) => (props.alarm.email ? "visible" : "hidden")};
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
