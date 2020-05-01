/*
Responsible for rendering the Calendar Header
*/
import React from "react";

import { css } from "emotion";

import CalendarNavArrows from "./CalendarNavigationArrows/CalendarNavigationArrows";

const calendarHeaderStyle = css`
  background: pink;
  height: 100px;
  display: flex;
  justify-content: space-around;
  color: white;
  font-size: 40px;
  line-height: 100px;
`;

const CalendarHeader = (props) => {
  const { dateToDisplay, displayNavArrows, onClick } = props;
  return (
    <div
      id="calendar-header"
      data-test="calendar-header"
      className={calendarHeaderStyle}
    >
      {displayNavArrows && (
        <CalendarNavArrows
          data-test="left-header-nav"
          direction={"left"}
          onClick={onClick}
        />
      )}
      <div id="dateDisplay" data-test="calendar-header-date">
        {dateToDisplay}
      </div>
      {displayNavArrows && (
        <CalendarNavArrows
          data-test="right-header-nav"
          direction={"right"}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default CalendarHeader;
