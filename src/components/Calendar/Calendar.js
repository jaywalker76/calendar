import React from "react";
// import injectSheet from "react-jss";
import { getMonthYearString, getDayName, getNumberOfDaysInMonth } from "./utils";

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
  row:{
    margin:0,
    padding:0,
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    width:"100%"
  },
  cell:{
    maxWidth:"100%",
    flexGrow:0,
    flexBasis:"calc(100% / 7)",
    width:"calc(100% / 7)",
    position:"relative",
    height:"5em",
  }
};

const cellGenerator = (startDate) => {
  // get number of days for month
  // determine starting day of month
  //
  const numberOfDays = getNumberOfDaysInMonth(startDate)
  const weeksToRender = Math.ceil(numberOfDays/7);

  const stuff = [];

  const days = [];
  for(let i=0; i < 7; i++){
    days.push(<div style={styling.cell} data-test="calendar-cells">Cells</div>)
  }

  for(let i=0; i < weeksToRender; i++){
    stuff.push(
      <div class="row" style={styling.row} data-test='calendar-week-row'>
        {days}
      </div>
    )
  }

  return stuff
}

const generateCalHeader = (dayDescriptorType, startOfWeek) => {
  let curr = new Date(); // get current date
  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  // week starts on sunday adding a digit to first increments the starting day of
  // the week
  let dayNames = [];

  for (let i = 0; i < 7; i++) {
    dayNames.push(
      getDayName(new Date(curr.setDate(first + i)), dayDescriptorType)
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
