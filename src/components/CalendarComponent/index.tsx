import * as s from "./styles";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { format } from "date-fns";
import AddCalendarIconGray from "../../images/components/Posting/AddCalendarIconGray.svg";


type CalendarComponentProps = {
  selectedDate: Date | undefined;
  isCalendarOpen: boolean;
  isMorning: boolean;
  onUpdateState: (newState: {
    selectedDate: Date | undefined;
    isCalendarOpen: boolean;
    isMorning: boolean;
  }) => void;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  selectedDate,
  isCalendarOpen,
  isMorning,
  onUpdateState,
}) => {

  let Text = <></>;
  if(selectedDate) {
    Text = <>{format(selectedDate, 'PP')}</>
  }

  const onClickOpenBtn = () => {
    onUpdateState({
      selectedDate,
      isCalendarOpen: !isCalendarOpen,
      isMorning,
    })
  };

  const onClickDate = () => {
    onUpdateState({
      selectedDate,
      isCalendarOpen: false,
      isMorning,
    });
  };

  const onClickMorning = () => {
    onUpdateState({
      selectedDate,
      isCalendarOpen,
      isMorning: true,
    });
  };
  const onClickAfternoon = () => {
    onUpdateState({
      selectedDate,
      isCalendarOpen,
      isMorning: false,
    });
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
          isCalendarOpen ?
          <>
            <DayPicker 
              mode="single"
              selected={selectedDate}
              onSelect={(date) => onUpdateState({
                selectedDate: date,
                isCalendarOpen,
                isMorning,
              })}              
              onDayClick={onClickDate}
              style={{ zIndex: 0 }}
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
