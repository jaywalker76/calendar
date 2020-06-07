/**
This module is responsible for handling the crud operations related to calendar events
*/

import { merge } from "emotion";

function readEvents(eventList) {
  return eventList;
}

function createEvent(currentEventList, eventToAdd) {
  currentEventList.events.push(eventToAdd);
  return currentEventList;
}

function updateEvent(currentEventList, newEventInfo) {
  let updatedEventList = currentEventList.events.map((item) => {
    let merged;
    if (item.id === newEventInfo.id) {
      merged = { ...item, ...newEventInfo };
      item = merged;
    }

    return item;
  });

  currentEventList.events = updatedEventList;

  return currentEventList;
}

export { readEvents, createEvent, updateEvent };
