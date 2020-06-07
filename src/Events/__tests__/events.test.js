import { readEvents, createEvent, updateEvent, deleteEvent } from "../Events";
import eventlist from "../eventlist.js";

describe("Module functionality", () => {
  it("Reads event data", () => {
    /**
     * we want to read a list of events.
     * Currently it is assumed that this will be a json file
     * within the project structure
     */
    const listOfEvents = readEvents(eventlist);

    expect(listOfEvents).toEqual(eventlist);
  });

  it("Creates a new single day event", () => {
    let readEventList = readEvents(eventlist);
    let existingEvents = readEventList.events.length;
    let newEvent = {
      title: "Stuff",
      startDate: "2020/01/01",
      endDate: "2020/01/01",
    };
    let updatedList = createEvent(readEventList, newEvent);
    expect(updatedList.events.length).toBe(existingEvents + 1);
  });

  it("Creates a new multi day event", () => {
    let readEventList = readEvents(eventlist);
    let existingEvents = readEventList.events.length;
    let newEvent = {
      title: "Stuff",
      startDate: "2020/01/01",
      endDate: "2020/01/02",
    };

    let updatedList = createEvent(readEventList, newEvent);
    expect(updatedList.events.length).toBe(existingEvents + 1);
  });

  it("updates an event", () => {
    let readEventList = readEvents(eventlist);
    let newEvent = {
      id: 1,
      startDate: "2021/01/01",
      endDate: "2021/01/01",
    };
    let updatedList = updateEvent(readEventList, newEvent);
    expect(updatedList.events[0]).toEqual(newEvent);
  });

  it("deletes an event", () => {
    let readEventList = readEvents(eventlist);
    let initialEventCount = readEventList.events.length;
    let eventToDelete = readEventList.events[0].id;

    let updatedList = deleteEvent(readEventList, eventToDelete);
    expect(updatedList.events.length).toBe(initialEventCount - 1);
  });
});
