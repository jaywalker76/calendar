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

const daysGenerator = (weekNumber, startingMonthDay, endingMonthDay) => {
  const days = [];

  for (let j = 0; j < 7; j++) {
    if (weekNumber === 0) {
      if (j >= startingMonthDay) {
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
    } else if (weekNumber === 4) {
      if (j < endingMonthDay) {
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

  /*

  for(let j=0; j < 7; j++){
    if(weekNumber===0){
      if(j >= startingMonthDay){
        days.push(<div style={styling.cell} data-test="calendar-cells">Cells</div>)
    } else {} else {

      days.push(<div style={styling.cell} data-test="calendar-cells">Cells</div>)
    }
*/
  return days;
};

const cellGenerator = dateParam => {
  // get number of days for month
  // determine starting day of month
  const numberOfDays = getNumberOfDaysInMonth(dateParam);
  const weeksToRender = Math.ceil(numberOfDays / 7);
  let startDate;
  let endDate;
  let currDate;

  // get first day of month
  // getDay -> 0 for when day is sunday

  // if startDate is undefined -> set curr date
  // need ways to check that passed in date is valid
  if (dateParam === undefined) {
    currDate = new Date();
  } else {
    // need to extract end date from passed in date value
    currDate = new Date(dateParam);
  }

  let year = currDate.getFullYear();
  let month = currDate.getMonth();

  startDate = new Date(year, month, 1);
  endDate = new Date(year, month + 1, 1);

  /*

  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
   */

  let firstDayOfMonth = startDate.getDay();
  let lastDayOfMonth = endDate.getDay();

  const calendarWeeks = [];

  for (let i = 0; i < weeksToRender; i++) {
    calendarWeeks.push(
      <div class="row" style={styling.row} data-test="calendar-week-row">
        {daysGenerator(i, firstDayOfMonth, lastDayOfMonth)}
      </div>
    );
  }

  return calendarWeeks;
};

const addDaysToDate = (date, daysToAdd) => {
  let result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};

/*
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
 */

const generateCalHeader = (dayDescriptorType, startOfWeek) => {
  let curr = new Date("2019/04/01"); // get current date
  // week starts on sunday adding a digit to first increments the starting day of
  // the week
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
