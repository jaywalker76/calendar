import React from "react";
import { css } from "emotion";

const cellStyle = css`
  background: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: aquamarine;
  border: 1px solid gray;
`;

function renderCell(dayCell, cell_id) {
  return (
    <div
      key={cell_id}
      className={cellStyle}
      data-test="calendar-day-cell"
      onClick={() => {
        alert("Hello");
      }}
    >
      {dayCell.day}
      {dayCell.currentMonth}
    </div>
  );
}

// read list of events
loadEvents: () => {};
// render events
// aux function: refactor object so that events are shaped and grouped on a per day basis:
// thinking about presenting a structure that can be read in one pass
// alternatively, the render day function can call a function that will check if there are any events
// for that specific day, as it cycles through the rendering cycle
// Might make sense to have the day rendering as is be the responsibility of the decorator

// I might need the date object
export { renderCell };
