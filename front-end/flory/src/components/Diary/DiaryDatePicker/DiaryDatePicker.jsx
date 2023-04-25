import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-mobile-datepicker";

const DiaryDatePicker = ({
  year,
  setYear,
  month,
  setMonth,
  open,
  handleClose,
}) => {
  const today = new Date();
  const [time, setTime] = useState(new Date(year, month - 1));

  const dateConfig = {
    year: {
      type: "year",
      format: "YYYY",
      caption: "년도",
      step: 1,
    },

    month: {
      type: "month",
      format: "M",
      caption: "월",
      step: 1,
    },
  };

  // picker 값 바꼈을 때 업데이트
  const handleChange = useCallback((time) => {
    setTime(time);
  });

  // picker 값 확정하고 버튼 누르면 화면에 보여질 년도 및 월 업데이트
  const handleSelect = useCallback((time) => {
    setYear(time.getFullYear());
    setMonth(time.getMonth() + 1);
    handleClose();
  });

  return (
    <>
      <DatePicker
        value={time}
        isOpen={open}
        dateConfig={dateConfig}
        showHeader={false}
        min={new Date(2022, 12)} // 보유한 일기 중 최소 날짜
        max={new Date(today.getFullYear(), today.getMonth())} // 보유한 일기 중 최대 날짜
        onChange={handleChange}
        onSelect={handleSelect}
        onCancel={handleClose}
        confirmText={`${time.getFullYear()}년 ${
          time.getMonth() + 1
        }월 일기 보러가기`}
        cancelText=""
      />
    </>
  );
};

export default DiaryDatePicker;
