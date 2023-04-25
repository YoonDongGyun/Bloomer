import React, { useEffect, useRef } from "react";
import { SSection } from "./styles";

const SubTitle = () => {
  const letterRef1 = useRef<HTMLSpanElement>(null);
  const letterRef2 = useRef<HTMLSpanElement>(null);
  const letterRef3 = useRef<HTMLSpanElement>(null);
  const letterRef4 = useRef<HTMLSpanElement>(null);
  const regTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        letterRef1.current &&
        letterRef2.current &&
        letterRef3.current &&
        letterRef4.current &&
        regTextRef.current
      ) {
        letterRef1.current.classList.add("loaded");
        letterRef2.current.classList.add("loaded");
        letterRef3.current.classList.add("loaded");
        letterRef4.current.classList.add("loaded");
        regTextRef.current.classList.add("loaded");

        const intervalId = setInterval(() => {
          if (
            letterRef1.current &&
            letterRef2.current &&
            letterRef3.current &&
            letterRef4.current &&
            regTextRef.current
          ) {
            letterRef1.current.classList.toggle("loaded");
            letterRef2.current.classList.toggle("loaded");
            letterRef3.current.classList.toggle("loaded");
            letterRef4.current.classList.toggle("loaded");
            regTextRef.current.classList.toggle("loaded");
          }
        }, 5000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, 900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <SSection>
      <span ref={regTextRef} className="reg-text spanColor">
        감정을
      </span>
      <span ref={letterRef1} className="letter spanColor">
        &nbsp;꽃&nbsp;
      </span>
      <span ref={letterRef2} className="letter spanColor">
        피
      </span>
      <span ref={letterRef3} className="letter spanColor">
        우
      </span>
      <span ref={letterRef4} className="letter spanColor">
        다
      </span>
    </SSection>
  );
};

export default SubTitle;
