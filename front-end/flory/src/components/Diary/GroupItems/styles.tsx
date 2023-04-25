import styled from "styled-components";

export const SSection = styled.section`
  width: 83%;
  margin-bottom: 0.8rem;

  .group__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group__title {
    font-size: 1rem;
  }

  .member__wrapper {
    display: flex;

    & > *:not(:first-child) {
      &:nth-child(2) {
        transform: translateX(-0.8rem);
      }
      &:nth-child(3) {
        transform: translateX(-1.6rem);
      }
      &:nth-child(4) {
        transform: translateX(-2.4rem);
      }
      &:nth-child(5) {
        transform: translateX(-3.2rem);
      }
      &:nth-child(6) {
        transform: translateX(-3rem);
      }
    }
  }

  .member__count {
    display: flex;
    margin-left: 1rem;
  }

  .member__rep {
    color: #666161;
    font-weight: bold;
    font-size: 0.8rem;
  }

  .members {
    font-size: 0.8rem;
    color: #666161;
  }
`;
