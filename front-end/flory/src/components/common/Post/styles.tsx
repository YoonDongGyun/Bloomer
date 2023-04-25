import styled from "styled-components"

export const SPost = styled.div`
  .subject{
    margin: 2px auto;
    padding-top: 15px;
    padding-bottom: 10px;
  }
  .post-title{
    font-size: 22px;
    background: linear-gradient(
      #2E2162,
      #554C86 0%,
      #816BDD 100%
    );
    color: transparent;
    -webkit-background-clip: text;
    font-weight: bolder;
    display: inline-block;
    padding-bottom:5px;
  }

  .addition{
    display: inline-block;
    float: right;
    // padding: 10px;
    font-size: 22px;
  }
`
