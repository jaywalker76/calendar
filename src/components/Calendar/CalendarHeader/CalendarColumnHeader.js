import React from "react";

import { css, cx } from "emotion";

const dayColHeader = css`
  display: flex;
  justify-content: space-around;
  height: 35px;
  line-height: 35px;
`;

const CalendarColumnHeader = (props) => {
  const { weekHeaderObject } = props;

  return (
    <div className={dayColHeader} data-test="calendar-col-header">
      {weekHeaderObject.map((cell, id) => (
        <div key={id}>{cell}</div>
      ))}
    </div>
  );
};

export default CalendarColumnHeader;
