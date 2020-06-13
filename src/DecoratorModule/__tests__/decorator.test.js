import React from "react";
import eventlist from "../../Events/eventlist.js";

import { renderCell } from "../Decorator";

import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Calendar from "../../components/Calendar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  return mount(<Calendar {...props} />);
};

let wrapper;

describe("Decorator Module functionality", () => {
  // retrieve calendar body
  // count amount of cells that contain events
  it("Renders a calendar with events", () => {
    // const moduleInstance = new CalendarModule("04/01/2020");
    wrapper = setup({
      startDate: "2020/04/01",
    });

    const calendarBodyRows = wrapper.find("[data-test='event-cell']");

    // const generatedCell = renderCell();
    expect(calendarBodyRows).toBe(eventlist.length);
  });
  // correctly renders sequential events
  // correctly renders events across weeks
  // correctly renders events across months

  // expect(calendarBodyRows.length).toBe(35);

  // it("conditionally renders the calendar header", () => {
  //   wrapper = setup();
  //   const calendarComponent = wrapper.find("[data-test='calendar-component']");
  //   const calendarHeader = calendarComponent.find(
  //     "[data-test='calendar-header']"
  //   );
  //   expect(calendarHeader.length).toBe(0);
  // });
});
