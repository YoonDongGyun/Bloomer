import styled, { css } from "styled-components";

export const SSection = styled.section<any>`
  position: relative;
  padding: 2rem 0;
  display: grid;

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-name {
    /* margin-left: 1rem; */
    font-size: 1rem;
    cursor: pointer;
  }

  .setting {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .fhywNn {
    width: 3rem;
    height: 3rem;
  }

  .post-it {
    display: table;
    margin: 0 auto;
  }

  .comment {
    margin-top: 1rem;
    text-align: left;
    font-size: 0.85rem;
    width: 100%;
    word-break: break-all;
  }

  .note {
    -webkit-box-shadow: #ddd 0px 1px 2px;
    position: relative;
    background-color: ${(props) => props.color};
    border-color: #dee184;
    text-align: center;
    margin: 1em auto;
    padding: 1.5em 1em;
    -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    -webkit-transform: rotate(2deg);
    -moz-transform: rotate(2deg);
    -o-transform: rotate(2deg);
    -ms-transform: rotate(2deg);
    transform: rotate(${(props) => props.deg}deg);
    width: 20rem;
    /* width: 10rem; */
    font-size: 1em;
  }
  .note:after {
    display: block;
    content: "";
    position: absolute;
    width: 110px;
    height: 30px;
    top: -21px;
    left: 34%;
    border: 1px solid #fff;
    background: rgba(254, 254, 254, 0.6);
    -webkit-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
  }

  .date {
    margin-top: 1rem;
    text-align: right;
    font-size: 0.7rem;
  }
`;
