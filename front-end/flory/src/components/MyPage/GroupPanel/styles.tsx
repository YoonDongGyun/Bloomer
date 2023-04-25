import styled from "styled-components"

export const SGroupPanel = styled.div`
  .BrowseGroup {
    background: #f6efff;
    text-align: center;
    font-size: 0.8em;
    padding: 8px;
    cursor: pointer;
  }
  .secessionGroup{
    background: rgb(241 207 207);
    text-align: center;
    font-size: 0.8em;
    padding: 8px;
    cursor: pointer;
  }

  .icon_flower {
    width: 20px;
    height: 20px;
    // margin-left: auto;
    margin-left: 5px;
  }

  .lastTime{
    font-size: 3px;
    margin-left: auto;
    color: gray;
  }

  .default{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 188px;
  }
`

export const SMember = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2px;
  .memberName {
    margin-left: 8px;
  }

  .deleteButton{
    padding: 7px;
    background: #ffb2b2;
  }  
`
