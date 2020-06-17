import EventStore from "../Events";
import events from "../Events/events";

const setup = (eventList) => new EventStore(eventList);

let eventStoreInstance;

describe("Module functionality", () => {
  it("Retrieves EventStore instance", () => {
    eventStoreInstance = setup(events);
    expect(eventStoreInstance).toBeTruthy();
  });
});
