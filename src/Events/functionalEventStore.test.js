import { eventStore, newStore } from "./FunctionalEventStore";

describe("Module functionality with empty event store", () => {
  it("Retrieves EventStore instance when there are no existing events", () => {
    let eventStoreInstance = newStore();
    expect(eventStoreInstance).toBeTruthy();

    expect(eventStoreInstance).toEqual(expect.arrayContaining(eventStore));
  });

  it("Create new store", () => {});
});
