export interface IDateFormat {
  date: string,
  timeSlot: string
};

export interface ICalendarState {
  selectedDate: Date | undefined;
  isCalendarOpen: boolean;
  isMorning: boolean;
};