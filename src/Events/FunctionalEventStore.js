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

// initial model was a simple array -> wondering if i'm modifying the object to conform
// to existing tests, rather than rewriting the tests and functionality as needed

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
//#endregion
// return a new store structure, containing an event seed id

const newStore = () => {
  return { data: [], eventIdSeed: 0 };
};

const sequentialEventAddition = (eventStore, start, end) => {
  if (start > end) {
    return eventStore;
  }

  let result = addStoreEvent(eventStore, {
    startDate: start,
    endDate: start,
  });

  let newStartDate = new Date(start);
  let newStartString;
  // Add a day
  newStartDate.setDate(newStartDate.getDate() + 1);

  newStartString = newStartDate.toISOString().substring(0, 10);

  return sequentialEventAddition(result, newStartString, end);
};

const eventStoreCount = (store) => store.length;

// receives the eventStore and returns an event id
// which is calculated by incrementing the evendIdSeed
const getEventId = (store) => store.eventIdSeed + 1;

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

  return { data: updatedEventStoreData, eventIdSeed: eventIdSeedToReturn };
};

const eventExistsInStore = (store, id) => {
  const checkForEventInStore = store.filter((event) => event.eventId === id);

  return checkForEventInStore.length > 0;
};

const removeStoreEvent = (eventStore, id) => {
  const { data, eventIdSeed } = eventStore;
  if (!eventExistsInStore(data, id)) {
    throw new Error("Event does not exist in store");
  }

  const filteredStore = data.filter((event) => event.eventId !== id);
  return { data: filteredStore, eventIdSeed: eventIdSeed };
};

const getEventsInRange = (eventStore, startOfRange, endOfRange) => {
  // what should be the return type here?
  let tempStore = [];

  eventStore.forEach((event) => {
    if (event.startDate >= startOfRange && event.startDate <= endOfRange) {
      tempStore.push(event);
    }
  });

  return tempStore;
};

const omitObjectByKey = (objectToProcess, keyToOmit) => {
  return Object.keys(objectToProcess).reduce((object, key) => {
    if (key !== keyToOmit) {
      object[key] = objectToProcess[key];
    }
    return object;
  }, {});
};

const getEventById = (eventStore, eventId) => {
  // modifying function so that event returned does not contain ID
  // as it is not part of the event structure

  const eventToReturn = eventStore.filter((event) => event.eventId === eventId);

  const returnObj = omitObjectByKey(eventToReturn[0], "eventId");

  return returnObj;
};

const updateStoreEvent = (eventStore, eventId, event) => {
  //const eventStoreToProcess = eventStore.data;
  // check if event exists in store
  if (eventExistsInStore(eventStore.data, eventId)) {
    // retrieve event by Id

    let eventToModify = getEventById(eventStore.data, eventId);
    // remove event from store
    const eventStoreMinusEvent = removeStoreEvent(eventStore, eventId);
    // modify event
    const modifiedEvent = { ...eventToModify, ...event, eventId: eventId };
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
