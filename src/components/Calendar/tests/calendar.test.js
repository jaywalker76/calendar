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
  it("displays the days in the week", () => {
    wrapper = setup();
    const calendarComponent = wrapper.find("[data-test='calendar-days']");
    expect(calendarComponent.length).toBe(7);
  });

  it("displays current date when not configured", () => {
    wrapper = setup({ includeHeader: true });
    const calendarComponent = wrapper
      .find("[data-test='calendar-header']")
      .dive()
      .find("[data-test='calendar-header-date']");

    expect(calendarComponent.text()).toEqual(getMonthYearString(new Date()));
  });

  it("correctly displays configured date", () => {
    let configs = {
      startDate: "2011/11/01",
      includeHeader: true
    };

    wrapper = setup(configs);
    const calendarHeaderComp = wrapper
      .find("[data-test='calendar-header']")
      .dive()
      .find("[data-test='calendar-header-date']");

    expect(calendarHeaderComp.text()).toEqual("November 2011");
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
});

describe("Calendar Header Tests", () => {
  it("displays calendar header", () => {
    let calProps = {
      startDate: "2011/11/01",
      includeHeader: true
    };
    wrapper = setup(calProps);
    const calendarComponent = wrapper
      .find("[data-test='calendar-header']")
      .dive()
      .find("[data-test='calendar-header-date']");

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

describe("Calendar navigation", () => {
  const mockCallBack = jest.fn();

  let configs = {
    startDate: "2019/12/01",
    includeHeader: true,
    displayNavArrows: true,
    onClick: mockCallBack
  };

  /*
  ** refactoring tests to reflect new comp naming
    naming nav arrows specifically - doesn't seem to make sense
    to test for the existence of both
  */

  it("should display left nav arrow", () => {
    wrapper = setup(configs);

    const leftNavArrow = wrapper
      .find("[data-test='calendar-header']")
      .dive()
      .find("[data-test='left-header-nav']");

    expect(leftNavArrow.length).toEqual(1);
  });

  it("should display right nav arrow", () => {
    wrapper = setup(configs);
    const rightNavArrow = wrapper
      .find("[data-test='calendar-header']")
      .dive()
      .find("[data-test='right-header-nav']");

    expect(rightNavArrow.length).toEqual(1);
  });

  it("should not display navigation arrows for calendar when configured", () => {
    configs.displayNavArrows = false;

    wrapper = setup(configs);
    const navigationArrows = wrapper.find(
      "[data-test='calendar-navigation-arrows']"
    );

    expect(navigationArrows.length).toEqual(0);
  });

  it("should invoke a callback when clicking in the navigation arrows", () => {
    configs.displayNavArrows = true;
    wrapper = setup(configs);

    const calendarHeader = wrapper.find("[data-test='calendar-header']");

    const navigationArrowBack = calendarHeader
      .dive()
      .find("[data-test='left-header-nav']");

    const navigationArrowForward = calendarHeader
      .dive()
      .find("[data-test='right-header-nav']");

    navigationArrowBack.simulate("click");

    expect(mockCallBack).toHaveBeenCalled();
    expect(mockCallBack.mock.calls.length).toEqual(1);

    navigationArrowForward.simulate("click");

    expect(mockCallBack).toHaveBeenCalled();
    expect(mockCallBack.mock.calls.length).toEqual(2);
  });

  it("should increase date value when clicking forward navigation arrow", () => {
    wrapper = setup(configs);

    const calendarHeader = wrapper.find("[data-test='calendar-header']");

    const navigationArrowForward = calendarHeader
      .dive()
      .find("[data-test='right-header-nav']");

    navigationArrowForward.simulate("click");

    const calendarHeaderComp = calendarHeader
      .dive()
      .find("[data-test='calendar-header-date']");

    expect(calendarHeaderComp.text()).toEqual("January 2020");
  });

  it("should display correct date when navigating backwards/forward", () => {
    const mockCallBack = jest.fn();

    let configs = {
      startDate: "2019/12/01",
      includeHeader: true,

      onClick: mockCallBack
    };
    wrapper = setup(configs);

    const calendarHeader = wrapper.find("[data-test='calendar-header']");

    const navigationArrowBack = wrapper.find("[data-test='right-nav-arrow']");

    const navigationArrowForward = wrapper.find(
      "[data-test='right-nav-arrow']"
    );

    navigationArrowBack.simulate("click");

    expect(mockCallBack.mock.calls.length).toEqual(1);

    expect(calendarHeader.text()).toEqual("November 2019");

    navigationArrowForward.simulate("click");
    navigationArrowForward.simulate("click");

    expect(calendarHeader.text()).toEqual("January 2020");
  });
});
