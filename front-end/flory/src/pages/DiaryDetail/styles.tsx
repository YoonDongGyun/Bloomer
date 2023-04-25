import styled from "styled-components";

const userHeight = window.innerHeight;

export const SMain = styled.main`
  position: absolute;
  width: 100%;
  min-height: ${userHeight + "px"};
  /* height: 100%; */
  /* margin-bottom: 300px; */
  /* height: 500px; */
  .header_back {
    position: absolute;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
  }
  .header {
    height: 200px;
  }
  .music_tag {
    margin: 0.5rem;
    color: white;
    p {
      display: inline;
      margin-left: 0.5rem;
      color: white;
    }
  }
  .header-circle {
    border: 2px solid rgba(255, 255, 255, 0.4);
    position: relative;
    bottom: -2px;
    /* z-index: -2; */
    width: 200px;
    height: 160px;
    border-radius: 200px 200px 0 0;
  }

  .content-box {
    margin: 40px 5%;
    min-height: ${userHeight - 300}px;
    /* margin-bottom: 18%; */
  }
  .setting {
    /* position: absolute; */
    right: 10px;
  }

  .nickname__active {
    cursor: pointer;
    transition: all linear 300ms;
  }

  .nickname__active:hover {
    color: rgb(97, 47, 171);
  }

  .flower-title {
    display: flex;
    justify-content: center;
    color: grey;
    margin: 0.5rem;
  }
  .diary-img {
    width: 100%;
    border-radius: 15px;
  }
  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: small;
      color: grey;
    }
  }
  .content-diary {
    margin: 0.5rem 0 1rem;
  }
  .location-tag {
    margin: 0.7rem 0;
    color: grey;
    p {
      display: inline;
      margin-left: 0.5rem;
      color: grey;
    }
    cursor: pointer;
  }
`;
