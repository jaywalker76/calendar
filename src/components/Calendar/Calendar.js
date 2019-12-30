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

const cellGeneratorOld = dateParam => {
  let currDate;
  if (dateParam === undefined) {
    currDate = new Date();
  } else {
    currDate = new Date(dateParam);
  }

  // get number of days for month
  // determine starting day of month
  const numberOfDays = getNumberOfDaysInMonth(currDate);
  const weeksToRender = Math.ceil(numberOfDays / 7);

  const calendarWeeks = [];

  for (let i = 0; i < weeksToRender; i++) {
    calendarWeeks.push(
      <div class="row" style={styling.row} data-test="calendar-week-row">
        {daysGenerator(i, currDate)}
      </div>
    );
  }

  return calendarWeeks;
};

const generateCalHeader = (dayDescriptorType, startOfWeek) => {
  let curr = new Date("2019/04/01"); // get current date
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

  let firstDayOfMonth = startDate.getDay();
  let lastDayOfMonth = endDate.getDay();

  // get number of days for month
  // determine starting day of month
  const numberOfDays = getNumberOfDaysInMonth(currDate);
  const weeksToRender = Math.ceil(numberOfDays / 7);

  let weeks = [];
  let days = [];
  let dayCount = 0;

  for (let j = 0; j < weeksToRender; j++) {
    for (let k = 0; k < 7; k++) {
      if (j === 0) {
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
        days.push(
          <div style={styling.cell} data-test="calendar-cells">
            {addDaysToDate(startDate, dayCount).getDate()}
          </div>
        );
        dayCount++;
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
