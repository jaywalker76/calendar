import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Calendar from "../Calendar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * [Factory function to create a ShallowWrapper for the App Component]
 * @function setup
 * @param  {Object} [props={}]   [props to pass to component]
 * @param  {[type]} [state=null] [component count state]
 * @return {[type]}              [shallow App]
 */
const setup = (props = {}, state = null) => {
  return mount(<Calendar {...props} />);
};

let wrapper;

describe("Calendar structure", () => {
  it("renders without crashing", () => {
    wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
  it("renders the calendar wrapper", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-component']");
    expect(calendarComponent.length).toBe(1);
  });
  it("renders the calendar header", () => {
    wrapper = setup({ includeHeader: true });
    const calendarComponent = wrapper.find("[data-test='calendar-component']");
    const calendarHeader = calendarComponent.find(
      "[data-test='calendar-header']"
    );
    expect(calendarHeader.length).toBe(1);
  });
  it("conditionally renders the calendar header", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-component']");
    const calendarHeader = calendarComponent.find(
      "[data-test='calendar-header']"
    );
    expect(calendarHeader.length).toBe(0);
  });
  it("renders the calendar week col header", () => {
    wrapper = setup();
    const calendarColHeader = wrapper.find("[data-test='calendar-col-header']");
    expect(calendarColHeader.length).toBe(1);
  });
  it("renders the calendar body", () => {
    wrapper = setup();
    const calendarBody = wrapper.find("[data-test='calendar-body']");
    expect(calendarBody.length).toBe(1);
  });
  it("renders the correct number of weeks in calendar body", () => {
    const myWrapper = setup({
      startDate: "2011/11/01",
    });
    const calendarBodyRows = myWrapper.find("[data-test='calendar-rows']");
    expect(calendarBodyRows.length).toBe(5);
  });
  it("renders the correct number of day cells in calendar body", () => {
    wrapper = setup({
      startDate: "2011/11/01",
    });
    const calendarBodyRows = wrapper.find("[data-test='calendar-day-cell']");
    expect(calendarBodyRows.length).toBe(35);
  });
});
