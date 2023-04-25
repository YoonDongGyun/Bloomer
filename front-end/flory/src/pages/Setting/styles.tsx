import styled from "styled-components"

export const SMain = styled.main`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  h1 {
    margin: 0;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .header {
    /* position: absolute;
    top: 0; */
    text-align: center;
    color: black;
    padding: 3vh;
  }

  .inner-header {
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

  .box-Accordion {
    width: 90%;
  }

  .contents {
    padding: 10px;
    margin: 1px;
  }
  .contents:hover {
    background-color: #e0e0e0;
  }
`
