import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

import { css } from "emotion";

// import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { updateDateValue } from "./utils";

import CalendarModule from "../../new_module/Module";

/**
 * Props
 * {
 *  startDate,
 *  dayDescriptorType (if day description in header is long/short)
 *  startOfWeek (week start day),
    includeHeader
    displayNavArrows
 * }
  Object to receive - for full render mode
  {
    calendar header,
    calendar days column,
    calendar day cells
  }

 */

const calendarContainerStyle = css`
  border: 1px solid black;
`;

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

const generateCalendarBody = (calendarDateObject) => {
  return calendarDateObject.map((rows) => (
    <div className={rowStyle} data-test="calendar-rows">
      {rows.map((cell) => (
        <div className={cellStyle} data-test="calendar-day-cell">
          {cell.day}
          {cell.currentMonth}
        </div>
      ))}
    </div>
  ));
};

const calendarWeekHeader = (weekHeaderObject) => {
  return weekHeaderObject.map((cell) => <div>{cell}</div>);
};

const Calendar = (props) => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows,
  } = props;

  const calendarModule = new CalendarModule(startDate);

  const [date, setDate] = useState(calendarModule.instantiatedDate);
  const retrievedDateToDisplay = calendarModule.generateDateString();

  const renderCalendarStructure = () => {
    return (
      <div className={calendarContainerStyle} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader dateToDisplay={retrievedDateToDisplay} />
        )}
        <div data-test="calendar-col-header">
          {calendarWeekHeader(calendarModule.getWeekHeader())}
        </div>
        <div data-test="calendar-body">
          {generateCalendarBody(calendarModule.getMonthObject())}
        </div>
      </div>
    );
  };

  return <div style={styling.outerWrapper}>{renderCalendarStructure()}</div>;
};

export default Calendar;
