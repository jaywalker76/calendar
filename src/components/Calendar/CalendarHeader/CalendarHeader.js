import React from "react";

import styling from "./style";

import CalendarNavArrows from "../NavArrows/NavArrows";

const CalendarHeader = props => {
  const { dateToDisplay, displayNavArrows } = props;
  return (
    <div id="calendar-header" style={styling.calendarHeader}>
      {displayNavArrows && (
        <CalendarNavArrows data-test="header-nav" direction={"left"} />
      )}
      <div id="dateDisplay" data-test="calendar-header-date">
        {dateToDisplay}
      </div>
      {displayNavArrows && (
        <CalendarNavArrows data-test="header-nav" direction={"right"} />
      )}
    </div>
  );
};

export default CalendarHeader;
