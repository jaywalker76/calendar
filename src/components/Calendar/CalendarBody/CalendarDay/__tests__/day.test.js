import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import CalendarDay from "../CalendarDay";

Enzyme.configure({ adapter: new EnzymeAdapter() });

import {
  cellWithoutEvent,
  cellWithEvent,
  cellStartAndBody,
  cellBodyAndEnd,
  cellWithBody,
  twoEventsInCell,
  eventsStartDiffDays,
  eventsEndDiffDays,
  bothEventsStartAndEndDiffDays,
  threeEventsInCell,
  threeEventsInCellDiffStart,
  threeEventsInCellDiffEnd,
  threeEventsInCellDiffOriginAndEnd,
  threeEventsWithAdditionalInformation,
} from "./cellTestCases";

const mockSetup = (props) => {
  return mount(<CalendarDay {...props} />);
};

let wrapper;

describe("event slot rendering", () => {
  describe("events wrapped in event slot", () => {
    wrapper = mockSetup({ cell: cellWithBody, cellId: 1 });
    const calendarDay = wrapper.find("[data-test='calendar-day-cell']").first();

    it("event wrapper is contained within a slot", () => {
      const eventSlot = calendarDay.find("[data-test='event-slot']");
      const eventWrapper = eventSlot.find("[data-test='event-wrapper']");
      expect(eventSlot.length).toBe(1);
    });

    it("day with one event has a single event slot", () => {
      const eventSlot = calendarDay.find("[data-test='event-slot']");
      expect(eventSlot.length).toBe(1);
    });

    describe("event slot positiong", () => {
      wrapper = mockSetup({ cell: threeEventsInCell, cellId: 1 });
      const calendarDay = wrapper
        .find("[data-test='calendar-day-cell']")
        .first();
      it("day with three events has a three event slots", () => {
        const eventSlot = calendarDay.find("[data-test='event-slot']");
        expect(eventSlot.length).toBe(3);
      });
    });
  });

  describe("renders events in same lane", () => {
    // wrapper = mockSetup(cellWithBody);
    // const calendarCell = wrapper
    //   .find("[data-test='calendar-day-cell']")
    //   .first();
  });
});

// describe("Cell Rendering", () => {
//   wrapper = mockSetup();

//   describe("Single Event in cell with different configurations", () => {
//     test.each`
//       description                       | cellParameter       | expectedEventStart | expectedEventBody | expectedEventEnd
//       ${"no event in cell"}             | ${cellWithoutEvent} | ${0}               | ${0}              | ${0}
//       ${"cell has start, body and end"} | ${cellWithEvent}    | ${1}               | ${1}              | ${1}
//       ${"cell has start and body"}      | ${cellStartAndBody} | ${1}               | ${1}              | ${0}
//       ${"cell has body and end"}        | ${cellBodyAndEnd}   | ${0}               | ${1}              | ${1}
//       ${"cell has body"}                | ${cellWithBody}     | ${0}               | ${1}              | ${0}
//     `(
//       "$description",
//       ({
//         cellParameter,
//         expectedEventStart,
//         expectedEventBody,
//         expectedEventEnd,
//       }) => {
//         wrapper = mount(<CalendarCell cell={cellParameter} cellId={1} />);

//         const calendarCell = wrapper
//           .find("[data-test='calendar-day-cell']")
//           .first();

//         const eventStart = calendarCell.find("[data-test='event-start']");
//         const eventBody = calendarCell.find("[data-test='event-body']");
//         const eventEnd = calendarCell.find("[data-test='event-end']");

//         expect(eventStart.length).toBe(expectedEventStart);
//         expect(eventBody.length).toBe(expectedEventBody);
//         expect(eventEnd.length).toBe(expectedEventEnd);
//       }
//     );
//   });

//   describe("Two Events in cell with different configurations", () => {
//     //     // Scenarios
//     //     //|[]  |]    |[] |=
//     //     //|[]  |[]   |[  |=
//     //     //|    |     |   |
//     //     //|    |     |   |
//     test.each`
//       description                                                 | cellParameter                    | expectedEventStart | expectedEventBody | expectedEventEnd
//       ${"both events start and end on the same day"}              | ${twoEventsInCell}               | ${2}               | ${2}              | ${2}
//       ${"events start on different days and end on the same day"} | ${eventsStartDiffDays}           | ${1}               | ${2}              | ${2}
//       ${"events start on same day and end on diff days"}          | ${eventsEndDiffDays}             | ${2}               | ${2}              | ${1}
//       ${"both events start and end on different days"}            | ${bothEventsStartAndEndDiffDays} | ${0}               | ${2}              | ${0}
//     `(
//       "$description",
//       ({
//         cellParameter,
//         expectedEventStart,
//         expectedEventBody,
//         expectedEventEnd,
//       }) => {
//         wrapper = mount(<CalendarCell cell={cellParameter} cellId={1} />);

//         const calendarCell = wrapper
//           .find("[data-test='calendar-day-cell']")
//           .first();

//         const eventStart = calendarCell.find("[data-test='event-start']");
//         const eventBody = calendarCell.find("[data-test='event-body']");
//         const eventEnd = calendarCell.find("[data-test='event-end']");

//         expect(eventStart.length).toBe(expectedEventStart);
//         expect(eventBody.length).toBe(expectedEventBody);
//         expect(eventEnd.length).toBe(expectedEventEnd);
//       }
//     );
//   });

//   describe("Three Events in cell with different configurations", () => {
//     // Scenarios
//     //|[]  |]   |]  |]  |[  |[]  | | | | | | |
//     //|[]  |[]  |]  |]  |[  |[]  | | | | | | |
//     //|[]  |[]  |[] |]  |[  |[]  | | | | | | |
//     //|    |    |   |   |   |... | | | | | | |

//     test.each`
//       description                                                 | cellParameter                        | expectedEventStart | expectedEventBody | expectedEventEnd
//       ${"3 events start and end on the same day"}                 | ${threeEventsInCell}                 | ${3}               | ${3}              | ${3}
//       ${"events start on different days and end on the same day"} | ${threeEventsInCellDiffStart}        | ${2}               | ${3}              | ${3}
//       ${"events start on same day and end on diff days"}          | ${threeEventsInCellDiffEnd}          | ${3}               | ${3}              | ${1}
//       ${"all events start and end on different days"}             | ${threeEventsInCellDiffOriginAndEnd} | ${0}               | ${3}              | ${0}
//     `(
//       "$description",
//       ({
//         cellParameter,
//         expectedEventStart,
//         expectedEventBody,
//         expectedEventEnd,
//       }) => {
//         wrapper = mount(<CalendarCell cell={cellParameter} cellId={1} />);

//         const calendarCell = wrapper
//           .find("[data-test='calendar-day-cell']")
//           .first();

//         const eventStart = calendarCell.find("[data-test='event-start']");
//         const eventBody = calendarCell.find("[data-test='event-body']");
//         const eventEnd = calendarCell.find("[data-test='event-end']");

//         expect(eventStart.length).toBe(expectedEventStart);
//         expect(eventBody.length).toBe(expectedEventBody);
//         expect(eventEnd.length).toBe(expectedEventEnd);
//       }
//     );
//   });

//   it("cell with 3 events and additional event info", () => {
//     // debugger;
//     // wrapper = mount(
//     //   <CalendarDay cell={threeEventsWithAdditionalInformation} cellId={1} />
//     // );
//     // const calendarCell = wrapper
//     //   .find("[data-test='calendar-day-cell']")
//     //   .first();
//     // const eventStart = calendarCell.find("[data-test='event-start']");
//     // const eventBody = calendarCell.find("[data-test='event-body']");
//     // const eventEnd = calendarCell.find("[data-test='event-end']");
//     // const additionalEvents = calendarCell.find(
//     //   "[data-test='additional-events']"
//     // );
//     // expect(eventStart.length).toBe(3);
//     // expect(eventBody.length).toBe(3);
//     // expect(eventEnd.length).toBe(3);
//     // expect(additionalEvents.length).toBe(1);
//   });
// });

//   describe("two events in cell", () => {
//     // Scenarios
//     //|[]
//     //|[]
//     //|
//     //|
//     // Scenarios
//     //|[]
//     //|
//     //|[]
//     //|
//     // Scenarios
//     //|[
//     //|[]
//     //|
//     //|
//     // Scenarios
//     //|[
//     //|
//     //|[]
//     //|
//     // Scenarios
//     //|]
//     //|[]
//     //|
//     //|
//     // Scenarios
//     //|]
//     //|
//     //|[]
//     //|
//   });
//   it("should have start cap", () => {
//     // expect cell to have start cap
//   });
//   it("should have event designation tab", () => {
//     // expect cell to event designation tab
//   });
//   it("should have end cap", () => {
//     // expect cell to have end cap
//   });
//   it("should have title", () => {
//     // expect cell to have  title
//   });
//   // test for cell level - lvl 1
// });

// // no events in cell
// // expect cell:
// //  - to have no start cap
// //  - to have no end cap
// //  - to have no event tab

// //|[]
// //|
// //|
// //|

// // expect cell:
// //  - to have 1 start cap
// //  - to have 1 end cap
// //  - to have 1 event tab

// //|[]
// //|[]
// //|
// //|

// // expect cell:
// //  - to have 2 start cap
// //  - to have 2 end cap
// //  - to have 2 event tab

// //|[]
// //|[]
// //|[]
// //|

// // expect cell:
// //  - to have 3 start cap
// //  - to have 3 end cap
// //  - to have 3 event tab
// //  - to have more events designator

// //|[]
// //|[]
// //|[]
// //|...

// // expect cell:
// //  - to have 3 start cap
// //  - to have 3 end cap
// //  - to have 3 event tab
// //  - to have more events designator

// //|]
// //|[]
// //|[]
// //|...

// // expect cell:
// //  - to have 2 start cap
// //  - to have 3 end cap
// //  - to have 3 event tab
// //  - to have more events designator

// //|[
// //|[]
// //|[]
// //|...

// // expect cell:
// //  - to have 3 start cap
// //  - to have 2 end cap
// //  - to have 3 event tab
// //  - to have more events designator

// //|][
// //|][
// //|][
// //|

// // expect cell:
// //  - to have 3 start cap
// //  - to have 3 end cap
// //  - to have 6 event tab

// //|[
// //|[]
// //|]

// // expect cell:
// //  - to have 2 start cap
// //  - to have 2 end cap
// //  - to have 3 event tab

// //|[
// //|[
// //|[

// // expect cell:
// //  - to have 3 start cap
// //  - to have 3 event tab

// //|]
// //|]
// //|]

// // expect cell:
// //  - to have 3 end cap
// //  - to have 3 event tab

// describe("single event starts and ends in different days in same month", () => {
//   it("", () => {
//     // order limited by layout
//     // []
//     // []
//     // []
//     // ...
//     // -> this shows only when more than 3 events exist in cell
//     // -> break into single tests **
//     // expect start cell to have start cap, event designation tab,end cap, title
//     // expect end cell to have event designation tab,end cap
//     // <-- these tests make sense for model testing
//     // expect cells spanned to match event duration in days in same week
//     // expect cells spanned to match event duration in days across different weeks
//     // expect cells spanned to match event duration in days across different months
//     // expect to throw error if event end date happens before start date
//     // expect to throw error if event start date happens after end date
//     // for a calendar starting on monday
//     // event starts on sunday and ends on monday
//     // expect cell in sunday to have start cap, event, title, event designation tab
//     // expect cell in monday to have event designation tab, end cap
//     // for a calendar starting on sunday
//     // event starts on sunday and ends on monday
//     // expect cell in sunday to have start cap, event, title, event designation tab
//     // expect cell in monday to have event designation tab, end cap
//     // expect cell count to be 8 -->
//   });

//   it("single event starts and ends in different days in different months ", () => {
//     // event starts on 31 Jan and ends on 2Feb
//     // expect first cell in Feb to have just event designation tab
//     // expect end cell in Feb to have event designation tab,end cap
//     // expect cells spanned in Feb to be 2
//     // expect to throw error if event end date happens before start date
//     // expect to throw error if event start date happens after end date
//     // event starts on 28 Feb and ends on 2Mar
//     // expect first cell in Feb to have just event designation tab
//     // expect start cell in Feb to have start cap, event designation tab, title
//     // expect cells spanned in Feb to be 1 (for regular years)
//     // expect cells spanned in Feb to be 2 (for leap years)
//     // expect to throw error if event end date happens before start date
//     // expect to throw error if event start date happens after end date
//   });

//   it("two events that starts and ends in sequential days", () => {
//     // expect cells to have distinct start cap, event designation tab, end cap, title
//     // expect border day to have end capping and event designation from end event, start cap and event designation from starting event, title
//   });

//   it("two events that starts and ends in sequential days", () => {
//     // expect cells to have distinct start cap, event designation tab, end cap, title
//     // expect border day to have end capping and event designation from end event, start cap and event designation from starting event, title
//   });
// });

// describe("Overlapping events in same month", () => {
//   it("two events that starts and ends in same day", () => {
//     // expect cells to have start cap, event designation tab, end cap, title
//   });
// });

// // Test:
// //     - if event spans more than one day event:
// //         - title should be rendered on first cell belonging to event
// //     - event starts on previous month:
// //         - current month displays the remainder of the representation
// //         - current month cell does not have start cap
// //         - current cell has event designation tab
// //         - if it's last day in event should have end cap
// //     - event starts and ends on same day
// //         - has event designation tab
// //         - has event start cap
// //         - event contains event title
// //     - event overlap in cell
// //         - two events  with start and end on the same day
// //         - event ends on same day where new event starts
// //         - events overlap on day
