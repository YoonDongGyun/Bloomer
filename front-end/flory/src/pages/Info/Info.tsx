import React, { useEffect, useRef } from "react";
import BackButton from "../../components/common/BackButton/BackButton";
import SubTitle from "../../components/Info/SubTitle/SubTitle";
import { SMain } from "./styles";
import "animate.css";
import Lottie from "react-lottie";
import emotionChange from "../../assets/imgs/lotties/emotion.json";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import RotatingText from "../../components/Info/RotatingText/RotatingText";
import DiaryFlower from "../../components/Diary/DiaryFlower/DiaryFlower";
import Crocus from "../../assets/imgs/crocus.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// 이미지
import DiaryCreate0 from "../../assets/imgs/info/diaryCreate0.png";
import DiaryCreate1 from "../../assets/imgs/info/diaryCreate1.png";
import DiaryCreate2 from "../../assets/imgs/info/diaryCreate2.png";
import DiaryCreate3 from "../../assets/imgs/info/diaryCreate3.png";
import DiaryCreate4 from "../../assets/imgs/info/diaryCreate4.png";
import DiaryDetail from "../../assets/imgs/info/diaryDetail.png";
import DiaryEdit from "../../assets/imgs/info/diaryEdit.png";
import DiaryList1 from "../../assets/imgs/info/diaryList1.png";
import DiaryList2 from "../../assets/imgs/info/diaryList2.png";
import DiaryList3 from "../../assets/imgs/info/diaryList3.png";
import DiaryMap1 from "../../assets/imgs/info/diaryMap1.png";
import DiaryMap2 from "../../assets/imgs/info/diaryMap2.png";
import DiaryMap3 from "../../assets/imgs/info/diaryMap3.png";
import DiaryMap4 from "../../assets/imgs/info/diaryMap4.png";
import GuestBook from "../../assets/imgs/info/guestBook1.png";
import MyPage1 from "../../assets/imgs/info/mypage1.png";
import MyPage2 from "../../assets/imgs/info/mypage2.png";
import MyPage3 from "../../assets/imgs/info/mypage3.png";
import OtherGarden1 from "../../assets/imgs/info/otherGarden1.png";
import OtherGarden2 from "../../assets/imgs/info/otherGarden2.png";
import { useLocation, useNavigate } from "react-router-dom";

const userHeight = window.innerHeight;

const Info = () => {
  const main = useRef<HTMLElement | null>(null);
  const head = useRef<any>(null);
  const section1 = useRef<HTMLElement | null>(null);
  const section2 = useRef<HTMLElement | null>(null);
  const arrowUp = useRef<HTMLButtonElement | null>(null);
  const infoTitle = useRef<HTMLParagraphElement | null>(null);
  const infoItem1 = useRef<HTMLDivElement | null>(null);
  const infoItem2 = useRef<HTMLDivElement | null>(null);
  const infoItem3 = useRef<HTMLDivElement | null>(null);
  const infoItem4 = useRef<HTMLDivElement | null>(null);
  const infoItem5 = useRef<HTMLDivElement | null>(null);
  const infoItem6 = useRef<HTMLDivElement | null>(null);
  const infoItem7 = useRef<HTMLDivElement | null>(null);
  const infoItem8 = useRef<HTMLDivElement | null>(null);
  const infoItem9 = useRef<HTMLDivElement | null>(null);
  const infoItem10 = useRef<HTMLDivElement | null>(null);
  const infoItem11 = useRef<HTMLDivElement | null>(null);
  const infoItem12 = useRef<HTMLDivElement | null>(null);
  const infoItem13 = useRef<HTMLDivElement | null>(null);
  const infoItem14 = useRef<HTMLDivElement | null>(null);
  const infoItem15 = useRef<HTMLDivElement | null>(null);
  const infoItem16 = useRef<HTMLDivElement | null>(null);
  const infoItem17 = useRef<HTMLDivElement | null>(null);
  const infoItem18 = useRef<HTMLDivElement | null>(null);
  const infoItem19 = useRef<HTMLDivElement | null>(null);
  const infoItem20 = useRef<HTMLDivElement | null>(null);
  const infoItem21 = useRef<HTMLDivElement | null>(null);
  const infoItem22 = useRef<HTMLDivElement | null>(null);
  const startButton = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const from = location.state?.from;

  const navigate = useNavigate();

  // lottieFile option
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emotionChange,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    main.current?.addEventListener("scroll", () => {
      // section 1
      if (head.current?.getBoundingClientRect().top < -200) {
        section1.current?.classList.add("animate__animated");
        section1.current?.classList.add("animate__fadeIn");
      } else {
        section1.current?.classList.remove("animate__animated");
        section1.current?.classList.remove("animate__fadeIn");
      }

      // Arrow up visible 이벤트
      if (head.current?.getBoundingClientRect().top < -700) {
        arrowUp.current?.classList.add("visible");
      } else {
        arrowUp.current?.classList.remove("visible");
      }

      const scrollTop = main.current?.scrollTop || 0;
      const section2OffsetTop = section2.current?.offsetTop || 0;

      // section 2
      if (scrollTop >= section2OffsetTop - userHeight + 100) {
        section2.current?.classList.add("animate__animated");
        section2.current?.classList.add("animate__fadeIn");
      } else {
        section2.current?.classList.remove("animate__animated");
        section2.current?.classList.remove("animate__fadeIn");
      }

      // section 3
      const titleRect = infoTitle.current?.getBoundingClientRect();
      if (titleRect?.top && titleRect.top <= userHeight) {
        infoTitle.current?.classList.add("animate__animated");
        infoTitle.current?.classList.add("animate__fadeIn");
      } else {
        infoTitle.current?.classList.remove("animate__animated");
        infoTitle.current?.classList.remove("animate__fadeIn");
      }

      function handleAnimation(item: any, userHeight: number) {
        const itemRect = item.current?.getBoundingClientRect();
        if (itemRect?.top && itemRect.top <= userHeight) {
          item.current?.classList.add("animate__animated");
          item.current?.classList.add("animate__fadeIn");
        } else {
          item.current?.classList.remove("animate__animated");
          item.current?.classList.remove("animate__fadeIn");
        }
      }

      handleAnimation(infoItem1, userHeight);
      handleAnimation(infoItem2, userHeight);
      handleAnimation(infoItem3, userHeight);
      handleAnimation(infoItem4, userHeight);
      handleAnimation(infoItem5, userHeight);
      handleAnimation(infoItem6, userHeight);
      handleAnimation(infoItem7, userHeight);
      handleAnimation(infoItem8, userHeight);
      handleAnimation(infoItem9, userHeight);
      handleAnimation(infoItem10, userHeight);
      handleAnimation(infoItem11, userHeight);
      handleAnimation(infoItem12, userHeight);
      handleAnimation(infoItem13, userHeight);
      handleAnimation(infoItem14, userHeight);
      handleAnimation(infoItem15, userHeight);
      handleAnimation(infoItem16, userHeight);
      handleAnimation(infoItem17, userHeight);
      handleAnimation(infoItem18, userHeight);
      handleAnimation(infoItem19, userHeight);
      handleAnimation(infoItem20, userHeight);
      handleAnimation(infoItem21, userHeight);
      handleAnimation(infoItem22, userHeight);
      handleAnimation(startButton, userHeight);
    });
  }, []);

  // 첫 화면에서 화살표를 누르면 section1으로 이동시키는 함수
  const handleMoveToSection = () => {
    section1.current?.scrollIntoView({ behavior: "smooth" });
    section1.current?.classList.add("animate__animated");
    section1.current?.classList.add("animate__fadeIn");
  };

  // Arrow up 버튼을 클릭하면 최상단으로 이동시키는 함수
  const handleScrollTop = () => {
    head.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGoBack = () => {
    // 뒤로가기
    if (from === "signup") {
      navigate("/login");
    } else if (from === "oauth") {
      navigate("/gardenTheme");
    } else {
      navigate("/garden");
    }
  };

  return (
    <SMain userHeight={userHeight} ref={main}>
      <BackButton color="purple" onClickAction={handleGoBack} />
      <div className="head" ref={head}>
        <h1 id="title">Bloomer</h1>
        <div className="text-container">
          {/* 감정을 꽃 피우다 블러 이벤트있는 컴포넌트 */}
          <SubTitle />
        </div>
        <button className="down__arrow" onClick={handleMoveToSection}>
          <MdKeyboardDoubleArrowDown size={42} color="e9e9e9" />
        </button>
      </div>

      {/* section 1 */}
      <section ref={section1} className="service__info-1">
        <p>다른 사람들의 소식으로 가득한 이 세상에서</p>
        <p>여러분은 자기 자신의 목소리에 귀 기울이고 있나요?</p>
        <RotatingText />
      </section>
      {/* <Lottie options={defaultOptions} /> */}

      {/* section 2 */}
      <section ref={section2} className="service__info-2">
        <p>Bloomer에서 내 소중한 감정을</p>
        <p>꽃으로 피워내어 정원을 가꾸고</p>
        <p>내가 어떤 감정을 느끼며</p>
        <p>살아가고 있는지 알아보세요!</p>
        <img className="crocus" src={Crocus} alt="크로커스" />
      </section>

      {/* 이용 안내 */}
      {/* section 3 */}
      <section className="service__info-3">
        <p className="info__img-title" ref={infoTitle}>
          이용안내
        </p>

        <div ref={infoItem1} className="content__wrapper">
          <img className="info__img" src={DiaryCreate0} alt="" />
          <p className="info__content">
            꽃이 피어날 정원의 테마(공원, 캠프, 해변)를 선택해주세요.
          </p>
          <p className="info__content">
            테마는 한 달 동안 유지되며 변경이 불가능하니
          </p>
          <p className="info__content">신중히 선택해주세요</p>
        </div>

        <div ref={infoItem2} className="content__wrapper">
          <img className="info__img" src={DiaryCreate1} alt="" />
          <p className="info__content">
            좌측 하단의 작성 버튼을 눌러 일기를 작성할 수 있습니다.
          </p>
        </div>

        <div ref={infoItem3} className="content__wrapper">
          <img className="info__img" src={DiaryCreate2} alt="" />
          <p className="info__content">솔직한 나의 감정을 기록해주세요.</p>
          <p className="info__content">
            기록할 일기의 공개 범위와 기록하고 싶은 위치를 설정할 수 있습니다.
          </p>
        </div>

        <div ref={infoItem4} className="content__wrapper">
          <img className="info__img" src={DiaryCreate3} alt="" />
          <p className="info__content">
            기록된 텍스트를 바탕으로 감정을 분석하여
          </p>
          <p className="info__content">
            감정과 매칭되는 꽃말을 가진 꽃들이 표시됩니다.
          </p>
          <p className="info__content">
            정원에 피워내고 싶은 꽃을 선택해주세요.
          </p>
        </div>

        <div ref={infoItem5} className="content__wrapper">
          <img className="info__img" src={DiaryCreate4} alt="" />
          <p className="info__content">
            추천 알고리즘을 통해 작성된 일기의 감정과
          </p>
          <p className="info__content">어울리는 음악들이 추천됩니다.</p>
          <p className="info__content">
            일기의 배경음악에 사용될 음악을 선택해주세요.
          </p>
        </div>

        <div ref={infoItem6} className="content__wrapper">
          {/* <img className="info__img" src={DiaryCreate4} alt="" /> */}
          <video autoPlay loop muted playsInline>
            <source
              src={`${process.env.PUBLIC_URL}/videos/gardenEdit_pc.mp4`}
              type="video/mp4"
            />
          </video>
          <p className="info__content">
            일기를 통해 피어난 꽃으로 정원을 꾸며보세요.
          </p>
          <p className="info__content">
            정원은 터치를 통해 상하좌우 회전과 줌이 가능합니다.
          </p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content">PC 기준</p>
          <p className="info__content">
            이동시키고 싶은 꽃을 클릭하면 꽃이 마우스를 따라 움직입니다.
          </p>
          <p className="info__content">
            원하는 위치를 클릭하면 꽃이 그 곳에 위치됩니다.
          </p>
        </div>

        <div ref={infoItem7} className="content__wrapper">
          {/* <img className="info__img" src={DiaryCreate4} alt="" /> */}
          <video autoPlay loop muted playsInline>
            <source
              src={`${process.env.PUBLIC_URL}/videos/gardenEdit_mobile.mp4`}
              type="video/mp4"
            />
          </video>
          <p className="info__content">모바일 기준</p>
          <p className="info__content">
            이동시키고 싶은 꽃을 터치 후 원하는 위치를 터치하면
          </p>
          <p className="info__content">꽃이 그 곳에 위치됩니다.</p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content">
            정원을 다 꾸몄다면 완료 버튼을 눌러주세요.
          </p>
        </div>

        <div ref={infoItem8} className="content__wrapper">
          <img className="info__img" src={DiaryDetail} alt="" />
          <p className="info__content">
            정원에 피어난 꽃을 클릭하면 일기의 상세 내용을
          </p>
          <p className="info__content">확인할 수 있습니다.</p>
          <p className="info__content">
            상세 내용에서는 일기의 수정을 통해 공개 범위를 재설정할 수
          </p>
          <p className="info__content">
            있으며, 삭제를 통해 해당 일기를 삭제할 수 있습니다.
          </p>
        </div>

        <div ref={infoItem9} className="content__wrapper">
          <img className="info__img" src={DiaryEdit} alt="" />
          <p className="info__content">
            정원을 다시 꾸미고 싶다면 정원 편집 버튼을 눌러주세요.
          </p>
        </div>

        <div ref={infoItem10} className="content__wrapper">
          <img className="info__img" src={DiaryList1} alt="" />
          <p className="info__content">
            일기 리스트 버튼을 통해 작성된 일기들의
          </p>
          <p className="info__content">리스트를 확인할 수 있습니다.</p>
        </div>

        <div ref={infoItem11} className="content__wrapper">
          <img className="info__img" src={DiaryList2} alt="" />
          <p className="info__content">
            일기 리스트에서는 월별 일기들을 확인할 수 있으며,
          </p>
          <p className="info__content">
            해당 일기를 클릭하면 상세 내용을 볼 수 있습니다.
          </p>
        </div>

        <div ref={infoItem12} className="content__wrapper">
          <img className="info__img" src={DiaryList3} alt="" />
          <p className="info__content">
            연도나 월을 클릭하면 원하는 연도와 월의
          </p>
          <p className="info__content">일기들을 선택하여 확인할 수 있습니다.</p>
        </div>

        <div ref={infoItem13} className="content__wrapper">
          <img className="info__img" src={DiaryMap1} alt="" />
          <p className="info__content">
            지도 버튼을 클릭하면 내 주변에 피어난 꽃을 확인할 수 있습니다.
          </p>
        </div>

        <div ref={infoItem14} className="content__wrapper">
          <img className="info__img" src={DiaryMap2} alt="" />
          <p className="info__content">
            내 주변 보기 탭에서는 지도의 범위 설정을 통해
          </p>
          <p className="info__content">
            내 주변에 피어난 꽃들을 확인할 수 있습니다.
          </p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content">
            지도를 통해 실제 내 주변에 기록된 감정을 찾아보고
          </p>
          <p className="info__content">댓글을 통해 공감해보세요.</p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content small">
            해당 일기들은 전체 공개 및 가입된 그룹의 일기들만 표시됩니다.
          </p>
        </div>

        <div ref={infoItem15} className="content__wrapper">
          <img className="info__img" src={DiaryMap3} alt="" />
          <p className="info__content">
            모든 감정 보기 탭에서는 전체 공개 설정된
          </p>
          <p className="info__content">모든 일기들을 확인할 수 있습니다.</p>
        </div>

        <div ref={infoItem16} className="content__wrapper">
          <img className="info__img" src={DiaryMap4} alt="" />
          <p className="info__content">
            그룹 감정 보기 탭에서는 가입된 그룹의 일기들을
          </p>
          <p className="info__content">
            {" "}
            확인할 수 있습니다. 우측 상단의 버튼을 통해 원하는
          </p>
          <p className="info__content"> 그룹을 선택할 수 있습니다.</p>
        </div>

        <div ref={infoItem17} className="content__wrapper">
          <img className="info__img" src={MyPage1} alt="" />
          <p className="info__content">
            내 정보 보기를 통해 나의 감정을 둘러볼 수 있습니다.
          </p>
        </div>

        <div ref={infoItem18} className="content__wrapper">
          <img className="info__img" src={MyPage2} alt="" />
          <p className="info__content">
            나의 감정 분포 탭에서는 이번 달에 기록된 나의 감정
          </p>
          <p className="info__content">
            분포와 지난주 대비 감정 분포를 확인할 수 있습니다.
          </p>
          <p className="info__content">
            나만을 위한 감정 리포트를 통해 나의 감정을 둘러보세요.
          </p>
        </div>

        <div ref={infoItem19} className="content__wrapper">
          <img className="info__img" src={MyPage3} alt="" />
          <p className="info__content">
            그룹 목록 보기 탭에서는 가입한 그룹의 목록을
          </p>
          <p className="info__content">
            확인할 수 있습니다. 그룹 둘러보기를 누르면 현재 생성되어
          </p>
          <p className="info__content">있는 그룹들을 둘러볼 수 있습니다.</p>
          <p className="info__content">
            감정을 나누고 싶은 그룹이 있다면 참여해보세요.
          </p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content">
            생성 버튼을 통해 새로운 그룹을 생성할 수도 있습니다.
          </p>
          <p className="info__content">
            마음맞는 사람들과 그룹을 만들어 서로 초대하고
          </p>
          <p className="info__content">소중한 감정을 나누어 보세요.</p>
        </div>

        <div ref={infoItem20} className="content__wrapper">
          <img className="info__img" src={GuestBook} alt="" />
          <p className="info__content">
            정원 안의 우체통을 클릭하면 방명록을 확인할 수 있습니다.
          </p>
        </div>

        <div ref={infoItem21} className="content__wrapper">
          <img className="info__img" src={OtherGarden1} alt="" />
          <p className="info__content">
            일기 작성자의 정원이 궁금하다면 닉네임을 클릭해보세요.
          </p>
          <p className="info__content">&nbsp;</p>
          <p className="info__content">
            댓글 작성자의 정원이 궁금하다면 프로필 사진이나
          </p>
          <p className="info__content">닉네임을 클릭해보세요.</p>
        </div>

        <div ref={infoItem22} className="content__wrapper lastItem">
          <img className="info__img" src={OtherGarden2} alt="" />
          <p className="info__content">
            방명록을 클릭해서 다른 사람의 정원에 방문한 후기를 남겨보세요.
          </p>
        </div>
        {from === "signup" ? (
          <div ref={startButton} className="btn__wrapper">
            <button className="btn" onClick={() => navigate("/login")}>
              시작하기
            </button>
          </div>
        ) : from === "oauth" ? (
          <div ref={startButton} className="btn__wrapper">
            <button className="btn" onClick={() => navigate("/gardenTheme")}>
              시작하기
            </button>
          </div>
        ) : (
          ""
        )}
      </section>

      {/* Arrow up */}
      <button className="arrow-up" ref={arrowUp} onClick={handleScrollTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </SMain>
  );
};

export default Info;
