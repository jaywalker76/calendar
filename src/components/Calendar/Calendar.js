import React from "react";
import injectSheet from "react-jss";

const styling = {
  outerWrapper: {
    width: 600
  },
  calendarWrapper: {
    width: "100%",
    border: "1px solid black"
  }
};

const Calendar = () => {
  return (
    <div style={styling.outerWrapper}>
      <div style={styling.calendarWrapper} data-test="calendar-component">
        <div id="header" data-test="calendar-header">
          Header
        </div>
        <div data-test="calendar-current-date">Current Date</div>
        <div data-test="calendar-days">Days</div>
        <div data-test="calendar-cells">Cells</div>
      </div>
    </div>
  );
};

// const StyledCalendar = injectSheet(styles)(Calendar);

export default Calendar;
