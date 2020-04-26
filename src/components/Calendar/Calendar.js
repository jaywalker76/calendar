/*
Responsible for presenting the visual representation of the Calendar
Instantiates a Calendar Model, using the functions in Module.js
Aglomerates all the components that make up the calendar into the final component
to be presented
*/
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

import { css } from "emotion";
import styling from "./style";

import { updateDateValue } from "./utils";

import CalendarModule from "../../new_module/Module";
import CalendarBody from "../Calendar/CalendarBody/CalendarBody";

const calendarContainerStyle = css`
  border: 1px solid black;
`;

const Calendar = (props) => {
  const {
    startDate,
    // dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows,
  } = props;

  const calendarModule = new CalendarModule(startDate);
  const calendarMonthObject = calendarModule.getMonthObject();

  // this function is to be invoked by parent component (calendar.js -> this is the component that retains the state)
  const getWeekDayNumbers = () => {
    const weekStartDay = startOfWeek === undefined ? 0 : startOfWeek;
    let dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    let remainingDays = dayNumbersArray.splice(weekStartDay);
    let orderedDays = remainingDays.concat(dayNumbersArray);

    dayNumbersArray = orderedDays;

    return dayNumbersArray;
  };

  const [date, setDate] = useState(calendarModule.instantiatedDate);
  const [weekDayNumbers, setWeekDayNumbers] = useState(getWeekDayNumbers());
  const retrievedDateToDisplay = calendarModule.generateDateString();

  const renderCalendarStructure = () => {
    return (
      <div className={calendarContainerStyle} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader dateToDisplay={retrievedDateToDisplay} />
        )}
        <CalendarBody
          monthObject={calendarMonthObject}
          calendarColHeader={weekDayNumbers}
        />
      </div>
    );
  };

  return <div style={styling.outerWrapper}>{renderCalendarStructure()}</div>;
};

export default Calendar;
