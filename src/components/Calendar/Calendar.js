import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import injectSheet from "react-jss";

import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { getMonthYearString, updateDateValue } from "./utils";

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

const Calendar = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows
  } = props;

  const workingDate = startDate !== undefined ? startDate : new Date();

  const [date, setDate] = useState(workingDate);

  const resolveDate = direction => {
    setDate(updateDateValue(direction, date));
  };

  return (
    <div style={styling.outerWrapper}>
      <div style={styling.calendarWrapper} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader
            data-test="calendar-header"
            displayNavArrows={displayNavArrows}
            dateToDisplay={getMonthYearString(date)}
            onClick={resolveDate}
          />
        )}
        <div style={styling.daysHeader} data-test="calendar-days-header">
          {generateDaysColumn(dayDescriptorType, startOfWeek, styling)}
        </div>
        <div>{cellGenerator(startDate, styling)}</div>
      </div>
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default Calendar;
