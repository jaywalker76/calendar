/**
This module is responsible for handling the crud operations related to calendar events
*/

function readEvents(eventList) {
  return eventList;
}

function createEvent(currentEventList, eventToAdd) {
  currentEventList.events.push(eventToAdd);
  return currentEventList;
}

export { readEvents, createEvent };
