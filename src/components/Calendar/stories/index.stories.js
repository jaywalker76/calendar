import React, { useState } from "react";

import Calendar from "../Calendar";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

import { getMonthYearString, updateDateValue } from "../utils";

export default { title: "Calendar" };

// export const calendarWithNoHeader = () => (
//   <Calendar startDate={"2019/12/01"} includeHeader={false} />
// );
// export const withSpecifiedStartDate = () => (
//   <Calendar
//     startDate={"2019/12/01"}
//     dayDescriptorType={"short"}
//     includeHeader={true}
//   />
// );
// export const withNavFunction = () => (
//   <Calendar
//     startDate={"2019/12/01"}
//     dayDescriptorType={"short"}
//     includeHeader={true}
//     displayNavArrows={true}
//     onClick={() => {
//       alert("Ok");
//     }}
//   />
// );

// /* should I fully replicate the functionality here?
// Should it be available */

// const workingDate = new Date();

// const displayDateString = getMonthYearString(workingDate);

// const resolveDate = direction => {
//   alert("arrow clicked: " + direction);
// };
/*
const [date, setDate] = useState(workingDate);
const resolveDate = direction => {
  setDate(updateDateValue(direction, date));
};
*/
// ToDo: fix Calendar object rendering -> when no date is passed, the calendar
// object should be instantiated to the beginning of the month
export const defaultCalendar = () => (
  <Calendar startDate={"2020/04/01"} includeHeader={true} />
);

export const weekStartsOnMonday = () => (
  <Calendar startDate={"2020/04/01"} includeHeader={true} />
);

export const calendarHeader = () => (
  <CalendarHeader
    data-test="calendar-header"
    displayNavArrows={true}
    dateToDisplay={"April 2020"}
  />
);
