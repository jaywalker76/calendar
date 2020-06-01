import Events from "../Event";

describe("Module functionality", () => {
  it("Reads event data", () => {
    /**
     * we want to read a list of events.
     * Currently it is assumed that this will be a json file
     * within the project structure
     */

    /**
     * Check that event list exists
     * accepts as argument a path to the event list location
     */
    expect(readEvents("path_to_events").length).toBe(1);
  });

  it("Creates a new single day event", () => {
    let eventList = readEvents("path_to_events");
    let existingEvents = eventList.length;
    let newEvent = {
      title: "Stuff",
      startDate: "2020/01/01",
      endDate: "2020/01/01",
    };
    createEvent(newEvent);
    expect(eventList.length).toBe(existingEvents + 1);
  });

  it("Creates a new multi day event", () => {
    let eventList = readEvents("path_to_events");
    let existingEvents = eventList.length;
    let newEvent = {
      title: "Stuff",
      startDate: "2020/01/01",
      endDate: "2020/01/01",
    };
    createEvent(newEvent);
    expect(eventList.length).toBe(existingEvents + 1);
  });

  it("updates an event", () => {
    let eventList = readEvents("path_to_events");
    let eventToUpdate = eventList[0];
    let newEvent = {
      title: "Stuff",
      startDate: "2020/01/01",
      endDate: "2020/01/01",
    };
    updateEvent(eventToUpdate, newEvent);
    expect(eventList[0]).toEqual(newEvent);
  });

  it("deletes an event", () => {
    let eventList = readEvents("path_to_events");
    let existingEvents = eventList.length;
    let eventToDelete = eventList[0];

    deleteEvent(eventToDelete);
    expect(eventList.length).toBe(existingEvents - 1);
    expect(eventList[eventToDelete.title]).toBe(null);
  });
});
