/*
Responsible for presenting the calendar body
*/
import React from "react";

import { css } from "emotion";
import CalendarColumnHeader from "../CalendarHeader/CalendarColumnHeader/CalendarColumnHeader";

const rowStyle = css`
  background: pink;
  border: 1px solid blue;
  display: flex;
  justify-content: space-around;
  height: 50px;
`;

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

const CalendarBody = (props) => {
  const { monthObject, calendarColHeader, dayDescriptorType } = props;

  return (
    <>
      <CalendarColumnHeader
        calendarColHeader={calendarColHeader}
        dayDescriptorType={dayDescriptorType}
      />
      <div data-test='calendar-body'>
        {monthObject.map((rows, row_id) => (
          <div key={row_id} className={rowStyle} data-test='calendar-rows'>
            {rows.map((cell, cell_id) => {
              return (
                <div
                  key={cell_id}
                  className={cellStyle}
                  data-test='calendar-day-cell'
                  onClick={() => {
                    alert("Hello");
                  }}
                >
                  <div className={dayNumber}>{cell.day}</div>
                  {cell.currentMonth}
                  {cell.eventObject && (
                    <div className={eventWrapper}>
                      {cell.eventObject.eventStart && (
                        <div data-test='event-start'>[</div>
                      )}
                      {cell.eventObject.eventBody && (
                        <div data-test='event-body'>{"Body"}</div>
                      )}
                      {cell.eventObject.eventEnd && (
                        <div data-test='event-end'>]</div>
                      )}
                      {cell.eventObject.eventStart}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarBody;
