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
    expect(eventStoreCount(eventStoreInstance.data)).toBe(0);
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

    expect(eventStoreCount(store.data)).toBe(1);
    expect(eventId).toBe(1);

    // expect to retrieve the added event by the id returned
    // when adding an event to a store (empty or with some other events added before and after)
    const firstAddedEvent = getEventById(store.data, eventId);
    expect(firstAddedEvent).toBeTruthy();
    expect(firstAddedEvent).toMatchObject(sampleEvent);

    // expect adding a second event will return a store with count of two and event id = 2
    let eventStoreWithTwoEvents = addStoreEvent(store, sampleEvent);
    const {
      store: updatedStore,
      eventId: secondEventId,
    } = eventStoreWithTwoEvents;

    expect(eventStoreCount(updatedStore.data)).toBe(2);
    expect(secondEventId).toBe(2);

    // expect removing the second event and adding a third one will return a store
    // with a count of two and event id = 3

    let storeWithEventRemoved = removeStoreEvent(updatedStore, 1);
    let eventStoreAfterRemovalAndAddition = addStoreEvent(
      storeWithEventRemoved,
      sampleEvent
    );
    const {
      store: storeWithDeletionAndAddition,
      eventId: thirdEventAddedId,
    } = eventStoreAfterRemovalAndAddition;

    expect(eventStoreCount(storeWithDeletionAndAddition.data)).toBe(2);
    expect(thirdEventAddedId).toBe(3);
    expect(() =>
      removeStoreEvent(storeWithDeletionAndAddition, 1)
    ).toThrowError("Event does not exist in store");
  });

  // it("Adds multiple events and deletes first, middle and last events", () => {
  //   let firstEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };
  //   let secondEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };
  //   let thirdEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };
  //   let fourthEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };
  //   let fifthEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };

  //   let eventStoreInstance = newStore();

  //   let firstAddition = addStoreEvent(eventStoreInstance, firstEvent);
  //   let secondAddition = addStoreEvent(firstAddition, secondEvent);
  //   let thirdAddition = addStoreEvent(secondAddition, thirdEvent);
  //   let fourthAddition = addStoreEvent(thirdAddition, fourthEvent);
  //   let finalStore = addStoreEvent(fourthAddition, fifthEvent);

  //   expect(eventStoreCount(finalStore.data)).toBe(5);

  //   //*  - as operações de removeStoreEvent e updateStoreEventfazem throw de um erro
  //   // se o eventId não existir na store
  //   // thought about adding a getEventById functionality, for testing purposes
  //   // but realized that I can test for object retrieval by ID, by testing for the
  //   // removal of unexisting items

  //   // test that events removed don't exist in respective store
  //   // do we want to test on every step or just in the final block?
  //   let firstRemoval = removeStoreEvent(finalStore, 1);

  //   expect(() => removeStoreEvent(firstRemoval, 1)).toThrowError(
  //     "Event does not exist in store"
  //   );

  //   let secondRemoval = removeStoreEvent(firstRemoval, 3);

  //   expect(() => removeStoreEvent(secondRemoval, 3)).toThrowError(
  //     "Event does not exist in store"
  //   );

  //   let finalRemoval = removeStoreEvent(secondRemoval, 5);

  //   expect(() => removeStoreEvent(finalRemoval, 5)).toThrowError(
  //     "Event does not exist in store"
  //   );

  //   expect(eventStoreCount(finalRemoval.data)).toBe(2);
  // });

  // memory aid -> to remove later
  // describe("exception test", () => {
  //   it("should throw an error", () => {
  //     expect(func).toThrow();
  //     // expect(func).not.toThrow();
  //   });
  //   it("should throw an error", () => {
  //     expect(func).toThrowError("my error");
  //   });
  // });

  it("Retrieve Events in a given Range", () => {
    // initialize store
    let eventStoreInstance = newStore();
    //const sequentialEventAddition = (eventStore, start, end) => {
    const eventStore = sequentialEventAddition(
      eventStoreInstance,
      "event title",
      "2020-01-01",
      "2020-01-15"
    );

    expect(eventStoreCount(eventStore.data)).toBe(15);
    expect(
      getEventsInRange(eventStore.data, "2020-01-01", "2020-01-05").length
    ).toBe(5);
    // no events in range
    expect(
      getEventsInRange(eventStore.data, "2020-02-01", "2020-02-05").length
    ).toBe(0);
    // start date not in range
    expect(
      getEventsInRange(eventStore.data, "2019-12-31", "2020-01-04").length
    ).toBe(4);
    // end date not in range
    expect(
      getEventsInRange(eventStore.data, "2020-01-13", "2020-01-18").length
    ).toBe(3);
    // additional test cases:
    // check that returned object matches
    // test for correct returns when startDate/endDate/start and end date do not exist in store
    // not sure if these tests are necessary
  });

  // it("Adds a new Store Event and subsequently updates the event", () => {
  //   const sampleEvent = {
  //     startDate: `2021-01-01`,
  //     endDate: `2021-01-02`,
  //   };

  //   const eventUpdate = {
  //     startDate: `2020-01-01`,
  //     endDate: `2020-01-02`,
  //   };
  //   let eventStoreInstance = newStore();
  //   let eventStoreWithAddedEvent = addStoreEvent(
  //     eventStoreInstance,
  //     sampleEvent
  //   );

  //   expect(eventStoreWithAddedEvent.data[0]).toMatchObject(sampleEvent);
  //   expect(eventStoreWithAddedEvent.data[0].eventId).toBe(1);

  //   let updatedStore = updateStoreEvent(
  //     eventStoreWithAddedEvent,
  //     1,
  //     eventUpdate
  //   );
  //   expect(updatedStore.data[0]).toMatchObject(eventUpdate);

  //   expect(() =>
  //     updateStoreEvent(eventStoreWithAddedEvent, 2, eventUpdate)
  //   ).toThrowError("Event does not exist in store");
  // });

  it("Updates first, middle and last event in store", () => {
    let eventStoreInstance = newStore();
    //const sequentialEventAddition = (eventStore, start, end) => {
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

    const { store } = updateStoreEvent(eventStore, 1, eventUpdate);
    expect(getEventById(store.data, 1)).toMatchObject(eventUpdate);

    const { store: updatedStore } = updateStoreEvent(store, 3, eventUpdate);
    expect(getEventById(updatedStore.data, 3)).toMatchObject(eventUpdate);

    const { store: storeAfterThirdUpdate } = updateStoreEvent(
      updatedStore,
      5,
      eventUpdate
    );
    expect(getEventById(storeAfterThirdUpdate.data, 5)).toMatchObject(
      eventUpdate
    );
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

// *      addStoreEvent: (store, event) -> { store: store, eventId: id }

// newStore = () => functionalStore()

// sequentialEventAddition = ( eventStore, start, end) =>
// if(start > end){
// return eventStore;
// } else {
// const {store, eventId} = addEvent(eventStore, {title: "title", startDate:start, endDate:start})
// sequentialEventAddition(store, start+1, end)
// }

// nextday=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+1);

// iterativeEventAddition = (eventStore, start, end) =>
// let store = eventStore
// for(i = start; i < end; i++){
// store = addEvent(eventStore, {title: "title", startDate:i, endDate:i}).store
// }

// return store
