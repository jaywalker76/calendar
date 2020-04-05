import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

// import { generateDaysColumn, cellGenerator } from "./calendar_functions";

import styling from "./style";

import { updateDateValue, getMonthYearString } from "./utils";

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

const Calendar = props => {
  const {
    startDate,
    dayDescriptorType,
    startOfWeek,
    includeHeader,
    displayNavArrows
  } = props;

  const calendarModule = new CalendarModule(startDate);

  const [date, setDate] = useState(calendarModule.instantiatedDate);

  const renderCalendarStructure = () => {
    let monthYearString = getMonthYearString(calendarModule.date);
    return (
      <div style={styling.calendarWrapper} data-test="calendar-component">
        {includeHeader && (
          <div id="calendar-header" data-test="calendar-header">
            {monthYearString}
          </div>
        )}
        <div data-test="calendar-body">The Calendar Body </div>
      </div>
    );
  };

  return <div style={styling.outerWrapper}>{renderCalendarStructure()}</div>;
};

export default Calendar;
