import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Calendar from "../Calendar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

it("renders without crashing", () => {
  const wrapper = shallow(<Calendar />);
  expect(wrapper).toBeTruthy();
});

it("renders the calendar structure", () => {
  const wrapper = shallow(<Calendar />);
  const calendarComponent = wrapper.find("[data-test='calendar-component']");
  expect(calendarComponent.length).toBe(1);
});
it("displays the header", () => {});
it("displays the days", () => {});
it("displays the cells", () => {});
it("displays current date date", () => {});
