/*
Responsible for rendering the column header for the week days in the calendar
*/
import React from "react";

import { css, cx } from "emotion";

const dayColHeader = css`
  display: flex;
  justify-content: space-around;
  height: 35px;
  line-height: 35px;
`;

const CalendarColumnHeader = (props) => {
  const { calendarColHeader } = props;

  const getLocalizedDayNames = (locale) => {
    let lcl = locale !== undefined ? locale : "en-US";

    let baseDate = new Date(Date.UTC(2020, 0, 5)); //sunday
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(baseDate.toLocaleDateString(lcl, { weekday: "short" }));
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekdays;
  };

  const getWeekDayNames = () => {
    let weekdayNames = [];
    let localizedWeekdayNames = getLocalizedDayNames();
    let weekDayNumbers = calendarColHeader;
    debugger;
    for (let i = 0; i < localizedWeekdayNames.length; i++) {
      weekdayNames.push(localizedWeekdayNames[weekDayNumbers[i]]);
    }

    return weekdayNames;
  };

  const weekHeaderObject = getWeekDayNames();

  return (
    <div className={dayColHeader} data-test="calendar-col-header">
      {weekHeaderObject.map((cell, id) => (
        <div key={id}>{cell}</div>
      ))}
    </div>
  );
};

export default CalendarColumnHeader;
