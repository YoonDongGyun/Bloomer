import styled from "styled-components"

export const SForm = styled.form`
  /* width: 90%; */
  /* margin: auto; */

  p {
    font-size: 0.9rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .nickname__wrapper {
    display: flex;
    gap: 10px;
    padding-bottom: 0.3rem;
    border-bottom: 3px solid #dec5fd;
    align-items: center;
    margin-bottom: 20px;

    .icon {
      color: #b0b0b0;
    }

    .active {
      color: #dec5fd;
    }

    .input__section {
      width: 100%;
      border: none;
      outline: none;
    }
  }

  .image__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-columns: 5rem 5rem 5rem; */
    gap: 1.2rem;
    justify-content: center;
    margin-bottom: 10px;

    .image__btn {
      cursor: pointer;
      position: relative;
    }
    .image__btn:hover {
      transform: scale(1.05);
    }
  }

  .cameraButtonImg {
    position: absolute;
    height: 1.5rem;
    width: auto;
    padding: 3px;
    background-color: #ffffff;
    color: black;
    border-radius: 7px;
    bottom: 0rem;
    left: 3.6rem;
    border: #dec5fd solid 3px;
  }
`

export const ImgIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  postion: relative;

  .modifyButtonImg {
    width: 6.5vh;
    /* height: 6.5vh; */
    position: absolute;
    top: 7rem;
    left: 53%;
    /* background-color: black; */
    border-radius: 50%;
    color: white;
    /* padding: 12px; */
  }
`
