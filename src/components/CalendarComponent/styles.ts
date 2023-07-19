import styled from "@emotion/styled";

export const css = `
  .rdp {
    --rdp-cell-size: 25px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
`;

export const CalendarInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 190px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
`;

export const CalendarIcon = styled.img`
  display: flex;
  position: relative;
  left: 10px;
`;

export const DateInfoText = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  left: 20px;
`;

export const MorningAfternoonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 190px;
  height: 30px;
  background-color: #c9c9c9;
`;

export const Morning = styled.div`
  display: flex;
  width: 50%;
  border-right: 1px solid black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Afternoon = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;