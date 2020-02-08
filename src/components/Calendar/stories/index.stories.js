import React from "react";

import Calendar from "../Calendar";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

export default { title: "Calendar" };

export const defaultCalendar = () => (
  <Calendar includeHeader={true} displayNavArrows={true} />
);
export const calendarWithNoHeader = () => (
  <Calendar startDate={"2019/12/01"} includeHeader={false} />
);
export const withSpecifiedStartDate = () => (
  <Calendar
    startDate={"2019/12/01"}
    dayDescriptorType={"short"}
    includeHeader={true}
  />
);
export const withNavFunction = () => (
  <Calendar
    startDate={"2019/12/01"}
    dayDescriptorType={"short"}
    includeHeader={true}
    displayNavArrows={true}
    onClick={() => {
      alert("Ok");
    }}
  />
);

/* should I fully replicate the functionality here?
Should it be available */
const resolveDate = direction => {
  alert("resolving the date: " + direction);
};

export const calendarHeader = () => (
  <CalendarHeader
    data-test="calendar-header"
    displayNavArrows={true}
    dateToDisplay={"December 2019"}
    onClick={resolveDate}
  />
);
