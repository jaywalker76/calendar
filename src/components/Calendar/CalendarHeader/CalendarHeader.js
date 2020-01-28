import React from "react";

import styling from "./style";

import CalendarNavArrows from "../NavArrows/NavArrows";

const navClickHandler = () => {
  alert("Boom");
};

const CalendarHeader = props => {
  const { dateToDisplay, displayNavArrows } = props;
  return (
    <div id="calendar-header" style={styling.calendarHeader}>
      {displayNavArrows && (
        <CalendarNavArrows
          data-test="left-header-nav"
          direction={"left"}
          onClick={navClickHandler}
        />
      )}
      <div id="dateDisplay" data-test="calendar-header-date">
        {dateToDisplay}
      </div>
      {displayNavArrows && (
        <CalendarNavArrows
          data-test="right-header-nav"
          direction={"right"}
          onClick={navClickHandler}
        />
      )}
    </div>
  );
};

export default CalendarHeader;
