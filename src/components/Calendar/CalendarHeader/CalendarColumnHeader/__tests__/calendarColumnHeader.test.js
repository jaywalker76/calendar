import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import CalendarModule from "../../../../../new_module/";
import CalendarColumnHeader from "..";

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

describe("Calendar Column Header Structure", () => {
  let startDate = "04/01/2020";
  const calendarModule = new CalendarModule(startDate);
  const retrievedWeekHeaderObject = calendarModule.getWeekHeader();

  let props = { weekHeaderObject: retrievedWeekHeaderObject };

  it("renders without crashing", () => {
    wrapper = setup(props);
    expect(wrapper).toBeTruthy();
  });

  it("Returns week representation starting on a sunday, using day initials", () => {
    const moduleInstance = new CalendarModule();
    const retrievedWeekDaysColHeader = moduleInstance.getWeekHeader();

    expect(weekStartsOnSunday).toEqual(retrievedWeekDaysColHeader);
  });
});
