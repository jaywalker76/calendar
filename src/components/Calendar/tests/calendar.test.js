import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import CalendarModule from "../../../new_module/Module";

import Calendar from "../Calendar";

import { getMonthYearString } from "../utils";

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
  // this test was modified in order to clearly test the calendar header rendering
  // and not its contents
  it("conditionally render the calendar header", () => {
    let configs = {
      includeHeader: true
    };
    wrapper = setup(configs);
    const calendarComponent = wrapper.find("[data-test='calendar-header']");
    expect(calendarComponent.length).toBe(1);
  });

  it("correctly renders the current month and year string in the header", () => {
    let configs = {
      includeHeader: true
    };
    wrapper = setup(configs);
    const currentDate = getMonthYearString(new Date());
    const calendarHeaderComponent = wrapper.find(
      "[data-test='calendar-header']"
    );
    expect(calendarHeaderComponent.text()).toBe(currentDate);
  });

  it("renders the calendar body", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-body']");
    expect(calendarComponent.length).toBe(1);
  });

  it("renders the correct number of month rows in the calendar body", () => {
    let configs = {
      startDate: "2020/04/01"
    };
    wrapper = setup(configs);

    const calendarComponent = wrapper.find("[data-test='calendar-body']");
    const monthRows = wrapper.find("[data-test='calendar-month-rows']");
    expect(monthRows.length).toBe(5);
  });

  /*
  
  it("displays the days in the week", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-days']");
    expect(calendarComponent.length).toBe(7);
  });

  it("displays current date when not configured", () => {
    wrapper = setup({ includeHeader: true });
    const calendarComponent = wrapper.find(
      "[data-test='calendar-header-date']"
    );
    const calendarModule = new CalendarModule();
    expect(calendarComponent.text()).toEqual(calendarModule.dateString);
  });

  it("correctly displays configured date", () => {
    let configs = {
      startDate: "2011/11/01",
      includeHeader: true
    };

    wrapper = setup(configs);
    const calendarHeaderComp = wrapper.find(
      "[data-test='calendar-header-date']"
    );

    expect(calendarHeaderComp.text()).toEqual("November, 2011");
  });
  // moved test to this location in order for days to be
  // correctly counted, rather than having the test fail
  // when a new month roll sin
  it("displays the days in a month", () => {
    const calendarComponent = wrapper.find("[data-test='calendar-cells']");
    let daysInMonth = calendarComponent
      .map(el => el.text() !== "Buffer")
      .filter(el => el === true);

    expect(daysInMonth.length).toBe(30);
  });

  it("correctly displays the number of weeks in a month", () => {
    let startDate = "2011/11/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper.find("[data-test='calendar-week-row']");
    expect(calendarComponent.length).toEqual(5);
  });
  */
});
/*
describe("Calendar Header Tests", () => {
  it("displays calendar header", () => {
    let calProps = {
      startDate: "2011/11/01",
      includeHeader: true
    };
    wrapper = setup(calProps);
    const calendarComponent = wrapper.find(
      "[data-test='calendar-header-date']"
    );

    expect(calendarComponent.length).toEqual(1);
  });

  it("does not display calendar header", () => {
    let calProps = {
      startDate: "2011/11/01",
      includeHeader: false
    };

    wrapper = setup(calProps);
    const calendarComponent = wrapper.find("[data-test='calendar-header']");

    expect(calendarComponent.length).toEqual(0);
  });
});

describe("Calendar buffer days renderization", () => {
  it("correctly places the starting day on a month starting on a sunday", () => {
    let startDate = "2019/12/01";
    wrapper = setup((startDate = { startDate }));
    const bufferDayCells = wrapper
      .find("[data-test='calendar-week-row']")
      .at(0)
      .find("[data-test='calendar-cells']")
      .map(el => el.text() === "Buffer")
      .filter(el => el === true);

    expect(bufferDayCells.length).toEqual(6);
  });

  it("correctly places the starting day on a month starting on a monday", () => {
    let startDate = "2020/06/01";
    wrapper = setup((startDate = { startDate }));
    const bufferDayCells = wrapper
      .find("[data-test='calendar-week-row']")
      .at(0)
      .find("[data-test='calendar-cells']")
      .filter(el => el.text() === "Buffer");

    expect(bufferDayCells.length).toEqual(0);
  });

  it("correctly renders a 28 day february", () => {
    let startDate = "2019/02/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper
      .find("[data-test='calendar-cells']")
      .map(el => el.text() !== "Buffer")
      .filter(el => el === true);

    expect(calendarComponent.length).toEqual(28);
  });

  it("correctly renders a 29 day february", () => {
    let startDate = "2020/02/01";
    wrapper = setup((startDate = { startDate }));
    const calendarComponent = wrapper
      .find("[data-test='calendar-cells']")
      .map(el => el.text() !== "Buffer")
      .filter(el => el === true);

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

    let daysInWeek = daysInFirstWeek.map(el => el.text());

    expect(weeksInFebruary.length).toEqual(5);
  });
});
*/
