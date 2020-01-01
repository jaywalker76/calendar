import React from "react";
// import injectSheet from "react-jss";
import {
  getMonthYearString,
  getDayName,
  getNumberOfDaysInMonth
} from "./utils";

const styling = {
  outerWrapper: {
    width: 600
  },
  calendarWrapper: {
    width: "100%",
    border: "1px solid black"
  },
  calendarHeader: {
    background: "blue",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#f9f9f9",
    fontSize: 30
  },
  daysHeader: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: "70%",
    borderBottom: "1px solid red"
  },
  dayHeaderCell: {
    textAlign: "center",
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: "100%"
  },
  row: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  cell: {
    maxWidth: "100%",
    flexGrow: 0,
    flexBasis: "calc(100% / 7)",
    width: "calc(100% / 7)",
    position: "relative",
    height: "5em"
  }
};

const addDaysToDate = (date, daysToAdd) => {
  let result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};

const daysGenerator = (weekNumber, dateParam) => {
  const days = [];

  let startDate;
  let endDate;

  let year = dateParam.getFullYear();
  let month = dateParam.getMonth();

  startDate = new Date(year, month, 1);
  endDate = new Date(year, month + 1, 1);

  let firstDayOfMonth = startDate.getDay();
  let lastDayOfMonth = endDate.getDay();

  for (let j = 0; j < 7; j++) {
    if (weekNumber === 0) {
      if (j >= firstDayOfMonth) {
        days.push(
          <div style={styling.cell} data-test="calendar-cells">
            {addDaysToDate(startDate, j + 1).getDate()}
          </div>
        );
      } else {
        days.push(
          <div style={styling.cell} data-test="calendar-cells">
            Buffer
          </div>
        );
      }
    } else if (weekNumber === 4) {
      if (j < lastDayOfMonth) {
        days.push(
          <div style={styling.cell} data-test="calendar-cells">
            Cells
          </div>
        );
      } else {
        days.push(
          <div style={styling.cell} data-test="calendar-cells">
            Buffer
          </div>
        );
      }
    } else {
      days.push(
        <div style={styling.cell} data-test="calendar-cells">
          Cells
        </div>
      );
    }
  }

  return days;
};

const getLastDayInMonth = dateParam => {
  let nextMonth = new Date(dateParam.setMonth(dateParam.getMonth() + 1));
  return new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
};

const getIsoWeek = dateParam => {
  let date = new Date(dateParam.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

  let week1 = new Date(date.getFullYear(), 0, 4);

  let weekNumber =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );

  let weekYear = dateParam.getFullYear();

  return {
    week: weekNumber,
    year: weekYear
  };
};

const getWeekDifferential = (lastWeek, firstWeek) => {
  if (lastWeek.year === firstWeek.year) {
    return lastWeek.week - firstWeek.week + 1;
  } else if (lastWeek.year > firstWeek.year) {
    return 52 + lastWeek.week - firstWeek.week + 1;
  } else {
    throw Error("Incorrect date params");
  }
};

const generateCalHeader = (dayDescriptorType, startOfWeek) => {
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

const cellGenerator = dateParam => {
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

  // let weeksToRender = Math.ceil(numberOfDays / 7);
  // check if weeks are in different years
  // if so adjust to reflect this
  let weeksToRender = getWeekDifferential(
    lastDayWeekNumber,
    firstDayWeekNumber
  );

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
  let days = [];
  let dayCount = 0;

  for (let j = 0; j < weeksToRender; j++) {
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
  }

  weeks.push(
    <div class="row" style={styling.row} data-test="calendar-week-row">
      {days}
    </div>
  );

  return weeks;
};

const Calendar = props => {
  const { startDate, dayDescriptorType, startOfWeek } = props;
  return (
    <div style={styling.outerWrapper}>
      <div style={styling.calendarWrapper} data-test="calendar-component">
        <div
          style={styling.calendarHeader}
          id="header"
          data-test="calendar-header"
        >
          {getMonthYearString(startDate)}
        </div>
        <div style={styling.daysHeader} data-test="calendar-days-header">
          {generateCalHeader(dayDescriptorType, startOfWeek)}
        </div>
        <div>{cellGenerator(startDate)}</div>
      </div>
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default Calendar;
