import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { getMonthYearString } from "../utils";

import CalendarHeader from "../CalendarHeader/CalendarHeader";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * [Factory function to create a ShallowWrapper for the App Component]
 * @function setup
 * @param  {Object} [props={}]   [props to pass to component]
 * @param  {[type]} [state=null] [component count state]
 * @return {[type]}              [shallow App]
 */
const setup = (props = {}, state = null) => {
  return mount(<CalendarHeader {...props} />);
};

let wrapper;

/* moved header specific tests to own file */

describe("Calendar Header Structure", () => {
  it("renders without crashing", () => {
    wrapper = setup();
    expect(wrapper).toBeTruthy();
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

    const leftNavArrow = wrapper.find("[data-test='left-header-nav']");

    expect(leftNavArrow.length).toEqual(1);
  });

  it("should display right nav arrow", () => {
    wrapper = setup(configs);
    const rightNavArrow = wrapper.find("[data-test='right-header-nav']");

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

    const navigationArrowBack = calendarHeader.find(
      "[data-test='left-header-nav']"
    );

    const navigationArrowForward = calendarHeader.find(
      "[data-test='right-header-nav']"
    );

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

    const navigationArrowForward = calendarHeader.find(
      "[data-test='right-header-nav']"
    );

    navigationArrowForward.simulate("click");

    const calendarHeaderComp = calendarHeader.find(
      "[data-test='calendar-header-date']"
    );

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
