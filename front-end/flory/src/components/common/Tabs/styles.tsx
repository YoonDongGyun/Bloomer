import styled from "styled-components";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

export const STabList = styled.div`
  display: flex;
  height: 40px;
  margin: 0px auto 10px;
  padding: 4px;
  background: #e6d1ff;
  border-radius: 8px;
`;

export const STabItem = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 12px;
  background-color: ${(props) =>
    props.isValue ? "#ffffff" : "rgba( 255, 255, 255, 0 )"};
  color: ${(props) => (props.isValue ? "#000000" : "#612FAB")};
  border-radius: 4px;
`;
