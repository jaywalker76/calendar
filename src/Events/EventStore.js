/**
This module is responsible for handling the crud operations related to calendar events
*/
module.exports = class EventStore {
  constructor(eventList) {
    this.eventList = eventList === undefined ? {} : eventList;
  }
  // create event
  createEvent(eventToAdd) {
    const existingEvents = Object.keys(this.eventList).length;
    const newEventIndex = existingEvents === 0 ? 0 : existingEvents + 1;
    this.eventList[newEventIndex] = eventToAdd;
    return this.eventList;
  }
  // read event
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
};
