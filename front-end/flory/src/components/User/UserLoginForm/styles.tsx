import styled from "styled-components"

export const SForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;

  p {
    text-align: right;
    margin-top: 0.7rem;
    margin-bottom: 1.2rem;
    color: #7b7b7b;
    font-size: 0.7rem;
  }

  .input-wrapper {
    text-align: center;
    width: 100%;
    position: relative;
  }

  .icon {
    position: absolute;
    font-size: 1rem;
    color: #b0b0b0;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
  }

  .active {
    color: #2e2162;
  }

  .moveToSignup {
    cursor: pointer;
  }

  .moveToSignup:hover {
    color: rgb(133, 138, 235);
  }
`

export const SInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  height: 4rem;
  box-shadow: 5px 5px 5px 0px rgb(158 158 158);
  border-radius: 30px;
  background-color: var(--color-white);
  margin: 0.5rem 0;
  padding-left: 3rem;
  border: none;
  outline: none;
`
