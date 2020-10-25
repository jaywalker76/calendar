import {
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
  eventStoreCount,
  getEventsInRange,
  updateStoreEvent,
  getEventById,
} from "./FunctionalEventStore";

describe("Module functionality with empty event store", () => {
  it("should correctly add and delete events to a store", () => {
    let eventStoreInstance = newStore();
    expect(eventStoreInstance).toBeTruthy();
    // expect new store to have count of zero
    expect(eventStoreCount(eventStoreInstance)).toBe(0);
    // expect adding an event to an empty store to return a store with count of one and event id = 1
    const sampleEvent = {
      title: "first event",
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreWithAddedEvent = addStoreEvent(
      eventStoreInstance,
      sampleEvent
    );

    const { store, eventId } = eventStoreWithAddedEvent;

    expect(eventStoreCount(store)).toBe(1);
    expect(eventId).toBe(1);

    // expect to retrieve the added event by the id returned
    // when adding an event to a store (empty or with some other events added before and after)
    const firstAddedEvent = getEventById(store, eventId);
    expect(firstAddedEvent).toBeTruthy();
    expect(firstAddedEvent).toMatchObject(sampleEvent);

    // expect adding a second event will return a store with count of two and event id = 2
    let eventStoreWithTwoEvents = addStoreEvent(store, sampleEvent);
    const {
      store: updatedStore,
      eventId: secondEventId,
    } = eventStoreWithTwoEvents;

    expect(eventStoreCount(updatedStore)).toBe(2);
    expect(secondEventId).toBe(2);

    let storeWithEventRemoved = removeStoreEvent(updatedStore, 1);
    let eventStoreAfterRemovalAndAddition = addStoreEvent(
      storeWithEventRemoved,
      sampleEvent
    );
    const {
      store: storeWithDeletionAndAddition,
      eventId: thirdEventAddedId,
    } = eventStoreAfterRemovalAndAddition;

    expect(eventStoreCount(storeWithDeletionAndAddition)).toBe(2);
    expect(thirdEventAddedId).toBe(3);
    expect(() =>
      removeStoreEvent(storeWithDeletionAndAddition, 1)
    ).toThrowError("Event does not exist in store");
  });

  it("Retrieve Events in a given Range", () => {
    // initialize store
    let eventStoreInstance = newStore();
    const eventStore = sequentialEventAddition(
      eventStoreInstance,
      "event title",
      "2020-01-01",
      "2020-01-15"
    );

    let retrievedEventsInRange = getEventsInRange(
      eventStore,
      "2020-01-01",
      "2020-01-05"
    );

    expect(eventStoreCount(eventStore)).toBe(15);
    expect(Object.keys(retrievedEventsInRange).length).toBe(5);
    // no events in range
    retrievedEventsInRange = getEventsInRange(
      eventStore,
      "2020-02-01",
      "2020-02-05"
    );
    expect(Object.keys(retrievedEventsInRange).length).toBe(0);
    // start date not in range
    retrievedEventsInRange = getEventsInRange(
      eventStore,
      "2019-12-31",
      "2020-01-04"
    );
    expect(Object.keys(retrievedEventsInRange).length).toBe(4);
    // end date not in range
    retrievedEventsInRange = getEventsInRange(
      eventStore,
      "2020-01-13",
      "2020-01-18"
    );
    expect(Object.keys(retrievedEventsInRange).length).toBe(3);
    // additional test cases:
    // check that returned object matches
    // test for correct returns when startDate/endDate/start and end date do not exist in store
    // not sure if these tests are necessary
  });

  it("Updates first, middle and last event in store", () => {
    let eventStoreInstance = newStore();
    const eventStore = sequentialEventAddition(
      eventStoreInstance,
      "event name",
      "2020-01-01",
      "2020-01-05"
    );

    const eventUpdate = {
      title: "event name",
      startDate: `2020-01-06`,
      endDate: `2020-01-06`,
    };

    const updatedStore = updateStoreEvent(eventStore, 1, eventUpdate);
    expect(getEventById(updatedStore, 1)).toMatchObject(eventUpdate);

    const storeWithSecondUpdate = updateStoreEvent(
      updatedStore,
      3,
      eventUpdate
    );
    expect(getEventById(storeWithSecondUpdate, 3)).toMatchObject(eventUpdate);

    const storeWithThirdUpdate = updateStoreEvent(
      storeWithSecondUpdate,
      5,
      eventUpdate
    );
    expect(getEventById(storeWithThirdUpdate, 5)).toMatchObject(eventUpdate);
  });
});

describe("GetEventById functionality", () => {
  it("If an event exists in a store return it", () => {
    let eventStoreInstance = newStore();
    const sampleEvent = {
      title: "first event",
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreWithAddedEvent = addStoreEvent(
      eventStoreInstance,
      sampleEvent
    );

    const { store, eventId } = eventStoreWithAddedEvent;

    expect(getEventById(store, eventId)).toBeTruthy();
  });
  it("If event does not exist in a store return undefined", () => {
    let eventStoreInstance = newStore();
    const sampleEvent = {
      title: "first event",
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreWithAddedEvent = addStoreEvent(
      eventStoreInstance,
      sampleEvent
    );

    const { store } = eventStoreWithAddedEvent;

    expect(getEventById(store, 2)).toBeUndefined();
  });
});

describe("Functional Event Addition", () => {
  it("Sequential event addition on an empty store returns an empty store if start is greater than end", () => {
    let eventStoreInstance = newStore();
    const startDate = `2020-02-01`;
    const endDate = `2020-01-01`;

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
      "some event title",
      startDate,
      endDate
    );
    expect(alteredStore).toMatchObject(eventStoreInstance);
  });
  it("Sequential event addition on an empty store returns an store with an event if start is equal to end", () => {
    let eventStoreInstance = newStore();

    const startDate = `2020-01-01`;
    const endDate = `2020-01-01`;

    const expectedStore = {
      data: [
        {
          title: "some title",
          startDate: `2020-01-01`,
          endDate: `2020-01-01`,
        },
      ],
      eventIdSeed: 1,
    };

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
      "some title",
      startDate,
      endDate
    );
    expect(alteredStore).toMatchObject(expectedStore);
  });

  it("Sequential event addition on an empty store returns an store with various events if start is less than end", () => {
    let eventStoreInstance = newStore();

    const startDate = `2020-01-01`;
    const endDate = `2020-01-02`;

    const expectedStore = {
      data: [
        {
          title: "some title",
          startDate: `2020-01-01`,
          endDate: `2020-01-01`,
        },
        {
          title: "some title",
          startDate: `2020-01-02`,
          endDate: `2020-01-02`,
        },
      ],
      eventIdSeed: 2,
    };

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
      "some title",
      startDate,
      endDate
    );
    expect(alteredStore).toMatchObject(expectedStore);
  });
});
