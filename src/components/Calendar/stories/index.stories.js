import React from "react";

import Calendar from "../Calendar";

export default { title: "Calendar" };

export const defaultCalendar = () => <Calendar />;
export const withSpecifiedStartDate = () => (
  <Calendar startDate={"2018/11/01"} dayDescriptorType={"short"} />
);
