import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { updateDateValue } from "./utils";

import CalendarModule from "../../new_module/Module";

/**
 * Props
 * {
 *  startDate,
 *  dayDescriptorType (if day description in header is long/short)
 *  startOfWeek (week start day),
    includeHeader
    displayNavArrows
 * }
  Object to receive - for full render mode
  {
    calendar header,
    calendar days column,
    calendar day cells
  }

 */

const Calendar = (props) => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows,
  } = props;

  const calendarModule = new CalendarModule(startDate);

  const [date, setDate] = useState(calendarModule.instantiatedDate);

  const renderCalendarStructure = () => {
    return (
      <div style={styling.calendarWrapper} data-test="calendar-component">
        <CalendarHeader dateToDisplay={"April 2020"} />
        The Calendar
      </div>
    );
  };

  return <div style={styling.outerWrapper}>{renderCalendarStructure()}</div>;
};

export default Calendar;
