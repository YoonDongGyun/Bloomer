import styled from "styled-components"

export const GlobalStyle = styled.div`
  margin-top: -30px;
  *,
  *::after,
  *::before {
    padding: 0;
    margin-top: 0;
    box-sizing: border-box;
  }

  width: 100%;
  height: 65vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* min-height: 20vh; */
  overflow: hidden;
  perspective: 1000px;

  .flowers {
    position: relative;
    transform: scale(0.6);
  }

  @media screen and (max-width: 360px) {
    .flowers {
      transform: scale(1.2);
    }
  }

  @media screen and (min-width: 361px) and (max-width: 379px) {
    .flowers {
      transform: scale(1.1);
    }
  }

  @media screen and (min-width: 380px) and (max-width: 429px) {
    .flowers {
      transform: scale(1);
    }
  }
  @media screen and (min-width: 430px) and (max-width: 469px) {
    .flowers {
      transform: scale(0.9);
    }
  }

  @media screen and (min-width: 470px) and (max-width: 520px) {
    .flowers {
      transform: scale(0.8);
    }
  }

  @media screen and (min-width: 521px) and (max-width: 619px) {
    .flowers {
      transform: scale(0.7);
    }
  }

  .flower {
    position: absolute;
    bottom: 10vmin;
    transform-origin: bottom center;
    z-index: 10;

    --fl-speed: 0.8s;

    &--1 {
      animation: moving-flower-1 4s linear infinite;
      .flower__line {
        $delay: 0.3s;

        height: 70vmin;
        animation-delay: $delay;

        &__leaf {
          &--1 {
            animation: blooming-leaf-right var(--fl-speed) 1.6s backwards;
          }

          &--2 {
            animation: blooming-leaf-right var(--fl-speed) 1.4s backwards;
          }

          &--3 {
            animation: blooming-leaf-left var(--fl-speed) 1.2s backwards;
          }

          &--4 {
            animation: blooming-leaf-left var(--fl-speed) 1s backwards;
          }

          &--5 {
            animation: blooming-leaf-right var(--fl-speed) 1.8s backwards;
          }

          &--6 {
            animation: blooming-leaf-left var(--fl-speed) 2s backwards;
          }
        }
      }
    }

    &--2 {
      left: 50%;
      transform: rotate(20deg);
      animation: moving-flower-2 4s linear infinite;
      .flower__line {
        height: 60vmin;
        animation-delay: 0.6s;

        &__leaf {
          &--1 {
            animation: blooming-leaf-right var(--fl-speed) 1.9s backwards;
          }

          &--2 {
            animation: blooming-leaf-right var(--fl-speed) 1.7s backwards;
          }

          &--3 {
            animation: blooming-leaf-left var(--fl-speed) 1.5s backwards;
          }

          &--4 {
            animation: blooming-leaf-left var(--fl-speed) 1.3s backwards;
          }
        }
      }
    }

    &--3 {
      left: 50%;
      transform: rotate(-15deg);
      animation: moving-flower-3 4s linear infinite;
      .flower__line {
        animation-delay: 0.9s;
        &__leaf {
          &--1 {
            animation: blooming-leaf-right var(--fl-speed) 2.5s backwards;
          }

          &--2 {
            animation: blooming-leaf-right var(--fl-speed) 2.3s backwards;
          }

          &--3 {
            animation: blooming-leaf-left var(--fl-speed) 2.1s backwards;
          }

          &--4 {
            animation: blooming-leaf-left var(--fl-speed) 1.9s backwards;
          }
        }
      }
    }

    &__leafs {
      position: relative;
      animation: blooming-flower 2s backwards;

      $delay: 0.8;
      $inc: 0.3;

      @for $i from 1 through 3 {
        &--#{$i} {
          $delay: $delay + $inc;
          animation-delay: #{$delay}s;
        }
      }

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-50%, -100%);
        width: 8vmin;
        height: 8vmin;
        /* 꽃 뒤에 광원 */
        background-color: #ed39ed;
        filter: blur(10vmin);
      }
    }

    &__leaf {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 8vmin;
      height: 11vmin;
      border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
      /* 꽃잎 색 */
      background-image: linear-gradient(to top, #fe6198, #ffffff);
      transform-origin: bottom center;
      opacity: 0.9;
      box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);

      &--1 {
        transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
      }

      &--2 {
        transform: translate(-50%, -4%) rotateX(40deg);
      }

      &--3 {
        transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
      }

      &--4 {
        width: 8vmin;
        height: 8vmin;
        transform-origin: bottom left;
        border-radius: 4vmin 10vmin 4vmin 4vmin;
        transform: translate(-0%, 18%) rotateX(70deg) rotate(-43deg);
        /* 꽃 받침 색 */
        background: transparent;
        z-index: 10;
      }
    }

    &__white-circle {
      position: absolute;
      left: -3.5vmin;
      top: -3vmin;
      width: 9vmin;
      height: 4vmin;
      border-radius: 50%;
      background-image: linear-gradient(#fb98c9, #fd5b93);

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        border-radius: inherit;
        background: transparent;
        /* background-image: linear-gradient(90deg, #b1144b); */
      }
    }

    &__line {
      height: 55vmin;
      width: 1.5vmin;
      /* 줄기 */
      background-image: linear-gradient(
          to left,
          rgb(0, 0, 0, 0.2),
          transparent,
          #4d126b4e
        ),
        linear-gradient(to top, transparent 10%, #8f6ee96d, #7dd3dd6b);
      /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0); */
      animation: grow-flower-tree 4s backwards;

      &__leaf {
        --w: 7vmin;
        --h: calc(var(--w) + 2vmin);
        position: absolute;
        top: 20%;
        left: 90%;
        width: var(--w);
        height: var(--h);
        border-top-right-radius: var(--h);
        border-bottom-left-radius: var(--h);
        /* 메인줄기 잎 */
        background-image: linear-gradient(
          to top,
          rgba(13, 100, 105, 0.182),
          #8f6ee963
        );

        &--1 {
          transform: rotate(70deg) rotateY(30deg);
        }

        &--2 {
          top: 45%;
          transform: rotate(70deg) rotateY(30deg);
        }

        &--3,
        &--4,
        &--6 {
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: var(--h);
          border-bottom-right-radius: var(--h);
          left: -460%;
          top: 12%;
          transform: rotate(-70deg) rotateY(30deg);
        }

        &--4 {
          top: 40%;
        }

        &--5 {
          top: 0;
          transform-origin: left;
          transform: rotate(70deg) rotateY(30deg) scale(0.6);
        }

        &--6 {
          top: -2%;
          left: -450%;
          transform-origin: right;
          transform: rotate(-70deg) rotateY(30deg) scale(0.6);
        }
      }
    }

    &__light {
      position: absolute;
      bottom: 0vmin;
      width: 1vmin;
      height: 1vmin;
      background-color: rgb(255, 131, 131);
      border-radius: 50%;
      filter: blur(0.2vmin);
      animation: light-ans 4s linear infinite backwards;

      &:nth-child(odd) {
        background-color: #f1fd8885;
      }

      &--1 {
        left: -2vmin;
        animation-delay: 1s;
      }

      &--2 {
        left: 3vmin;
        animation-delay: 0.5s;
      }

      &--3 {
        left: -6vmin;
        animation-delay: 0.3s;
      }

      &--4 {
        left: 6vmin;
        animation-delay: 0.9s;
      }

      &--5 {
        left: -1vmin;
        animation-delay: 1.5s;
      }

      &--6 {
        left: -4vmin;
        animation-delay: 3s;
      }

      &--7 {
        left: 3vmin;
        animation-delay: 2s;
      }

      &--8 {
        left: -6vmin;
        animation-delay: 3.5s;
      }
    }

    &__grass {
      /* 퍼지는 잎 2개 */
      --c: #3185125e;
      --line-w: 1.5vmin;

      position: absolute;
      bottom: 12vmin;
      left: -7vmin;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      z-index: 20;
      transform-origin: bottom center;
      transform: rotate(-48deg) rotateY(40deg);

      &--1 {
        animation: moving-grass 2s linear infinite;
      }

      &--2 {
        left: 2vmin;
        bottom: 10vmin;
        transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
        opacity: 0.8;
        z-index: 0;
        animation: moving-grass--2 1.5s linear infinite;
      }

      &--top {
        width: 7vmin;
        height: 10vmin;
        border-top-right-radius: 100%;
        border-right: var(--line-w) solid var(--c);
        transform-origin: bottom center;
        transform: rotate(-2deg);
      }

      &--bottom {
        margin-top: -2px;
        width: var(--line-w);
        height: 25vmin;
        background-image: linear-gradient(to top, transparent, var(--c));
      }

      &__leaf {
        --size: 10vmin;
        position: absolute;
        width: calc(var(--size) * 2.1);
        height: var(--size);
        border-top-left-radius: var(--size);
        border-top-right-radius: var(--size);
        background-image: linear-gradient(
          to top,
          transparent,
          transparent 30%,
          var(--c)
        );
        z-index: 100;

        $speed-leaf: 2s;

        &--1 {
          top: -6%;
          left: 30%;
          --size: 6vmin;
          transform: rotate(-20deg);
          animation: growing-grass-ans--1 $speed-leaf 2.6s backwards;
          @keyframes growing-grass-ans--1 {
            0% {
              transform-origin: bottom left;
              transform: rotate(-20deg) scale(0);
            }
          }
        }

        &--2 {
          top: -5%;
          left: -110%;
          --size: 6vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--2 $speed-leaf 2.4s linear backwards;
          @keyframes growing-grass-ans--2 {
            0% {
              transform-origin: bottom right;
              transform: rotate(10deg) scale(0);
            }
          }
        }

        &--3 {
          top: 5%;
          left: 60%;
          --size: 8vmin;
          transform: rotate(-18deg) rotateX(-20deg);
          animation: growing-grass-ans--3 $speed-leaf 2.2s linear backwards;
          @keyframes growing-grass-ans--3 {
            0% {
              transform-origin: bottom left;
              transform: rotate(-18deg) rotateX(-20deg) scale(0);
            }
          }
        }

        &--4 {
          top: 6%;
          left: -135%;
          --size: 8vmin;
          transform: rotate(2deg);
          animation: growing-grass-ans--4 $speed-leaf 2s linear backwards;
          @keyframes growing-grass-ans--4 {
            0% {
              transform-origin: bottom right;
              transform: rotate(2deg) scale(0);
            }
          }
        }

        &--5 {
          top: 20%;
          left: 60%;
          --size: 10vmin;
          transform: rotate(-24deg) rotateX(-20deg);
          animation: growing-grass-ans--5 $speed-leaf 1.8s linear backwards;
          @keyframes growing-grass-ans--5 {
            0% {
              transform-origin: bottom left;
              transform: rotate(-24deg) rotateX(-20deg) scale(0);
            }
          }
        }

        &--6 {
          top: 22%;
          left: -180%;
          --size: 10vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--6 $speed-leaf 1.6s linear backwards;
          @keyframes growing-grass-ans--6 {
            0% {
              transform-origin: bottom right;
              transform: rotate(10deg) scale(0);
            }
          }
        }

        &--7 {
          top: 39%;
          left: 70%;
          --size: 10vmin;
          transform: rotate(-10deg);
          animation: growing-grass-ans--7 $speed-leaf 1.4s linear backwards;
          @keyframes growing-grass-ans--7 {
            0% {
              transform-origin: bottom left;
              transform: rotate(-10deg) scale(0);
            }
          }
        }

        &--8 {
          top: 40%;
          left: -215%;
          --size: 11vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--8 $speed-leaf 1.2s linear backwards;
          @keyframes growing-grass-ans--8 {
            0% {
              transform-origin: bottom right;
              transform: rotate(10deg) scale(0);
            }
          }
        }
      }

      &__overlay {
        position: absolute;
        top: -10%;
        right: 0%;
        width: 100%;
        height: 100%;
        /* background-color: rgba(255, 255, 255, 0.415); */
        filter: blur(1.5vmin);
        z-index: 100;
      }
    }

    /* 맨 왼쪽 줄기 */
    &__g-long {
      --w: 2vmin;
      --h: 6vmin;
      --c: #5120a08f;
      position: absolute;
      bottom: 10vmin;
      left: -3vmin;
      transform-origin: bottom center;
      transform: rotate(-30deg) rotateY(-20deg);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      animation: flower-g-long-ans 3s linear infinite;

      @keyframes flower-g-long-ans {
        0%,
        100% {
          transform: rotate(-30deg) rotateY(-20deg);
        }

        50% {
          transform: rotate(-32deg) rotateY(-20deg);
        }
      }

      &__top {
        top: calc(var(--h) * -1);
        width: calc(var(--w) + 1vmin);
        height: var(--h);
        border-top-right-radius: 100%;
        border-right: 0.7vmin solid var(--c);
        transform: translate(-0.7vmin, 1vmin);
      }

      &__bottom {
        width: var(--w);
        height: 50vmin;
        transform-origin: bottom center;
        background-image: linear-gradient(to top, transparent 30%, var(--c));
        /* box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5); */
        clip-path: polygon(35% 0, 65% 1%, 100% 100%, 0% 100%);
      }
    }

    &__g-right {
      position: absolute;
      bottom: 6vmin;
      left: -2vmin;
      transform-origin: bottom left;
      transform: rotate(20deg);

      .leaf {
        width: 30vmin;
        height: 50vmin;
        border-top-left-radius: 100%;
        border-left: 2vmin solid #8036ff7a;
        background-image: linear-gradient(
          to bottom,
          transparent,
          var(--dark-color) 60%
        );
        -webkit-mask-image: linear-gradient(
          to top,
          transparent 30%,
          #fdf8ff 60%
        );
      }

      &--1 {
        animation: flower-g-right-ans 2.5s linear infinite;
      }

      &--2 {
        left: 5vmin;
        transform: rotateY(-180deg);
        animation: flower-g-right-ans--2 3s linear infinite;

        .leaf {
          height: 75vmin;
          filter: blur(0.3vmin);
          opacity: 0.8;
        }
      }

      @keyframes flower-g-right-ans {
        0%,
        100% {
          transform: rotate(20deg);
        }

        50% {
          transform: rotate(24deg) rotateX(-20deg);
        }
      }

      @keyframes flower-g-right-ans--2 {
        0%,
        100% {
          transform: rotateY(-180deg) rotate(0deg) rotateX(-20deg);
        }

        50% {
          transform: rotateY(-180deg) rotate(6deg) rotateX(-20deg);
        }
      }
    }

    &__g-front {
      position: absolute;
      bottom: 6vmin;
      left: 2.5vmin;
      z-index: 100;
      transform-origin: bottom center;
      transform: rotate(-28deg) rotateY(30deg) scale(1.04);
      animation: flower__g-front-ans 2s linear infinite;

      @keyframes flower__g-front-ans {
        0%,
        100% {
          transform: rotate(-28deg) rotateY(30deg) scale(1.04);
        }
        50% {
          transform: rotate(-35deg) rotateY(40deg) scale(1.04);
        }
      }

      &__line {
        width: 0.3vmin;
        height: 20vmin;
        background-image: linear-gradient(
          to top,
          transparent,
          #421d8d6d,
          transparent 100%
        );
        position: relative;
      }

      &__leaf-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: bottom left;
        transform: rotate(10deg);

        &:nth-child(even) {
          left: 0vmin;
          transform: rotateY(-180deg) rotate(5deg);
          animation: flower__g-front__leaf-left-ans 1s ease-in backwards;
        }

        &:nth-child(odd) {
          animation: flower__g-front__leaf-ans 1s ease-in backwards;
        }

        &--1 {
          top: -8vmin;
          transform: scale(0.7);
          animation: flower__g-front__leaf-ans 1s 5.5s ease-in backwards !important;
        }

        &--2 {
          top: -8vmin;
          transform: rotateY(-180deg) scale(0.7) !important;
          animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important;
        }

        &--3 {
          top: -3vmin;
          animation: flower__g-front__leaf-ans 1s 4.6s ease-in backwards;
        }

        &--4 {
          top: -3vmin;
          transform: rotateY(-180deg) scale(0.9) !important;
          animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important;
        }

        @keyframes flower__g-front__leaf-left-ans-2 {
          0% {
            transform: rotateY(-180deg) scale(0);
          }
        }

        &--5,
        &--6 {
          top: 2vmin;
        }

        &--7,
        &--8 {
          top: 6.5vmin;
        }

        &--2 {
          animation-delay: 5.2s !important;
        }

        &--3 {
          animation-delay: 4.9s !important;
        }

        &--5 {
          animation-delay: 4.3s !important;
        }

        &--6 {
          animation-delay: 4.1s !important;
        }

        &--7 {
          animation-delay: 3.8s !important;
        }

        &--8 {
          animation-delay: 3.5s !important;
        }

        @keyframes flower__g-front__leaf-ans {
          0% {
            transform: rotate(10deg) scale(0);
          }
        }

        @keyframes flower__g-front__leaf-left-ans {
          0% {
            transform: rotateY(-180deg) rotate(5deg) scale(0);
          }
        }
      }

      &__leaf {
        width: 10vmin;
        height: 10vmin;
        border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%;
        /* box-shadow: inset 0 2px 1vmin hsla(184, 97%, 58%, 0.2); */
        background-image: linear-gradient(
            to bottom left,
            transparent,
            #16680171 98%
          ),
          linear-gradient(
            to bottom right,
            #4d74e16c 50%,
            transparent 50%,
            transparent
          );

        -webkit-mask-image: linear-gradient(
          to bottom right,
          #0000006c 50%,
          transparent 50%,
          transparent
        );
        mask-image: linear-gradient(
          to bottom right,
          #ffffffc7 50%,
          transparent 50%,
          transparent
        );
      }
    }

    &__g-fr {
      position: absolute;
      bottom: -4vmin;
      left: vmin;
      transform-origin: bottom left;
      z-index: 10;

      animation: flower__g-fr-ans 2s linear infinite;

      @keyframes flower__g-fr-ans {
        0%,
        100% {
          transform: rotate(2deg);
        }
        50% {
          transform: rotate(4deg);
        }
      }

      .leaf {
        width: 30vmin;
        height: 50vmin;
        border-top-left-radius: 100%;
        border-left: 2vmin solid #7858135e;
        -webkit-mask-image: linear-gradient(
          to top,
          transparent 25%,
          #5d791587 50%
        );
        position: relative;
        z-index: 1;
      }

      &__leaf {
        position: absolute;
        top: 0;
        left: 0;
        width: 10vmin;
        height: 10vmin;
        border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%;
        /* box-shadow: inset 0 2px 1vmin hsla(184, 97%, 58%, 0.2); */
        background-image: linear-gradient(
            to bottom left,
            transparent,
            #dca42c5e 98%
          ),
          linear-gradient(
            to bottom right,
            #ad833079 45%,
            transparent 50%,
            transparent
          );

        -webkit-mask-image: linear-gradient(
          135deg,
          #ffffffbb 40%,
          transparent 50%,
          transparent
        );

        &--1 {
          left: 20vmin;
          transform: rotate(45deg);

          animation: flower__g-fr-leaft-ans-1 0.5s 5.2s linear backwards;

          @keyframes flower__g-fr-leaft-ans-1 {
            0% {
              transform-origin: left;
              transform: rotate(45deg) scale(0);
            }
          }
        }

        &--2 {
          left: 12vmin;
          top: -7vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 5s linear backwards;
        }

        &--3 {
          left: 15vmin;
          top: 6vmin;
          transform: rotate(55deg);
          animation: flower__g-fr-leaft-ans-5 0.5s 4.8s linear backwards;
        }

        &--4 {
          left: 6vmin;
          top: -2vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 4.6s linear backwards;
        }

        &--5 {
          left: 10vmin;
          top: 14vmin;
          transform: rotate(55deg);
          animation: flower__g-fr-leaft-ans-5 0.5s 4.4s linear backwards;

          @keyframes flower__g-fr-leaft-ans-5 {
            0% {
              transform-origin: left;
              transform: rotate(55deg) scale(0);
            }
          }
        }

        &--6 {
          left: 0vmin;
          top: 6vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 4.2s linear backwards;

          @keyframes flower__g-fr-leaft-ans-6 {
            0% {
              transform-origin: right;
              transform: rotate(25deg) rotateY(-180deg) scale(0);
            }
          }
        }

        &--7 {
          left: 5vmin;
          top: 22vmin;
          transform: rotate(45deg);
          animation: flower__g-fr-leaft-ans-7 0.5s 4s linear backwards;

          @keyframes flower__g-fr-leaft-ans-7 {
            0% {
              transform-origin: left;
              transform: rotate(45deg) scale(0);
            }
          }
        }

        &--8 {
          left: -4vmin;
          top: 15vmin;
          transform: rotate(15deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-8 0.5s 3.8s linear backwards;

          @keyframes flower__g-fr-leaft-ans-8 {
            0% {
              transform-origin: right;
              transform: rotate(15deg) rotateY(-180deg) scale(0);
            }
          }
        }
      }
    }
  }

  @keyframes leaf-ans-1 {
    0%,
    100% {
      transform: rotate(-5deg) scale(1);
    }

    50% {
      transform: rotate(5deg) scale(1.1);
    }
  }

  @keyframes leaf-ans-2 {
    0%,
    100% {
      transform: rotateY(-180deg) rotate(5deg);
    }

    50% {
      transform: rotateY(-180deg) rotate(0deg) scale(1.1);
    }
  }

  @keyframes leaf-ans-3 {
    0%,
    100% {
      transform: rotate(-10deg) rotateY(-180deg);
    }

    50% {
      transform: rotate(-20deg) rotateY(-180deg);
    }
  }

  .grow-ans {
    animation: grow-ans 2s 1.2s backwards;
  }

  @keyframes grow-ans {
    0% {
      transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes light-ans {
    0% {
      opacity: 0;
      transform: translateY(0vmin);
    }

    25% {
      opacity: 1;
      transform: translateY(-5vmin) translateX(-2vmin);
    }

    50% {
      opacity: 1;
      transform: translateY(-15vmin) translateX(2vmin);
      filter: blur(0.2vmin);
    }

    75% {
      transform: translateY(-20vmin) translateX(-2vmin);
      filter: blur(0.2vmin);
    }

    100% {
      transform: translateY(-30vmin);
      opacity: 0;
      filter: blur(1vmin);
    }
  }

  @keyframes moving-flower-1 {
    0%,
    100% {
      transform: rotate(2deg);
    }

    50% {
      transform: rotate(-2deg);
    }
  }

  @keyframes moving-flower-2 {
    0%,
    100% {
      transform: rotate(18deg);
    }

    50% {
      transform: rotate(14deg);
    }
  }

  @keyframes moving-flower-3 {
    0%,
    100% {
      transform: rotate(-18deg);
    }

    50% {
      transform: rotate(-20deg) rotateY(-10deg);
    }
  }

  @keyframes blooming-leaf-right {
    0% {
      transform-origin: left;
      transform: rotate(70deg) rotateY(30deg) scale(0);
    }
  }

  @keyframes blooming-leaf-left {
    0% {
      transform-origin: right;
      transform: rotate(-70deg) rotateY(30deg) scale(0);
    }
  }

  @keyframes grow-flower-tree {
    0% {
      height: 0;
      border-radius: 1vmin;
    }
  }

  @keyframes blooming-flower {
    0% {
      transform: scale(0);
    }
  }

  @keyframes moving-grass {
    0%,
    100% {
      transform: rotate(-48deg) rotateY(40deg);
    }

    50% {
      transform: rotate(-50deg) rotateY(40deg);
    }
  }

  @keyframes moving-grass--2 {
    0%,
    100% {
      transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
    }

    50% {
      transform: scale(0.5) rotate(79deg) rotateX(10deg) rotateY(-200deg);
    }
  }

  .growing-grass {
    animation: growing-grass-ans 1s 2s backwards;
  }

  @keyframes growing-grass-ans {
    0% {
      transform: scale(0);
    }
  }

  /* .not-loaded * {
    animation-play-state: paused !important;
  } */
`
