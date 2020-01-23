import React from "react";

import styling from "./style";

const CalendarHeader = props => {
  const { dateToDisplay } = props;
  return (
    <div
      id="calendar-header"
      data-test="calendar-header"
      style={styling.calendarHeader}
    >
      <div id="dateDisplay">{dateToDisplay}</div>
    </div>
  );
};

export default CalendarHeader;
