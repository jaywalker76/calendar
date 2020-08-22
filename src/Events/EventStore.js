/**
This module is responsible for handling the crud operations related to calendar events
*/

const generateEventId = (eventList) => {
  return eventList.length + 1;
};

const isEmptyArray = (array) => array === undefined || array.length === 0;

const isEmptyObject = (object) =>
  Object.keys(object).length === 0 && object.constructor === Object;

module.exports = class EventStore {
  constructor(eventList) {
    this.eventList = eventList === undefined ? [] : eventList;
  }

  // create event
  createEvent(eventToAdd) {
    const eventId = generateEventId(this.eventList);
    const newEvent = {
      ...eventToAdd,
      id: eventId,
    };

    const createdEvent = Object.assign({}, newEvent);

    this.eventList.push(newEvent);
    return createdEvent;
  }
  // read event
  readEvents(dateFilterRange) {
    let { startDate, endDate } = dateFilterRange;

    // return this.eventList;
    return this.eventList.filter(
      (item) => item.startDate >= startDate && item.endDate <= endDate
    );
  }
  // read event by id
  readEventById(eventId) {
    const eventToReturn = Object.assign(
      {},
      this.eventList.filter((item) => item.id === eventId)
    );

    if (isEmptyArray(eventToReturn) || isEmptyObject(eventToReturn)) {
      throw new Error("Event does not exist");
      return;
    }

    return eventToReturn[0];
  }

  // update event
  updateEvent(eventToUpdate) {
    for (let i = 0; i < Object.keys(this.eventList).length; i++) {
      if (this.eventList[i].id === eventToUpdate.id) {
        this.eventList[i] = { ...eventToUpdate };
      }
    }
    return this.eventList;
  }
  // delete event
  deleteEvent(eventId) {
    this.eventList = this.eventList.filter((item) => item.id !== eventId);
  }
};
