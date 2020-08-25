import {
  eventStore,
  newStore,
  addStoreEvent,
  removeStoreEvent,
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
  it("Retrieves EventStore instance when there are no existing events", () => {
    let eventStoreInstance = newStore();
    expect(eventStoreInstance).toBeTruthy();

    expect(eventStoreInstance).toEqual(expect.arrayContaining(eventStore));
  });

  it("Add a new Store Event", () => {
    let sampleEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let sampleEventStore = [sampleEvent];
    let eventStoreInstance = newStore();
    let eventAdded = addStoreEvent(eventStoreInstance, sampleEvent);

    expect(eventAdded.store).toMatchObject(sampleEventStore);
    expect(eventAdded.eventId).toBe(1);
  });

  it("Add a new Store Event", () => {
    let sampleEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let sampleEventStore = [sampleEvent];
    let eventStoreInstance = newStore();
    let eventAdded = addStoreEvent(eventStoreInstance, sampleEvent);

    expect(eventAdded.store).toMatchObject(sampleEventStore);
    expect(eventAdded.eventId).toBe(1);
  });

  it("Remove Store Events", () => {
    // moving over to this case, in order to test sequential addition
    // removeStoreEvent: (store, eventId) -> store
    // removeStoreEvent
    let sampleEvent = {
      startDate: `2021-01-01`,
      endDate: `2021-01-02`,
    };
    let sampleEventStore = [sampleEvent];
    let eventStoreInstance = newStore();
    let eventAdded = addStoreEvent(eventStoreInstance, sampleEvent);

    expect(eventAdded.store).toMatchObject(sampleEventStore);
    expect(eventAdded.eventId).toBe(1);

    let eventRemoved = removeStoreEvent(eventStoreInstance, 1);
    expect(eventRemoved).toMatchObject([]);
  });

  it("Add a three sequential events", () => {
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
    let sampleEventStore = [firstEvent, secondEvent, thirdEvent];
    let eventStoreInstance = newStore();

    let firstAddition = addStoreEvent(eventStoreInstance, firstEvent);
    let secondAddition = addStoreEvent(firstAddition, secondEvent);
    let eventAdded = addStoreEvent(secondAddition, thirdEvent);

    expect(eventAdded.store).toMatchObject(sampleEventStore);
    expect(eventAdded.eventId).toBe(1);
  });

  it("Retrieve Events in a given Range", () => {
    //getStoreEventsInRange
  });
});

// *      addStoreEvent: (store, event) -> { store: store, eventId: id }
