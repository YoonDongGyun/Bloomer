import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const SMain = styled.main<any>`
  width: 100%;
  display: flex;
  gap: 0.3rem;

  .flower-image-border {
    border-radius: 50%;
    height: 2.3rem;
    border: 3px solid #ececec;
    z-index: -1;
  }
`;

export const SItem = styled.div<any>`
  flex: auto;
  display: flex;
  gap: 1rem;
  z-index: -2;

  background-color: #f6f2ff;
  border-radius: 18px;
  padding: 0.9rem;

  .flower-image {
    background-color: #ffe897;
    border-radius: 50%;
    height: 3rem;
  }

  .diary__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .img-container {
      width: 100%;
      border-radius: 18px;
    }
    .content-container {
      margin: 0 !important;
      width: 100% !important;

      font-size: 0.5rem;
      line-height: 1.25rem;
      /* 줄바꿈 관련 */
      /* word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; */
      /* margin: 0; */
    }

    .info-container {
      text-align: right;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      align-items: center;
      color: #8a8a8a;
      font-size: 0.4rem;

      .comment-section {
        display: flex;
        gap: 0.2rem;
        align-items: center;
      }
    }
  }
`;

export const SIcon = styled(FontAwesomeIcon)`
  color: #8a8a8a;
  height: 0.7rem;
  z-index: -1;
`;
