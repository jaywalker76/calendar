import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
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
  it("displays the header", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the days", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-days']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays the cells", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    expect(calendarComponent.length).toBe(1);
  });
  it("displays current date date", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find(
      "[data-test='calendar-current-date']"
    );
    expect(calendarComponent.length).toBe(1);
  });
});
