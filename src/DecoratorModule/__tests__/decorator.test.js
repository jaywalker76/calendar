import React from "react";
import events from "../../Events/eventlist";
import { renderCell } from "../Decorator";

const sampleRenderedCell = (
  <div class="css-v83txp-cellStyle" data-test="calendar-day-cell">
    1
  </div>
);

const cell_id = 0;
const sampleCell = {
  currentMonth: false,
  day: 29,
  weekday: 0,
};

describe("Decorator Module functionality", () => {
  it("Renders a calendar cell", () => {
    const renderedCalendarCell = renderCell(sampleCell, cell_id);

    expect(renderedCalendarCell).toEqual(sampleRenderedCell);
  });
});
