import EventStore from "../Events";
import events from "../Events/events";

const setup = (eventList) => new EventStore(eventList);

let eventStoreInstance;

describe("Module functionality", () => {
  it("Retrieves EventStore instance", () => {
    eventStoreInstance = setup(events);
    expect(eventStoreInstance).toBeTruthy();
  });

  it("Retrieves EventStore instance when there are no existing events", () => {
    eventStoreInstance = setup();
    expect(eventStoreInstance).toBeTruthy();
  });
  // create event
  it("Create an event in the EventStore instance", () => {
    eventStoreInstance = setup();
    const newEvent = { id: 1, startDate: "2020-01-01", endDate: "2020-01-01" };
    let updatedList = eventStoreInstance.createEvent(newEvent);
    expect(updatedList[0]).toEqual(newEvent);
  });

  // read event
  // update event
  // delete event
});
