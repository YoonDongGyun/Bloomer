import styled from "styled-components";

export const SMyPage = styled.div`
  position: relative;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .header {
    height: 5%;
    margin-bottom: 1rem;
  }

  .profile-background {
    position: absolute;
    /* background-color: #eddfff; */
    background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
    width: 100%;
    height: 7.5rem;
    z-index: 0;
    border-bottom-left-radius: 200px 30%;
    border-bottom-right-radius: 200px 30%;
    /* border-radius: 0 0 50px 50px; */
  }

  .setting-icon {
    position: absolute;
    height: 1.5rem;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 1000;
    cursor: pointer;
  }

  .flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .totalFlower {
    background: #e6d1ff;
    text-align: center;
    margin: 20px auto;
    width: 15rem;
    padding: 3px;
    border-radius: 2em;
    box-shadow: #ebe1e1 2px 2px 2px 2px;
  }

  .flowerImg {
    height: 0.9rem;
    // width: 1vw;
    position: relative;
    top: 2.5px;
    right: 4px;
  }

  .inner-title {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }

  .flower-title {
    font-size: 0.75rem;
    display: inline-block;
  }

  .emotion__flower {
    width: 50px;
    height: 50px;
    /* float: left; */
    padding: 10px;
    margin: 0 auto;
  }
`;
