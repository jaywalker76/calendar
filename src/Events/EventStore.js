/**
This module is responsible for handling the crud operations related to calendar events
*/

const generateEventId = (eventList) => {
  return eventList.length + 1;
};

module.exports = class EventStore {
  constructor(eventList) {
    this.eventList = eventList === undefined ? [] : eventList;
  }
  // create event
  createEvent(eventToAdd) {
    const eventId = generateEventId(this.eventList);
    const newEvent = {
      id: eventId,
      ...eventToAdd,
    };
    this.eventList.push(newEvent);
    return newEvent;
  }
  // read event
  readEvents(eventId) {
    return eventId === undefined
      ? this.eventList
      : this.eventList.filter((item) => item.id === 1);
  }
  // read event by id
  readEventById(eventId) {
    return this.eventList.filter((item) => item.id === eventId);
  }
  // update event
  updateEvent(eventToUpdate, eventUpdate) {
    for (let i = 0; i < Object.keys(this.eventList).length; i++) {
      if (this.eventList[0].id === eventToUpdate.id) {
        this.eventList[0] = { ...eventToUpdate, ...eventUpdate };
      }
    }
    return this.eventList;
  }
  // delete event
  deleteEvent(eventId) {
    return this.eventList.filter((item) => item.id !== eventId);
  }
};
