import events from "../../Events/eventlist";
import {
  readEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../Events/Events";

// check if event list exists

describe("Decorator Module functionality", () => {
  it("Retrieves an event list", () => {
    const existingEvents = readEvents(events);

    expect(existingEvents).toEqual(events);
  });
});
