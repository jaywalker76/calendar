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

function deleteEvent(currentEventList, eventToRemove) {
  let updatedEventList = currentEventList.events.filter(
    (item) => item.id !== eventToRemove
  );

  currentEventList.events = updatedEventList;
  return currentEventList;
}

export { readEvents, createEvent, updateEvent, deleteEvent };
