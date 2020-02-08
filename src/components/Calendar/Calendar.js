import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import injectSheet from "react-jss";

import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { getMonthYearString } from "./utils";

const Calendar = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows,
    onClick
  } = props;

  const workingDate = startDate !== undefined ? startDate : new Date();

  const [date, setDate] = useState(workingDate);

  const resolveDate = direction => {
    let newDate;
    if (direction === "left") {
      newDate = new Date(date.setMonth(date.getMonth() - 1));
    } else {
      newDate = new Date(date.setMonth(date.getMonth() + 1));
    }
    setDate(newDate);
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
