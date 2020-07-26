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
  it("Creates multiple events and reads events in a given date range", () => {
    eventStoreInstance = setup();

    for (let i = 0; i < 10; i++) {
      let dayCount = i + 1;
      if (dayCount < 10) {
        dayCount = "0" + dayCount;
      }
      eventStoreInstance.createEvent({
        startDate: `2021-01-${dayCount}`,
        endDate: `2021-01-${dayCount}`,
      });
    }

    // specifying the range in an object seems better as a way to
    // enforce date sequence
    let retrievedList = eventStoreInstance.readEvents({
      startDate: "2021-01-01",
      endDate: "2021-01-04",
    });

    expect(retrievedList.length).toBe(4);

    const comparisonObj = [
      {
        startDate: "2021-01-01",
        endDate: "2021-01-01",
      },
      {
        startDate: "2021-01-02",
        endDate: "2021-01-02",
      },
      {
        startDate: "2021-01-03",
        endDate: "2021-01-03",
      },
      {
        startDate: "2021-01-04",
        endDate: "2021-01-04",
      },
    ];

    retrievedList.forEach((calEvent) => {
      delete calEvent["id"];
    });

    expect(comparisonObj[0]).toMatchObject(retrievedList[0]);
  });

  it("Creates multiple events and retrieves a specific event by id", () => {
    eventStoreInstance = setup();

    for (let i = 0; i < 5; i++) {
      let dayCount = i + 1;
      if (dayCount < 10) {
        dayCount = "0" + dayCount;
      }
      eventStoreInstance.createEvent({
        startDate: `2021-01-${dayCount}`,
        endDate: `2021-01-${dayCount}`,
      });
    }

    let updatedList = eventStoreInstance.readEventById(3);

    expect(updatedList).toEqual([
      {
        id: 3,
        startDate: "2021-01-03",
        endDate: "2021-01-03",
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
