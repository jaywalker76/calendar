/**
 *
 * Exercício:
 * Criar uma versão funcional de uma "event store", que satisfaça os seguintes requisitos:
 *  - operações a implementar:
 *      newStore: () -> store**
 *      addStoreEvent: (store, event) -> { store: store, eventId: id }**
 *      getStoreEventsInRange: (store, start_date, end_date) -> mapa de eventId para event
 *      removeStoreEvent: (store, eventId) -> store
 *      updateStoreEvent: (store, eventId, event) -> store
 *
 *  - as operações de removeStoreEvent e updateStoreEventfazem throw de um erro se o eventId não existir na store
 *  - as operçãoes devem tratar os argumentos como imutável, ou seja, nenhuma das funções da API modifica
 *      nenhum dos argumentos que se lhes são passados; podem, quando fizer sentido, aproveitar parte do conteudo
 *      dos argumentos para construir o resultado
 *  - um evento (quer como argumento, quer como output das funções) tem a estrutura { title, start_date, end_date }
 */

/**
 * CHANGES:
 * - rename event.store to event.data
 * - modify way in which event seed is calculated: incremented in place rather than in function
 */

//#region - Fix sequential Event Addition
//  - because of changes in object structure the sequential addition function
//  now needs to accept the entire store structure, rather than just the data
// - updated eventStore data invocation in failing test
// - update getEventById to operate on entire event store, rather than on eventStore.data
// - Standardize the way in which the event store data is passed to functions that retrieve specific events
//#endregion

//#region - Fix sequential addition and update and eventIdSeedUpdate
// - updated methods, so that correct eventSeed is returned (in some cases it was being ommited)
//  and an updated event retains its id, rather than incrementing it
// - return a new store structure, containing an event seed id
//#endregion

//#region
// - expand tests for new store creation
// expect newStore.data to equal []
// expect newStore.eventSeedId to be 0

// refactor event addition, so that returned store is a complete store(data+seed)

// Uma alternativa seria definir os testes por combinação de operações, por exemplo:
// expect new store to have count of zero - v
// expect adding an event to an empty store to return a store with count of one and event id = 1 v
// expect to retrieve the added event by the id returned when adding an event to a store (empty or with some other events added before and after)
// expect adding a second event will return a store with count of two and event id = 2
// expect removing the second event and adding a third one will return a store with a count of two and event id = 3
// Etc.
//#endregion

//#region
// - add title to event structure
// - remove getEventId function as no longer needed
// - remove omit function from test suite, as this functionality makes sense here
//#endregion

/**
 * @typedef eventStore
 * @type {object}
 * @property {array} data - contains events.
 * @property {number} eventIdSeed - used to generate event ids assignable to neew events.
 */

/**
 * Function returns a store object containing an empty data array and an eventId seed set to 0
 *
 * @returns {eventStore}  - returns a new data store
 */
const newStore = () => {
  return { data: [], eventIdSeed: 0 };
};
/**
 * This function generates a sequence of events, starting at the provided start date
 * and ending at the provided end date (inclusive), which are placed into the provided event store
 * The events start and end on the same day and have no time assignation
 *
 * @param {eventStore} eventStore - Event store to which to add an event
 * @param { String } title - event title
 * @param { String } start - Event Start Date
 * @param { String } end - Event End Date
 * @returns {eventStore} store containing the newly created event data and updated eventId Seed
 */
const sequentialEventAddition = (eventStore, title, start, end) => {
  if (start > end) {
    return eventStore;
  }

  const { store } = addStoreEvent(eventStore, {
    title: title,
    startDate: start,
    endDate: start,
  });

  let newStartDate = new Date(start);
  let newStartString;
  // Add a day
  newStartDate.setDate(newStartDate.getDate() + 1);

  newStartString = newStartDate.toISOString().substring(0, 10);
  return sequentialEventAddition(store, title, newStartString, end);
};

/**
 * This function returns the count of events contained in a given store
 *
 * @param {eventStore} eventStore - event from which we want to retrieve the event count
 * @returns { int } - the number of events in the store
 */
const eventStoreCount = (eventStore) => eventStore.data.length;

/**
 * Adds an event to a given store
 *
 * @param {eventStore} eventStore - Event store to which to add an event
 * @param {Object {title: String, startDate: String, endDate:String}} event - given event to be added to given event store
 * @returns {Object {store:{data:array, eventIdSeed: int}, eventId: int}  - updated Event Store containing the provided event.
 */
const addStoreEvent = (eventStore, event) => {
  // not sure how to handle the eventSeedId
  // for the time being, when it is incremented
  // it will be updated in the return object
  const { data, eventIdSeed } = eventStore;
  let eventIdToApply;
  let eventIdSeedToReturn = eventIdSeed;

  // check if event has an Id
  const eventMissingId = !Boolean(event.eventId);
  // if not, generate an eventId from the eventIdSeed
  if (eventMissingId) {
    eventIdToApply = eventIdSeed + 1;
    eventIdSeedToReturn = eventIdToApply;
  } else {
    eventIdToApply = event.eventId;
  }

  let eventWithId = {
    ...event,
    eventId: eventIdToApply,
  };

  const updatedEventStoreData = data.concat(eventWithId);

  return {
    store: { data: updatedEventStoreData, eventIdSeed: eventIdSeedToReturn },
    eventId: eventIdToApply,
  };
};
/**
 * Given an event Id checks if the event exists in the event store
 *
 * @param {eventStore} eventStore - event store in which we want to verify if a 
 * given event exists
 * @param {number} id - Event Id that we want to look for in the event store
 
 * @returns {boolean} - returns true if an event with the given Id exists in the store, false otherwise
 */
// I don't understand how this is interchangeable with getEventById
const eventExistsInStore = (eventStore, id) => {
  const checkForEventInStore = eventStore.data.filter(
    (event) => event.eventId === id
  );

  return checkForEventInStore.length > 0;
};
/**
 * Given an event id, removes the event from the store, if the event does exist
 *
 * @param {eventStore} eventStore - event store from which we want to remove and event
 * @param {number} Id - Id of the event that we want to remove
 * @returns {eventStore} eventStore - copy of original event store, minus the removed event,
 * @throws Will throw an error if the event does not exist in the store.
 */

const removeStoreEvent = (eventStore, id) => {
  if (!eventExistsInStore(eventStore, id)) {
    throw new Error("Event does not exist in store");
  }

  const { data, eventIdSeed } = eventStore;

  const filteredStore = data.filter((event) => event.eventId !== id);
  return { data: filteredStore, eventIdSeed: eventIdSeed };
};
/**
 * Given a start date and an end date that specify a date range, returns a
 * map containing the events within a specified period
 *
 * @param {eventStore} eventStore - event store from which we want to retrieve
 * events which fall in a given time range
 * @param {string} startOfRange - start date of the period in which we want to retrieve events
 * @param {string} endOfRange - end date of the period (inclusive) in which we want to retrieve events
 * @returns {eventId: event} eventsInTimeRange - map containing events in time range
 * check for declaration type in JSDocs
 *
 */
const getEventsInRange = (eventStore, startOfRange, endOfRange) => {
  // what should be the return type here?
  let eventsInTimeRange = [];

  eventStore.data.forEach((event) => {
    if (event.startDate >= startOfRange && event.startDate <= endOfRange) {
      eventsInTimeRange.push(event);
    }
  });

  return eventsInTimeRange;
};
/**
 * Given an object and a key, it returns a copy of the object, not containing said key
 * Used to compare events in tests
 *
 * @param {object} objectToProcess
 * @param {string} keyToOmit
 * @returns {object} - object minus specified key
 */

const omitObjectByKey = (objectToProcess, keyToOmit) => {
  return Object.keys(objectToProcess).reduce((object, key) => {
    if (key !== keyToOmit) {
      object[key] = objectToProcess[key];
    }
    return object;
  }, {});
};
/**
 * Given an event id, retrieves a said event, if it exists, from a given store
 *
 * @param {eventStore} eventStore
 * @param {number} eventId Id of the event we wish to retrieve
 * @returns {Object {Title: String, StartDate: String, EndDate:String}} event - Event we are looking for
 * if event does not exist it should return undefined -> need to update specification as per JSDoc
 */
const getEventById = (eventStore, eventId) => {
  // modifying function so that event returned does not contain ID
  // as it is not part of the event structure

  const eventToReturn = eventStore.data.filter(
    (event) => event.eventId === eventId
  );

  const returnObj = omitObjectByKey(eventToReturn[0], "eventId");

  return returnObj;
};
/**
 * Given an event Id, if the event exists in the given store, it updates the event
 * with the provided data
 *
 * @param {eventStore} eventStore - store in which we want to update an event
 * @param {number} eventId - Id of the event we wish to update
 * @param {Object {Title: String, StartDate: String, EndDate:String}} eventUpdate - data with which to update event
 * @returns {eventStore} - store having the updated event and no update to eventIdSeed
 * @throws Will throw an error if the event does not exist in the store.
 */
const updateStoreEvent = (eventStore, eventId, eventUpdate) => {
  if (eventExistsInStore(eventStore, eventId)) {
    // retrieve event by Id
    let eventToModify = getEventById(eventStore, eventId);
    // remove event from store
    const eventStoreMinusEvent = removeStoreEvent(eventStore, eventId);
    // modify event
    const modifiedEvent = {
      ...eventToModify,
      ...eventUpdate,
      eventId: eventId,
    };
    // add event to store
    const updatedEventStore = addStoreEvent(
      eventStoreMinusEvent,
      modifiedEvent
    );
    return updatedEventStore;
  } else {
    throw new Error("Event does not exist in store");
  }
};

export {
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
  eventStoreCount,
  getEventsInRange,
  updateStoreEvent,
  getEventById,
};
