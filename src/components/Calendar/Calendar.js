/*
Responsible for presenting the visual representation of the Calendar
Instantiates a Calendar Model, using the functions in Module.js
Aglomerates all the components that make up the calendar into the final component
to be presented
*/
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

import { css } from "emotion";

import { updateDateValue } from "./utils";

import CalendarModule from "../../Core/CalendarCore";
import CalendarBody from "../Calendar/CalendarBody/CalendarBody";

const calendarContainerStyle = css`
  border: 1px solid black;
  width: 600px;
`;

const Calendar = (props) => {
  const {
    startDate,
    startOfWeek,
    dayDescriptorType,
    includeHeader,
    displayNavArrows,
  } = props;

  // this function is to be invoked by parent component (calendar.js -> this is the component that retains the state)
  const getWeekDayNumbers = () => {
    const weekStartDay = startOfWeek === undefined ? 0 : startOfWeek;
    let dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    let remainingDays = dayNumbersArray.splice(weekStartDay);
    let orderedDays = remainingDays.concat(dayNumbersArray);

    dayNumbersArray = orderedDays;

    return dayNumbersArray;
  };

  const [date, setDate] = useState(new Date(startDate));
  const [weekDayNumbers, setWeekDayNumbers] = useState(getWeekDayNumbers());

  const calendarModule = new CalendarModule(date, startOfWeek);
  const calendarMonthObject = calendarModule.getMonthObject();

  const retrievedDateToDisplay = calendarModule.generateDateString();

  const changeMonthDate = (e, direction) => {
    if(direction ==="left"){
      setDate(new Date(date.setMonth(date.getMonth() - 1)));
    } else {
      setDate(new Date(date.setMonth(date.getMonth() + 1)));
    }

    console.log(e.target.id);
  };

  const renderCalendarStructure = () => {
    return (
      <div className={calendarContainerStyle} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader
            dateToDisplay={retrievedDateToDisplay}
            displayNavArrows={displayNavArrows}
            onClick={changeMonthDate}
          />
        )}
        <CalendarBody
          monthObject={calendarMonthObject}
          calendarColHeader={weekDayNumbers}
          dayDescriptorType={dayDescriptorType}
        />
      </div>
    );
  };

  return renderCalendarStructure();
};

export default Calendar;
