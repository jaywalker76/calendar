/*
Responsible for rendering the Calendar Header
*/
import React from "react";

import { css } from "emotion";

const cellStyle = css`
  background: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: aquamarine;
  border: 1px solid gray;
`;

const dayNumber = css`
  line-height: 20px;
  text-align: end;
`;

const eventWrapper = css`
  display: flex;
  line-height: 20px;
  justify-content: center;
`;

const cellEventRenderer = (eventDetails) => {
  return eventDetails.map((element) => {
    return (
      <div className={eventWrapper}>
        {element.eventStart && <div data-test='event-start'>[</div>}
        {element.eventBody && <div data-test='event-body'>{"Body"}</div>}
        {element.eventEnd && <div data-test='event-end'>]</div>}
      </div>
    );
  });
};

const CalendarCell = (props) => {
  const { cell, cellId } = props;

  return (
    <div
      key={cellId}
      className={cellStyle}
      data-test='calendar-day-cell'
      onClick={() => {
        alert("Hello");
      }}
    >
      <div className={dayNumber}>{cell.day}</div>
      {cell.currentMonth}
      {cell.eventObject && cellEventRenderer(cell.eventObject)}
    </div>
  );
};

export default CalendarCell;
