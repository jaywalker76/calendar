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
  it("displays the days", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    let daysInMonth = calendarComponent
      .map(el => el.text() !== "Buffer")
      .filter(el => el === true);
    expect(daysInMonth.length).toBe(31);
  });
  it("displays current date", () => {
    wrapper = setup({ includeHeader: true });
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.text()).toEqual(getMonthYearString(new Date()));
  });
  it("correctly displays specified date", () => {
    let configs = {
      startDate: "2011/11/01",
      includeHeader: true
    };
    wrapper = setup(configs);
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.text()).toEqual("November 2011");
  });

  it("correctly displays the number of weeks in a month", () => {
    let startDate = "2011/11/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper.find("[data-test='calendar-week-row']");
    expect(calendarComponent.length).toEqual(5);
  });
});

describe("Calendar buffer days renderization", () => {
  it("correctly places the starting day on a month starting on a sunday", () => {
    let startDate = "2019/12/01";
    wrapper = setup((startDate = { startDate }));
    const bufferDayCells = wrapper
      .find("[data-test='calendar-week-row']")
      .at(0)
      .find("[data-test='calendar-buffer']");
    expect(bufferDayCells.length).toEqual(6);
  });

  it("correctly places the starting day on a month starting on a monday", () => {
    let startDate = "2020/06/01";
    wrapper = setup((startDate = { startDate }));
    const bufferDayCells = wrapper
      .find("[data-test='calendar-week-row']")
      .at(0)
      .find("[data-test='calendar-buffer']");
    expect(bufferDayCells.length).toEqual(0);
  });

  it("correctly renders a 28 day february", () => {
    let startDate = "2019/02/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    expect(calendarComponent.length).toEqual(28);
  });

  it("correctly renders a 29 day february", () => {
    let startDate = "2020/02/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    expect(calendarComponent.length).toEqual(29);
  });

  it("correctly display number of weeks for a 29 day february", () => {
    let startDate = "2020/02/01";
    wrapper = setup((startDate = { startDate }));
    const weeksInFebruary = wrapper.find("[data-test='calendar-week-row']");
    expect(weeksInFebruary.length).toEqual(5);
  });

  it("correctly display days for previous and following months", () => {
    let startDate = "2020/02/01";
    wrapper = setup((startDate = { startDate }));
    const weeksInFebruary = wrapper.find("[data-test='calendar-week-row']");
    const daysInFirstWeek = weeksInFebruary
      .at(0)
      .find("[data-test='calendar-cells']");
    console.log(daysInFirstWeek.debug());

    let daysInWeek = daysInFirstWeek.map(el => el.text());

    //console.log("days in week: " + daysInWeek);

    expect(weeksInFebruary.length).toEqual(5);
  });
});
