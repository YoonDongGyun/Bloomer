import styled from "styled-components";
import ReactWordcloud from 'react-wordcloud';

export const SDistPanel = styled.div`
  .default{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 188px;
  }
  .keywordBox{
    width: '100%';
    height: '100%';
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
  }
`
export const StyledWordCloud = styled(ReactWordcloud)`
  width: '100%';
  height: '100%';
  padding: '0px';
`;