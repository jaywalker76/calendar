/*
Responsible for rendering the Calendar Header
*/
import React from "react";

import { css } from "emotion";

const cellStyle = css`
  background: white;
  width: 100%;
  height: 120px;
  text-align: center;
  border: 1px solid gray;
`;

const dayNumber = css`
  line-height: 20px;
  text-align: end;
  font-size: 25px;
  padding: 5px;
`;

const eventWrapper = css`
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  border: 1px solid black;
  margin-bottom: 5px;
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
      // onClick={() => {
      //   alert("Hello");
      // }}
    >
      <div className={dayNumber}>{cell.day}</div>
      {cell.currentMonth}
      {cell.eventObject && cellEventRenderer(cell.eventObject)}
      {cell.additionalEvents && (
        <div className={eventWrapper} data-test='additional-events'>
          ...
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
