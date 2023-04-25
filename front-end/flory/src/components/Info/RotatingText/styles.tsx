import styled from "styled-components";

export const SDiv = styled.div`
  margin-top: 3rem;

  .right {
    margin-top: 1rem;
    transform: translateX(4rem);
  }
  /* span {
    transform: translateX(1rem);
  } */

  .rotating-text {
    font-size: 36px;
    color: rgb(223, 222, 222);
    display: flex;
    transform: translateX(-2.2rem);

    p {
      display: inline-flex;
      margin: 0;
      vertical-align: top;
      color: white;

      .word {
        position: absolute;
        display: flex;
        opacity: 0;

        .letter {
          transform-origin: center center 25px;

          &.out {
            transform: rotateX(90deg);
            transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
          }
          &.in {
            transition: 0.38s ease;
          }
          &.behind {
            transform: rotateX(-90deg);
          }
        }
      }
    }
  }

  .alizarin {
    color: #ff8c9b;
  }

  .wisteria {
    color: #c2f9b9;
  }

  .peter-river {
    color: #3498db;
  }

  .emerald {
    color: #ffe897;
  }

  .sun-flower {
    color: #6972c0;
  }

  .purple {
    color: #d4aafa;
  }

  .orange {
    color: #ffb59e;
  }
`;
