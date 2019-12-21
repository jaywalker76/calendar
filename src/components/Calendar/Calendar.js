import React from "react";
import injectSheet from "react-jss";
import { getMonthYearString } from "./utils";

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
  }
};

function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

const generateCalHeader = () => {
  const mondayValue = "2019-12";
  let curr = new Date(); // get current date
  let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6

  let firstdayOfWeek = new Date(curr.setDate(first));

  let dayNames = [];

  for (let i = 0; i < 7; i++) {
    dayNames.push(getDayName(new Date(curr.setDate(first + i))));
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
  const { startDate } = props;
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
          {generateCalHeader()}
        </div>
        <div data-test="calendar-cells">Cells</div>
      </div>
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default Calendar;
