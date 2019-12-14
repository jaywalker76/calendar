import React from "react";
import injectSheet from "react-jss";
import getMonthYearString from "./utils";

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
  }
};

const Calendar = () => {
  return (
    <div style={styling.outerWrapper}>
      <div style={styling.calendarWrapper} data-test="calendar-component">
        <div
          style={styling.calendarHeader}
          id="header"
          data-test="calendar-header"
        >
          {getMonthYearString(new Date())}
        </div>
        <div data-test="calendar-days">Days</div>
        <div data-test="calendar-cells">Cells</div>
      </div>
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default Calendar;
