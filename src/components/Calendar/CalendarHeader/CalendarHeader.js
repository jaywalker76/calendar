import React from "react";

import {
  generateDaysColumn,
  cellGenerator,
  calendarHeader
} from "../calendar_functions";

import styling from "../style";

const CalendarHeader = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows
  } = props;
  return calendarHeader(startDate, styling, displayNavArrows);
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default CalendarHeader;
