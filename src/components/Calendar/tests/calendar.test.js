import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { getMonthYearString } from "../utils";

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
  return shallow(<Calendar {...props} />);
};

let wrapper;

describe("Calendar structure", () => {
  it("renders without crashing", () => {
    wrapper = setup();
    expect(wrapper).toBeTruthy();
  });

  it("renders the calendar structure", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-component']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the days", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-days']");
    expect(calendarComponent.length).toBe(7);
  });
  it("displays the cells", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays current date", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.text()).toEqual(getMonthYearString(new Date()));
  });
  it("correctly displays specified date", () => {
    let startDate = "2011/11/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    console.log(calendarComponent.text());
    expect(calendarComponent.text()).toEqual("November 2011");
  });
});
