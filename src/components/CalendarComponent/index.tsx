import { useState } from "react";
import * as s from "./styles";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { format } from "date-fns";
import AddCalendarIcon from "../../images/components/Posting/AddCalendarIcon.svg";
import AddCalendarIconGray from "../../images/components/Posting/AddCalendarIconGray.svg";

const CalendarComponent = () => {
  const [selected, setSelected] = useState<Date>();
  let Text = <></>;
  if(selected) {
    Text = <>{format(selected, 'PP')}</>
  }

  const [isOpenCalendar ,setIsOpenCalendar] = useState(false);
  const onClickOpenBtn = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const [isMorning, setIsMorning] = useState<boolean>(true);
  const onClickMorning = () => {
    setIsMorning(true);
  };
  const onClickAfternoon = () => {
    setIsMorning(false);
  };

  return (
    <s.Wrapper>
      <style>{s.css}</style>
      <s.CalendarWrapper>
        <s.CalendarInfoWrapper onClick={onClickOpenBtn}>
          <s.CalendarIcon src={AddCalendarIconGray} alt="calendar" />
          <s.DateInfoText>
            {Text}
            {" | "}{isMorning ? "오전" : "오후"}
          </s.DateInfoText>
        </s.CalendarInfoWrapper>
        {
          isOpenCalendar ?
          <>
            <DayPicker 
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
            <s.MorningAfternoonWrapper>
              <s.Morning onClick={onClickMorning}>오전</s.Morning>
              <s.Afternoon onClick={onClickAfternoon}>오후</s.Afternoon>
            </s.MorningAfternoonWrapper>
          </>
          : null
        }
      </s.CalendarWrapper>
    </s.Wrapper>
  )
};

export default CalendarComponent;
