import {
  eventStore,
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
  getNumberOfEventsInStore,
} from "./FunctionalEventStore";

let inProps = (key, props) => {
  if (typeof props === "string") {
    return key === props;
  } else {
    return props.some((omitKey) => {
      return omitKey === key;
    });
  }
};

let omit = (obj, props) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

describe("Module functionality with empty event store", () => {
  it("Retrieves empty EventStore instance", () => {
    let eventStoreInstance = newStore();
    expect(eventStoreInstance).toBeTruthy();

    // expect(eventStoreInstance).toEqual(expect.arrayContaining(eventStore));
  });

  it("Add a new Store Event", () => {
    let sampleEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreInstance = newStore();
    let eventStoreWithAddedEvent = addStoreEvent(
      eventStoreInstance,
      sampleEvent
    );

    // rewriting test so that eventId is appended to the added event
    expect(eventStoreWithAddedEvent.store[0]).toMatchObject(sampleEvent);
    expect(eventStoreWithAddedEvent.store[0].eventId).toBe(1);
  });

  it("Adds and removes a single Store Event", () => {
    let sampleEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreInstance = newStore();
    let eventStoreWithAddedEvent = addStoreEvent(
      eventStoreInstance,
      sampleEvent
    );

    let eventRemoved = removeStoreEvent(eventStoreWithAddedEvent, 1);
    expect(eventRemoved).toMatchObject([]);
  });

  it("Adds multiple events and deletes first, middle and last events", () => {
    let firstEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let secondEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let thirdEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let fourthEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let fifthEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };

    let eventStoreInstance = newStore();

    let firstAddition = addStoreEvent(eventStoreInstance, firstEvent);
    let secondAddition = addStoreEvent(firstAddition, secondEvent);
    let thirdAddition = addStoreEvent(secondAddition, thirdEvent);
    let fourthAddition = addStoreEvent(thirdAddition, fourthEvent);
    let fifthAddition = addStoreEvent(fourthAddition, fifthEvent);

    expect(getNumberOfEventsInStore(fifthAddition.store)).toBe(5);
    // expect(eventAdded.eventId).toBe(1);
  });

  it("Retrieve Events in a given Range", () => {
    //getStoreEventsInRange
  });
});

describe("Functional Event Addition", () => {
  it("Sequential event addition on an empty store returns an empty store if start is greater than end", () => {
    let eventStoreInstance = newStore();
    const startDate = `2020-02-01`;
    const endDate = `2020-01-01`;

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
      startDate,
      endDate
    );
    expect(alteredStore).toMatchObject(eventStoreInstance);
  });
  it("Sequential event addition on an empty store returns an store with an event if start is equal to end", () => {
    let eventStoreInstance = newStore();

    const startDate = `2020-01-01`;
    const endDate = `2020-01-01`;

    const expectedStore = [
      {
        startDate: `2020-01-01`,
        endDate: `2020-01-01`,
      },
    ];

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
      startDate,
      endDate
    );
    expect(alteredStore).toMatchObject(expectedStore);
  });

  it("Sequential event addition on an empty store returns an store with various events if start is less than end", () => {
    let eventStoreInstance = newStore();

    const startDate = `2020-01-01`;
    const endDate = `2020-01-02`;

    const expectedStore = [
      {
        startDate: `2020-01-01`,
        endDate: `2020-01-01`,
      },
      {
        startDate: `2020-01-02`,
        endDate: `2020-01-02`,
      },
    ];

    const alteredStore = sequentialEventAddition(
      eventStoreInstance,
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
