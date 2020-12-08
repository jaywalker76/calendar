import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import CalendarBody from "../CalendarBody";

import { June2020WithEvents } from "../../../../Core/CoreTestSamples/month_objects";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const calendarColHeader = [1, 2, 3, 4, 5, 6, 0];
const dayDescriptorType = "short";

const mockSetup = (props) => {
  return mount(
    <CalendarBody
      monthObject={June2020WithEvents}
      calendarColHeader={calendarColHeader}
      dayDescriptorType={dayDescriptorType}
    />
  );
};

let wrapper;

describe("Event positioning across calendar", () => {
  describe("event slot is correctly positioned across different days", () => {
    wrapper = mockSetup();
    const daysInMonth = wrapper.find("[data-test='calendar-day']");

    it("days in month", () => {
      debugger;
      expect(daysInMonth.length).toBe(35);
    });
  });
});
