import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import injectSheet from "react-jss";

import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { getMonthYearString, updateDateValue } from "./utils";

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
