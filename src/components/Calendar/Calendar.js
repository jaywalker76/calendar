import React from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import injectSheet from "react-jss";

import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

const Calendar = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows
  } = props;

  return (
    <div style={styling.outerWrapper}>
      <div style={styling.calendarWrapper} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader
            data-test="calendar-header"
            dateToDisplay={"January 2010"}
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
