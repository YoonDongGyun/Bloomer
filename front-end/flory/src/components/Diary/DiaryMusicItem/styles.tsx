import styled from "styled-components";

export const SMusicWrapper = styled.div<any>`
  cursor: pointer;
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all linear 300ms;
  /* border-bottom: 2px solid white; */
  /* margin-bottom: 10px; */

  /* 오디오 숨기기 */
  audio {
    display: none;
  }

  .icon {
    padding: 0.8rem;
    border-radius: 50%;
  }

  .music {
    background-color: rgb(237, 191, 188);
  }

  .play {
    cursor: pointer;
  }
  /* height: 2rem; */

  background-color: ${(props) =>
    props.isSelected ? "rgb(228, 163, 158)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? "none" : "rgb(243, 200, 197)"};
  }
`;
