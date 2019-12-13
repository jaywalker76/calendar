import React from "react";

const Calendar = () => {
  return (
    <div data-test="calendar-component">
      <div id="header" data-test="calendar-header">
        Header
      </div>
      <div data-test="calendar-current-date">Current Date</div>
      <div data-test="calendar-days">Days</div>
      <div data-test="calendar-cells">Cells</div>
    </div>
  );
};

export default Calendar;
