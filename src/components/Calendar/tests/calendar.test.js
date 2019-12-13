import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Calendar from "../Calendar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Calendar structure", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the calendar structure", () => {
    const wrapper = shallow(<Calendar />);
    const calendarComponent = wrapper.find("[data-test='calendar-component']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the header", () => {
    const wrapper = shallow(<Calendar />);
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the days", () => {
    const wrapper = shallow(<Calendar />);
    const calendarComponent = wrapper.find("[data-test='calendar-days']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the cells", () => {
    const wrapper = shallow(<Calendar />);
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays current date date", () => {
    const wrapper = shallow(<Calendar />);
    const calendarComponent = wrapper.find(
      "[data-test='calendar-current-date']"
    );
    expect(calendarComponent.length).toBe(1);
  });
});
