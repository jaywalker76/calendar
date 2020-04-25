/*
Responsible for presenting the visual representation of the Calendar
Instantiates a Calendar Model, using the functions in Module.js
Aglomerates all the components that make up the calendar into the final component
to be presented
*/
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

import { css } from "emotion";

// import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { updateDateValue } from "./utils";

import CalendarModule from "../../new_module/Module";
import CalendarColumnHeader from "./CalendarHeader/CalendarColumnHeader/CalendarColumnHeader";
import CalendarBody from "../Calendar/CalendarBody/CalendarBody";

const calendarContainerStyle = css`
  border: 1px solid black;
`;

const Calendar = (props) => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows,
  } = props;

  const calendarModule = new CalendarModule(startDate);
  const weekHeaderObject = calendarModule.getWeekHeader();
  const calendarMonthObject = calendarModule.getMonthObject();

  const [date, setDate] = useState(calendarModule.instantiatedDate);
  const retrievedDateToDisplay = calendarModule.generateDateString();

  const renderCalendarStructure = () => {
    return (
      <div className={calendarContainerStyle} data-test="calendar-component">
        {includeHeader && (
          <CalendarHeader dateToDisplay={retrievedDateToDisplay} />
        )}
        <CalendarBody
          monthObject={calendarMonthObject}
          weekHeaderObject={weekHeaderObject}
        />
      </div>
    );
  };

  return <div style={styling.outerWrapper}>{renderCalendarStructure()}</div>;
};

export default Calendar;
