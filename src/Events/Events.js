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

function updateEvent(currentEventList, newEventInfo) {
  currentEventList.events = currentEventList.events.map((item) => {
    let merged;
    if (item.id === newEventInfo.id) {
      merged = { ...item, ...newEventInfo };
      item = merged;
    }

    return item;
  });

  return currentEventList;
}

function deleteEvent(currentEventList, eventToRemove) {
  currentEventList.events = currentEventList.events.filter(
    (item) => item.id !== eventToRemove
  );

  return currentEventList;
}

export { readEvents, createEvent, updateEvent, deleteEvent };
