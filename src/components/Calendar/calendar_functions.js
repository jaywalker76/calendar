import React from "react";

import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getMonthYearString,
  getDayName,
  getNumberOfDaysInMonth,
  addDaysToDate,
  getIsoWeek,
  getWeekDifferential
} from "./utils";

/**
 *
 * Presentational Code
 */

const generateDaysColumn = (dayDescriptorType, startOfWeek, styling) => {
  let currentDate = new Date();
  // get first day of current week
  let day = currentDate.getDay();
  let diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
  // starting date on header as monday
  let curr = new Date(currentDate.setDate(diff));
  // ToDo - Adjust header to adjust to configured week day

  let dayNames = [];

  for (let i = 0; i < 7; i++) {
    dayNames.push(
      getDayName(new Date(addDaysToDate(curr, i)), dayDescriptorType)
    );
  }

  return (
    <>
      {dayNames.map(day => (
        <div key={day} style={styling.dayHeaderCell} data-test="calendar-days">
          {day}
        </div>
      ))}
    </>
  );
};

const cellGenerator = (dateParam, styling) => {
  let currDate;
  if (dateParam === undefined) {
    currDate = new Date();
  } else {
    currDate = new Date(dateParam);
  }

  let year = currDate.getFullYear();
  let month = currDate.getMonth();

  let startDate = new Date(year, month, 1);
  let endDate = new Date(year, month + 1, 1);

  // get number of days for month
  // determine starting day of month
  const numberOfDays = getNumberOfDaysInMonth(currDate);

  let firstDayWeekNumber = getIsoWeek(startDate);
  let lastDayWeekNumber = getIsoWeek(endDate);

  // if so adjust to reflect this
  let weeksToRender = getWeekDifferential(
    lastDayWeekNumber,
    firstDayWeekNumber
  );

  // set this as a prop
  let mondayIsFirst = true;

  let firstDayOfMonth = startDate.getDay();

  if (mondayIsFirst) {
    if (firstDayOfMonth === 0) {
      firstDayOfMonth = 6;
    } else {
      firstDayOfMonth = firstDayOfMonth - 1;
    }
  }

  let lastDayOfMonth = endDate.getDay();

  let weeks = [];
  let days;
  let dayCount = 0;

  for (let j = 0; j < weeksToRender; j++) {
    days = [];
    for (let k = 0; k < 7; k++) {
      if (j === 0) {
        // determine what is first day of week and control push
        if (k >= firstDayOfMonth) {
          days.push(
            <div style={styling.cell} data-test="calendar-cells">
              {addDaysToDate(startDate, dayCount).getDate()}
            </div>
          );
          dayCount++;
        } else {
          days.push(
            <div style={styling.cell} data-test="calendar-cells">
              Buffer
            </div>
          );
        }
      } else {
        if (dayCount < numberOfDays) {
          days.push(
            <div style={styling.cell} data-test="calendar-cells">
              {addDaysToDate(startDate, dayCount).getDate()}
            </div>
          );
          dayCount++;
        } else {
          days.push(
            <div style={styling.cell} data-test="calendar-cells">
              Buffer
            </div>
          );
        }
      }
    }

    weeks.push(
      <div class="row" style={styling.row} data-test="calendar-week-row">
        {days}
      </div>
    );
  }

  return weeks;
};

const calendarNavArrows = (direction, styling) => (
  <div style={styling.navigationArrows} data-test="calendar-navigation-arrows">
    <FontAwesomeIcon
      icon={direction === "left" ? faChevronLeft : faChevronRight}
    />
  </div>
);

export { generateDaysColumn, cellGenerator, calendarNavArrows };
