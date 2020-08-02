import EventStore from "../Events";
import events from "../Events/events";

const setup = (eventList) => new EventStore(eventList);

let inProps = (key, props) => {
  if (typeof props === "string") {
    return key === props;
  } else {
    return props.some((omitKey) => {
      return omitKey === key;
    });
  }
};
// omit method using my inProps method and Object.keys
let omit = (obj, props) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

// tasks to execute:
// update test procedure
// - create
// - retrieve created object id
// - read event from event store
// - compare events

// ToDo - test object deletion by trying to retrieve the deleted object
// ToDo - test object creation by trying to retrieve the created object
// ToDo - test object update by trying to retrieve the updated object

const mockEventGenerator = (providedEventStore, numberOfEvents) => {
  let createdEventIds = [];

  for (let i = 0; i < numberOfEvents; i++) {
    let dayCount = i + 1;
    if (dayCount < 10) {
      dayCount = "0" + dayCount;
    }
    let createdEvent = providedEventStore.createEvent({
      startDate: `2021-01-${dayCount}`,
      endDate: `2021-01-${dayCount}`,
    });
    createdEventIds.push(createdEvent.id);
  }

  return createdEventIds;
};

describe("Module functionality with empty event store", () => {
  it("Retrieves EventStore instance when there are no existing events", () => {
    let eventStoreInstance = setup();
    expect(eventStoreInstance).toBeTruthy();
  });

  // create event
  it("Create an event in the EventStore instance", () => {
    let eventStoreInstance = setup();
    const newEventData = { startDate: "2020-01-01", endDate: "2020-01-01" };
    let createdEvent = eventStoreInstance.createEvent(newEventData);
    // read new created event
    let eventInStore = eventStoreInstance.readEventById(createdEvent.id);

    eventInStore = omit(eventInStore, "id");

    expect(eventInStore).toEqual(newEventData);
  });

  it("Creates and updates event", () => {
    let eventStoreInstance = setup();
    const newEvent = { startDate: "2020-01-01", endDate: "2020-01-01" };

    let createdEvent = eventStoreInstance.createEvent(newEvent);
    let createdEventID = createdEvent.id;

    let createdEventInStore = eventStoreInstance.readEventById(createdEventID);

    createdEventInStore = omit(createdEventInStore, "id");

    expect(createdEventInStore).toEqual(newEvent);

    const updateToEvent = {
      id: createdEventID,
      startDate: "2021-01-01",
      endDate: "2021-01-01",
    };

    eventStoreInstance.updateEvent(updateToEvent);

    let updatedEventInStore = eventStoreInstance.readEventById(createdEventID);

    expect(updatedEventInStore).toEqual(updateToEvent);
  });
  // read event
  it("Creates multiple events and reads events in a given date range", () => {
    let eventStoreInstance = setup();

    let createdEventIds = mockEventGenerator(eventStoreInstance, 10);

    // specifying the range in an object seems better as a way to
    // enforce date sequence
    let retrievedEvents = eventStoreInstance.readEvents({
      startDate: "2021-01-01",
      endDate: "2021-01-04",
    });

    expect(retrievedEvents.length).toBe(4);

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

    let idStrippedEvents = [];
    retrievedEvents.forEach((calEvent) => {
      idStrippedEvents.push(omit(calEvent, "id"));
    });

    expect(comparisonObj[0]).toMatchObject(idStrippedEvents[0]);
  });

  it("Creates multiple events and retrieves a specific event by id", () => {
    let eventStoreInstance = setup();

    let createdEventIds = mockEventGenerator(eventStoreInstance, 10);

    let updatedList = eventStoreInstance.readEventById(3);

    expect(updatedList).toMatchObject({
      id: 3,
      startDate: "2021-01-03",
      endDate: "2021-01-03",
    });
  });

  // delete event
  it("Create Events and deletes event by id", () => {
    let eventStoreInstance = setup();

    // get list of ids for generated events

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

    const first_last_deletion = [
      { id: 2, startDate: "2021-01-02", endDate: "2021-01-02" },
      { id: 3, startDate: "2021-01-03", endDate: "2021-01-03" },
      { id: 4, startDate: "2021-01-04", endDate: "2021-01-04" },
    ];

    const middle_deletion = [
      { id: 2, startDate: "2021-01-02", endDate: "2021-01-02" },
      { id: 4, startDate: "2021-01-04", endDate: "2021-01-04" },
    ];

    // delete first and last event
    eventStoreInstance.deleteEvent(1);

    // test for retrieval of deleted event -> should throw error

    eventStoreInstance.deleteEvent(5);

    // test for retrieval of deleted event -> should throw error

    expect(eventStoreInstance.eventList).toMatchObject(first_last_deletion);

    // delete middle event in list
    eventStoreInstance.deleteEvent(3);

    // test for retrieval of deleted event -> should throw error
    expect(eventStoreInstance.eventList).toMatchObject(middle_deletion);
  });
});

describe("Module functionality with existing event store", () => {
  it("Retrieves EventStore instance", () => {
    let eventStoreInstance = setup(events);
    expect(eventStoreInstance).toBeTruthy();
  });

  it("Create an event in the EventStore instance", () => {
    let eventStoreInstance = setup(events);
    const newEventData = { startDate: "2020-01-01", endDate: "2020-01-01" };
    let createdEvent = eventStoreInstance.createEvent(newEventData);
    // read new created event
    let eventInStore = eventStoreInstance.readEventById(createdEvent.id);
    // check that new event is attributed a correct id
    expect(eventInStore.id).toBe(4);

    eventInStore = omit(eventInStore, "id");

    expect(eventInStore).toMatchObject(newEventData);
  });

  it("Creates and updates event", () => {
    let eventStoreInstance = setup(events);
    const newEvent = { startDate: "2020-01-01", endDate: "2020-01-01" };

    let createdEvent = eventStoreInstance.createEvent(newEvent);
    let createdEventId = createdEvent.id;

    let createdEventInStore = eventStoreInstance.readEventById(createdEventId);

    createdEventInStore = omit(createdEventInStore, "id");

    expect(createdEventInStore).toEqual(newEvent);

    const updateToEvent = {
      id: createdEventId,
      startDate: "2021-01-01",
      endDate: "2021-01-01",
    };

    eventStoreInstance.updateEvent(updateToEvent);

    let updatedEventInStore = eventStoreInstance.readEventById(createdEventId);

    expect(updatedEventInStore).toMatchObject(updateToEvent);
  });

  it("Creates multiple events and reads events in a given date range", () => {
    let eventStoreInstance = setup(events);

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
    let filteredList = eventStoreInstance.readEvents({
      startDate: "2021-01-01",
      endDate: "2021-01-04",
    });

    expect(filteredList.length).toBe(5);

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

    let parsedList = [];
    filteredList.forEach((calEvent) => {
      parsedList.push(omit(calEvent, "id"));
    });

    expect(comparisonObj[0]).toMatchObject(parsedList[0]);
  });

  // it("Creates multiple events and retrieves a specific event by id", () => {
  //   let thiseventStoreInstance = setup(events);

  //   let createdEventIds = mockEventGenerator(thiseventStoreInstance, 6);

  //   let filteredEvent = thiseventStoreInstance.readEventById(6);

  //   expect(filteredEvent).toMatchObject({
  //     id: 6,
  //     startDate: "2021-01-03",
  //     endDate: "2021-01-03",
  //   });
  // });

  // delete event
  it("Create Events and deletes event by id", () => {
    let eventStoreInstance = setup(events);

    let generatedEvents = mockEventGenerator(eventStoreInstance, 5);

    // get list of ids for generated events

    // delete first event
    eventStoreInstance.deleteEvent(1);
    let deletedFirstEvent = eventStoreInstance.readEventById(1);

    expect(deletedFirstEvent).toBe(undefined);

    // delete last event
    let lastEventInStore = generatedEvents[generatedEvents.length - 1];
    eventStoreInstance.deleteEvent(lastEventInStore);
    let deletedLastEvent = eventStoreInstance.readEventById(lastEventInStore);
    expect(deletedLastEvent).toBe(undefined);
  });
});
