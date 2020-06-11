/*
Responsible for presenting the calendar body
*/
import React from "react";

import { css } from "emotion";
import CalendarColumnHeader from "../CalendarHeader/CalendarColumnHeader/CalendarColumnHeader";
import { renderCell } from "../../../DecoratorModule/Decorator";

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

const CalendarBody = (props) => {
  const { monthObject, calendarColHeader, dayDescriptorType } = props;

  return (
    <>
      <CalendarColumnHeader
        calendarColHeader={calendarColHeader}
        dayDescriptorType={dayDescriptorType}
      />
      <div data-test="calendar-body">
        {monthObject.map((rows, row_id) => (
          <div key={row_id} className={rowStyle} data-test="calendar-rows">
            {rows.map((cell, cell_id) => {
              return renderCell(cell, cell_id);
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarBody;
