import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import CalendarCell from "../CalendarCell";

Enzyme.configure({ adapter: new EnzymeAdapter() });

import {
  cellWithoutEvent,
  cellWithEvent,
  cellStartAndBody,
  cellBodyAndEnd,
  cellWithBody,
} from "../../CalendarDay/__tests__/cellTestCases";

// event rendering in cell now contemplates the correct placement
// of the event indicators: start, body, end

const mockSetup = (cellInformation) => {
  return mount(
    <CalendarCell events={cellInformation.eventObject} cellId={1} />
  );
};

let wrapper;

describe("Cell Rendering", () => {
  describe("renders event with start, body and end", () => {
    wrapper = mockSetup(cellWithEvent);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();

    it("has event start marker", () => {
      const eventStart = calendarCell.find("[data-test='event-start']");
      expect(eventStart.length).toBe(1);
    });
    it("has event body marker ", () => {
      const eventBody = calendarCell.find("[data-test='event-body']");
      expect(eventBody.length).toBe(1);
    });
    it("has event end marker ", () => {
      const eventEnd = calendarCell.find("[data-test='event-end']");
      expect(eventEnd.length).toBe(1);
    });
  });

  describe("renders event with start and body", () => {
    wrapper = mockSetup(cellStartAndBody);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();

    it("has event start marker", () => {
      const eventStart = calendarCell.find("[data-test='event-start']");
      expect(eventStart.length).toBe(1);
    });
    it("has event body marker ", () => {
      const eventBody = calendarCell.find("[data-test='event-body']");
      expect(eventBody.length).toBe(1);
    });
    it("has event end marker ", () => {
      const eventEnd = calendarCell.find("[data-test='event-end']");
      expect(eventEnd.length).toBe(0);
    });
  });

  describe("renders event with body and end", () => {
    wrapper = mockSetup(cellBodyAndEnd);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();

    it("has event start marker", () => {
      const eventStart = calendarCell.find("[data-test='event-start']");
      expect(eventStart.length).toBe(0);
    });
    it("has event body marker ", () => {
      const eventBody = calendarCell.find("[data-test='event-body']");
      expect(eventBody.length).toBe(1);
    });
    it("has event end marker ", () => {
      const eventEnd = calendarCell.find("[data-test='event-end']");
      expect(eventEnd.length).toBe(1);
    });
  });

  describe("renders event with body", () => {
    wrapper = mockSetup(cellWithBody);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();

    it("has event start marker", () => {
      const eventStart = calendarCell.find("[data-test='event-start']");
      expect(eventStart.length).toBe(0);
    });
    it("has event body marker ", () => {
      const eventBody = calendarCell.find("[data-test='event-body']");
      expect(eventBody.length).toBe(1);
    });
    it("has event end marker ", () => {
      const eventEnd = calendarCell.find("[data-test='event-end']");
      expect(eventEnd.length).toBe(0);
    });
  });

  describe("events wrapped in event slot", () => {
    wrapper = mockSetup(cellWithBody);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();

    it("event wrapper is contained within a slot", () => {
      const eventSlot = calendarCell.find("[data-test='event-slot']");
      expect(eventSlot.length).toBe(1);
    });
  });

  describe("renders events in same lane", () => {
    wrapper = mockSetup(cellWithBody);
    const calendarCell = wrapper
      .find("[data-test='calendar-day-cell']")
      .first();
  });
});
