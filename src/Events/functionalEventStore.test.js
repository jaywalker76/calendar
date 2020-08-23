import { eventStore, newStore } from "./FunctionalEventStore";

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
    let sampleEventStore = [
      {
        startDate: `2021-01-01`,
        endDate: `2021-01-02`,
      },
    ];
    let eventStoreInstance = newStore();
    let eventAdded = addStoreEvent(eventStoreInstance, sampleEvent);

    expect(eventAdded.store).toEqual(expect.arrayContaining(sampleEventStore));
    expect(eventAdded.eventId).toBe(1);
  });
});

// *      addStoreEvent: (store, event) -> { store: store, eventId: id }
