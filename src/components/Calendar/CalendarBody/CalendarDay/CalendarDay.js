import React from "react";
import CalendarCell from "../CalendarCell/CalendarCell";

import { css } from "emotion";

const cellStyle = css`
  background: white;
  width: 100%;
  height: 135px;
  text-align: center;
  border: 1px solid gray;
`;

const dayNumber = css`
  line-height: 20px;
  text-align: end;
  font-size: 25px;
  padding: 5px;
`;

const ellipsisWrapper = css`
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  border: 1px solid black;
  margin-bottom: 5px;
`;

const CalendarDay = (props) => {
  const { cell, cellId } = props;

  return (
    <div
      key={cellId}
      className={cellStyle}
      data-test='calendar-day'
      // onClick={() => {
      //   alert("Hello");
      // }}
    >
      <div className={dayNumber}>{cell.day}</div>
      {cell.currentMonth}
      {cell.eventObject && <CalendarCell events={cell.eventObject} />}

      {cell.additionalEvents && (
        <div className={ellipsisWrapper} data-test='additional-events'>
          ...
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
