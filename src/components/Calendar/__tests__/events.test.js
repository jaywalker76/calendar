import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Calendar from "../Calendar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  return mount(<Calendar {...props} />);
};

let wrapper;
// by event designation we mean an event indicator. Visually this would
// be the colored cell representing an event in the calendar

// this block code can be made parametric ->
describe("single events", () => {
  wrapper = setup({
    startDate: "2020/06/01",
  });

  const firstDayInJune = wrapper
    .find("[data-test='calendar-day-cell']")
    .first();
  describe("no event in cell", () => {
    const eventStart = firstDayInJune.find("[data-test='event-start']");
    const eventBody = firstDayInJune.find("[data-test='event-body']");
    const eventEnd = firstDayInJune.find("[data-test='event-end']");

    it("should have no event start", () => {
      expect(eventStart.length).toBe(0);
    });

    it("should have no event body", () => {
      expect(eventBody.length).toBe(0);
    });

    it("should have no event end", () => {
      expect(eventEnd.length).toBe(0);
    });
  });

  describe("single event in cell", () => {
    const eventStart = firstDayInJune.find("[data-test='event-start']");
    const eventBody = firstDayInJune.find("[data-test='event-body']");
    const eventEnd = firstDayInJune.find("[data-test='event-end']");

    it("should have event start", () => {
      expect(eventStart.length).toBe(1);
    });

    it("should have event body", () => {
      expect(eventBody.length).toBe(1);
    });

    it("should have event end", () => {
      expect(eventEnd.length).toBe(1);
    });
  });

  it("should have start cap", () => {
    // expect cell to have start cap
  });
  it("should have event designation tab", () => {
    // expect cell to event designation tab
  });
  it("should have end cap", () => {
    // expect cell to have end cap
  });
  it("should have title", () => {
    // expect cell to have  title
  });
  // test for cell level - lvl 1
});

// Scenarios
//|
//|
//|
//|

// no events in cell
// expect cell:
//  - to have no start cap
//  - to have no end cap
//  - to have no event tab

//|[]
//|
//|
//|

// expect cell:
//  - to have 1 start cap
//  - to have 1 end cap
//  - to have 1 event tab

//|[]
//|[]
//|
//|

// expect cell:
//  - to have 2 start cap
//  - to have 2 end cap
//  - to have 2 event tab

//|[]
//|[]
//|[]
//|

// expect cell:
//  - to have 3 start cap
//  - to have 3 end cap
//  - to have 3 event tab
//  - to have more events designator

//|[]
//|[]
//|[]
//|...

// expect cell:
//  - to have 3 start cap
//  - to have 3 end cap
//  - to have 3 event tab
//  - to have more events designator

//|]
//|[]
//|[]
//|...

// expect cell:
//  - to have 2 start cap
//  - to have 3 end cap
//  - to have 3 event tab
//  - to have more events designator

//|[
//|[]
//|[]
//|...

// expect cell:
//  - to have 3 start cap
//  - to have 2 end cap
//  - to have 3 event tab
//  - to have more events designator

//|][
//|][
//|][
//|

// expect cell:
//  - to have 3 start cap
//  - to have 3 end cap
//  - to have 6 event tab

//|[
//|[]
//|]

// expect cell:
//  - to have 2 start cap
//  - to have 2 end cap
//  - to have 3 event tab

//|[
//|[
//|[

// expect cell:
//  - to have 3 start cap
//  - to have 3 event tab

//|]
//|]
//|]

// expect cell:
//  - to have 3 end cap
//  - to have 3 event tab

describe("single event starts and ends in different days in same month", () => {
  it("", () => {
    // order limited by layout
    // []
    // []
    // []
    // ...
    // -> this shows only when more than 3 events exist in cell
    // -> break into single tests **
    // expect start cell to have start cap, event designation tab,end cap, title
    // expect end cell to have event designation tab,end cap
    // <-- these tests make sense for model testing
    // expect cells spanned to match event duration in days in same week
    // expect cells spanned to match event duration in days across different weeks
    // expect cells spanned to match event duration in days across different months
    // expect to throw error if event end date happens before start date
    // expect to throw error if event start date happens after end date
    // for a calendar starting on monday
    // event starts on sunday and ends on monday
    // expect cell in sunday to have start cap, event, title, event designation tab
    // expect cell in monday to have event designation tab, end cap
    // for a calendar starting on sunday
    // event starts on sunday and ends on monday
    // expect cell in sunday to have start cap, event, title, event designation tab
    // expect cell in monday to have event designation tab, end cap
    // expect cell count to be 8 -->
  });

  it("single event starts and ends in different days in different months ", () => {
    // event starts on 31 Jan and ends on 2Feb
    // expect first cell in Feb to have just event designation tab
    // expect end cell in Feb to have event designation tab,end cap
    // expect cells spanned in Feb to be 2
    // expect to throw error if event end date happens before start date
    // expect to throw error if event start date happens after end date
    // event starts on 28 Feb and ends on 2Mar
    // expect first cell in Feb to have just event designation tab
    // expect start cell in Feb to have start cap, event designation tab, title
    // expect cells spanned in Feb to be 1 (for regular years)
    // expect cells spanned in Feb to be 2 (for leap years)
    // expect to throw error if event end date happens before start date
    // expect to throw error if event start date happens after end date
  });

  it("two events that starts and ends in sequential days", () => {
    // expect cells to have distinct start cap, event designation tab, end cap, title
    // expect border day to have end capping and event designation from end event, start cap and event designation from starting event, title
  });

  it("two events that starts and ends in sequential days", () => {
    // expect cells to have distinct start cap, event designation tab, end cap, title
    // expect border day to have end capping and event designation from end event, start cap and event designation from starting event, title
  });
});

describe("Overlapping events in same month", () => {
  it("two events that starts and ends in same day", () => {
    // expect cells to have start cap, event designation tab, end cap, title
  });
});

// Test:
//     - if event spans more than one day event:
//         - title should be rendered on first cell belonging to event
//     - event starts on previous month:
//         - current month displays the remainder of the representation
//         - current month cell does not have start cap
//         - current cell has event designation tab
//         - if it's last day in event should have end cap
//     - event starts and ends on same day
//         - has event designation tab
//         - has event start cap
//         - event contains event title
//     - event overlap in cell
//         - two events  with start and end on the same day
//         - event ends on same day where new event starts
//         - events overlap on day
