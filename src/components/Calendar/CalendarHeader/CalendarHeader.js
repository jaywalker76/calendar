import React from "react";

import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styling from "./style";

const calendarNavArrows = (direction, styling) => (
  <div style={styling.navigationArrows} data-test="calendar-navigation-arrows">
    <FontAwesomeIcon
      icon={direction === "left" ? faChevronLeft : faChevronRight}
    />
  </div>
);

const CalendarHeader = props => {
  const { dateToDisplay, displayNavArrows } = props;
  return (
    <div id="calendar-header" style={styling.calendarHeader}>
      {displayNavArrows && calendarNavArrows("left", styling)}
      <div id="dateDisplay" data-test="calendar-header-date">
        {dateToDisplay}
      </div>
      {displayNavArrows && calendarNavArrows("right", styling)}
    </div>
  );
};

export default CalendarHeader;
