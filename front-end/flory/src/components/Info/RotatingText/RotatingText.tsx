import React, { useEffect } from "react";
import { SDiv } from "./styles";

const RotatingText = () => {
  useEffect(() => {
    let words = document.querySelectorAll(".word");
    words.forEach((word: any) => {
      let letters = word.textContent.split("");
      word.textContent = "";
      letters.forEach((letter: any) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    (words[currentWordIndex] as HTMLElement).style.opacity = "1";

    let rotateText = () => {
      let currentWord = words[currentWordIndex];
      let nextWord =
        currentWordIndex === maxWordIndex
          ? words[0]
          : words[currentWordIndex + 1];
      // rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = "letter out";
        }, i * 80);
      });
      // reveal and rotate in letters of next word
      (nextWord as HTMLElement).style.opacity = "1";
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
          letter.className = "letter in";
        }, 340 + i * 80);
      });
      currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    rotateText();
    setInterval(rotateText, 4000);
  }, []);

  return (
    <SDiv>
      <div className="rotating-text">
        <p>오늘의 나는&nbsp;</p>
        <p>
          <span className="word alizarin">화가&nbsp;난다.</span>
          <span className="word wisteria">평온하다.</span>
          <span className="word emerald">기쁘다.</span>
          <span className="word peter-river">슬프다.</span>
          <span className="word purple">불안하다.</span>
          <span className="word sun-flower">괴롭다.</span>
          <span className="word orange">당황스럽다.</span>
        </p>
      </div>
    </SDiv>
  );
};

export default RotatingText;
