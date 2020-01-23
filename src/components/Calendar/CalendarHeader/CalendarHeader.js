import React from "react";

import {
  generateDaysColumn,
  cellGenerator,
  calendarHeader
} from "../calendar_functions";

import styling from "./style";

const CalendarHeader = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows
  } = props;
  return (
    <div
      id="calendar-header"
      data-test="calendar-header"
      style={styling.calendarHeader}
    >
      {displayNavArrows && calendarNavArrows("left", styling)}
      <div id="dateDisplay">{getMonthYearString(startDate)}</div>
      {displayNavArrows && calendarNavArrows("right", styling)}
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default CalendarHeader;
