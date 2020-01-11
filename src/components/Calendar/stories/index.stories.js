import React from "react";

import Calendar from "../Calendar";

export default { title: "Calendar" };

export const defaultCalendar = () => (
  <Calendar includeHeader={true} displayNavArrows={true} />
);
export const withSpecifiedStartDate = () => (
  <Calendar
    startDate={"2019/12/01"}
    dayDescriptorType={"short"}
    includeHeader={true}
  />
);
