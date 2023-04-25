import styled from "styled-components";

export const SMain = styled.main`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  justify-content: center;
  /* gap: 5%; */
  width: 100%;
  height: 100%;
  background: rgb(144, 91, 241);
  background: linear-gradient(
    140deg,
    rgba(144, 91, 241, 1) 0%,
    rgba(232, 73, 158, 1) 100%
  );
  overflow: hidden;
  /* overflow-y: auto; */
  #title {
    font-size: 150px;
    font-family: "Niconne";
    color: #ffffff;
    text-align: center;
    margin: 0;
    text-shadow: #805f89 5px 4px 2px;
  }
  #subtitle {
    font-size: 30px;
    /* font-family: "Niconne"; */
    color: #ffffff;
    text-align: center;
    margin: 0;
    /* text-shadow: #805f89 5px 4px 2px; */
  }
  .info__wrapper {
    /* margin-top: 35px; */
    width: 100%;
    /* height: 20%; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    margin-bottom: 1rem;

    .background {
      background-color: rgba(255, 255, 255, 0.32);
      padding: 0.4rem 1.4rem;
      border-radius: 12px;
      border: 2.4px solid var(--color-white);

      font-family: "S-CoreDream-5Medium";
      font-size: 1.3rem;
      color: var(--color-white);
      z-index: 10;
    }
  }
`;
