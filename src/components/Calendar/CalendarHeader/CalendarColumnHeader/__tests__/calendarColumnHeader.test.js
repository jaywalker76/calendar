import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import CalendarColumnHeader from "..";

// import { mondayStart, fridayStart, sundayStart } from "./testObjects/week_defs";

import {
  weekStartsOnSunday,
  weekStartsOnMonday,
} from "../testObjects/weekheader_col_values";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * [Factory function to create a ShallowWrapper for the App Component]
 * @function setup
 * @param  {Object} [props={}]   [props to pass to component]
 * @param  {[type]} [state=null] [component count state]
 * @return {[type]}              [shallow App]
 */

const setup = (props = {}, state = null) => {
  return mount(<CalendarColumnHeader {...props} />);
};

let wrapper;
let props = { calendarColHeader: [0, 1, 2, 3, 4, 5, 6] };

describe("Calendar Column Header Structure", () => {
  it("renders without crashing", () => {
    wrapper = setup(props);
    expect(wrapper).toBeTruthy();
  });

  it("renders the calendar column header ", () => {
    wrapper = setup(props);
    const calendarColHeader = wrapper.find("[data-test='calendar-col-header']");
    expect(calendarColHeader.length).toBe(1);
  });

  it("returns a object with the weekday initial, starting on S for Sunday, for english", () => {
    wrapper = setup(props);
    const calendarColHeader = wrapper.find("[data-test='calendar-col-header']");
    let headerContents = calendarColHeader.debug();
    headerContents = headerContents
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/(?:\r\n|\r|\n)/g, "")
      .replace(/\s/g, "")
      .split("");
    expect(headerContents).toEqual(weekStartsOnSunday);
  });
});

describe("Calendar Column Header Structure", () => {
  // it("Returns ordered weekday numbers, given no specific starting day", () => {
  //   const weekDayNumbers = [0, 1, 2, 3, 4, 5, 6];
  //   const moduleInstance = new CalendarModule();
  //   const retrievedWeekDays = moduleInstance.getWeekDayNumbers();
  //   expect(weekDayNumbers).toEqual(retrievedWeekDays);
  // });
  // it("Returns ordered weekday numbers, given a specific start day", () => {
  //   const weekDayNumbers = [2, 3, 4, 5, 6, 0, 1];
  //   const moduleInstance = new CalendarModule(null, 2);
  //   const retrievedWeekDays = moduleInstance.getWeekDayNumbers();
  //   expect(weekDayNumbers).toEqual(retrievedWeekDays);
  // });
  // describe("Calendar Header implementation", () => {
  //   it("returns a object with the weekday initial, starting on S for Sunday, for english", () => {
  //     const moduleInstance = new CalendarModule();
  //     const retrievedColWeekHeader = moduleInstance.getWeekHeader();
  //     expect(retrievedColWeekHeader).toEqual(sundayStartShort);
  //   });
  // });
  // let startDate = "04/01/2020";
  // const calendarModule = new CalendarModule(startDate);
  // const retrievedWeekHeaderObject = calendarModule.getWeekHeader();
  // let props = { weekHeaderObject: retrievedWeekHeaderObject };
  // it("renders the calendar wrapper", () => {
  //   calendarWrapper = calendarSetup();
  //   const calendarComponent = wrapper.find("[data-test='calendar-component']");
  //   expect(calendarComponent.length).toBe(1);
  // });
  // it("Returns weekday names", () => {
  //   const weekdayNames = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ];
  //   const moduleInstance = new CalendarModule();
  //   const retrievedWeekdayNames = moduleInstance.getWeekDayNames();
  //   expect(weekdayNames).toEqual(retrievedWeekdayNames);
  // });
  // it("Returns reordered weekday names", () => {
  //   const weekdayNames = [
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //     "Monday",
  //   ];
  //   const moduleInstance = new CalendarModule(null, 1);
  //   const retrievedWeekdayNames = moduleInstance.getWeekDayNames();
  //   expect(weekdayNames).toEqual(retrievedWeekdayNames);
  // });
  // test.each`
  //   testName                   | startDay | expectedResult
  //   ${"week starts on monday"} | ${0}     | ${mondayStart}
  //   ${"week starts on friday"} | ${4}     | ${fridayStart}
  //   ${"week starts on sunday"} | ${6}     | ${sundayStart}
  // `(
  //   "$testName: correctly converts $startDay to $expectedResult",
  //   ({ startDay, expectedResult }) => {
  //     const moduleInstance = new CalendarModule(null, startDay);
  //     expect(moduleInstance.getWeekDayNames()).toStrictEqual(expectedResult);
  //   }
  // );
  // it("Returns week representation starting on a sunday, using day initials", () => {
  //   const moduleInstance = new CalendarModule();
  //   const retrievedWeekDaysColHeader = moduleInstance.getWeekHeader();
  //   expect(weekStartsOnSunday).toEqual(retrievedWeekDaysColHeader);
  // });
  // it("Returns week representation starting on a monday, using day initials", () => {
  //   const moduleInstance = new CalendarModule(null, 1);
  //   const retrievedWeekDaysColHeader = moduleInstance.getWeekHeader();
  //   expect(weekStartsOnMonday).toEqual(retrievedWeekDaysColHeader);
  // });
});
