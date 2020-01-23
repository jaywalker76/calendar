import React from "react";

import styling from "./style";

const CalendarHeader = props => {
  const { dateToDisplay } = props;
  return (
    <div id="calendar-header" style={styling.calendarHeader}>
      <div id="dateDisplay" data-test="calendar-header-date">
        {dateToDisplay}
      </div>
    </div>
  );
};

export default CalendarHeader;
