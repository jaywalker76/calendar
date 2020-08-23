import { functionalStore } from "./FunctionalEventStore";

describe("Module functionality with empty event store", () => {
  it("Retrieves EventStore instance when there are no existing events", () => {
    let eventStoreInstance = functionalStore();
    expect(eventStoreInstance).toBeTruthy();
  });
});
