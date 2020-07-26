import EventStore from "../Events";
import events from "../Events/events";

const setup = (eventList) => new EventStore(eventList);

let eventStoreInstance;

// tasks to execute:
// update test procedure
// - create
// - retrieve created object id
// - read event from event store
// - compare events

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
    const newEventData = { startDate: "2020-01-01", endDate: "2020-01-01" };
    let createdEvent = eventStoreInstance.createEvent(newEventData);
    // read new created event
    const eventInStore = eventStoreInstance.readEventById(createdEvent.id)[0];
    delete eventInStore["id"];

    expect(eventInStore).toEqual(newEventData);
  });

  it("Create multiple events in the EventStore instance", () => {
    eventStoreInstance = setup();
    const eventData = { startDate: "2020-01-01", endDate: "2020-01-01" };

    for (let i = 0; i < 5; i++) {
      eventStoreInstance.createEvent(eventData);
    }
    const eventsInStore = eventStoreInstance.readEvents();

    expect(eventsInStore.length).toEqual(5);
  });

  it("Creates and updates event", () => {
    eventStoreInstance = setup();
    const newEvent = { startDate: "2020-01-01", endDate: "2020-01-01" };
    const updateToEvent = {
      startDate: "2021-01-01",
      endDate: "2021-01-01",
    };
    let createdEvent = eventStoreInstance.createEvent(newEvent);

    let createdEventInStore = eventStoreInstance.readEventById(
      createdEvent.id
    )[0];
    delete createdEventInStore["id"];
    expect(createdEventInStore).toEqual(newEvent);

    eventStoreInstance.updateEvent(updateToEvent);

    createdEventInStore = eventStoreInstance.readEventById(createdEvent.id)[0];

    expect(createdEventInStore).toEqual(updateToEvent);
  });
  // read event
  it("Creates two events and reads all events", () => {
    eventStoreInstance = setup();
    const firstEvent = {
      id: 1,
      startDate: "2020-01-01",
      endDate: "2020-01-01",
    };
    const secondEvent = {
      id: 2,
      startDate: "2020-01-02",
      endDate: "2020-01-02",
    };
    eventStoreInstance.createEvent(firstEvent);
    eventStoreInstance.createEvent(secondEvent);

    let updatedList = eventStoreInstance.readEvents();

    expect(updatedList).toEqual([
      {
        id: 1,
        startDate: "2020-01-01",
        endDate: "2020-01-01",
      },
      {
        id: 2,
        startDate: "2020-01-02",
        endDate: "2020-01-02",
      },
    ]);
  });

  it("Creates two events and reads a specific event by id", () => {
    eventStoreInstance = setup();
    const firstEvent = {
      id: 1,
      startDate: "2020-01-01",
      endDate: "2020-01-01",
    };
    const secondEvent = {
      id: 2,
      startDate: "2020-01-02",
      endDate: "2020-01-02",
    };
    eventStoreInstance.createEvent(firstEvent);
    eventStoreInstance.createEvent(secondEvent);

    let updatedList = eventStoreInstance.readEvents(1);

    expect(updatedList).toEqual([
      {
        id: 1,
        startDate: "2020-01-01",
        endDate: "2020-01-01",
      },
    ]);
  });

  // delete event
  it("Create Events and deletes event", () => {
    eventStoreInstance = setup();
    const firstEvent = {
      id: 1,
      startDate: "2020-01-01",
      endDate: "2020-01-01",
    };

    eventStoreInstance.createEvent(firstEvent);
    let updatedList = eventStoreInstance.readEvents(1);

    expect(updatedList.length).toBe(1);
    updatedList = eventStoreInstance.deleteEvent(1);
    expect(updatedList.length).toBe(0);
  });
});
