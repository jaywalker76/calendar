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

const eventStore = { store: [] };

const newStore = () => eventStore;

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

  return sequentialEventAddition(result.store, newStartString, end);
};

const eventStoreCount = (store) => store.length;

const getEventId = (store) => eventStoreCount(store) + 1;

const getStoreToProcess = (eventStore) => {
  let eventStoreToProcess;

  if (Array.isArray(eventStore)) {
    eventStoreToProcess = eventStore;
  } else {
    eventStoreToProcess = eventStore.store;
  }

  return eventStoreToProcess;
};

const addStoreEvent = (eventStore, event) => {
  // inconsistent store being passed
  // ToDo: standardize the eventStore argument
  const eventStoreToProcess = getStoreToProcess(eventStore);

  let eventWithId = {
    ...event,
    eventId: event.eventId ? event.eventId : getEventId(eventStoreToProcess),
  };

  if (eventStore) {
    eventWithId = eventStoreToProcess.concat(eventWithId);
  } else {
    eventWithId = eventStoreToProcess.concat(eventWithId);
  }

  return { store: eventWithId }; //ToDo eventId Generation
};

const eventExistsInStore = (store, id) => {
  const checkForEventInStore = store.filter((event) => event.eventId === id);

  return checkForEventInStore.length > 0;
};

const removeStoreEvent = (eventStore, id) => {
  const eventStoreToProcess = getStoreToProcess(eventStore);

  if (!eventExistsInStore(eventStoreToProcess, id)) {
    throw new Error("Event does not exist in store");
  }

  const filteredStore = eventStoreToProcess.filter(
    (event) => event.eventId !== id
  );
  return { store: filteredStore };
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
  const eventStoreToProcess = getStoreToProcess(eventStore);
  const eventToReturn = eventStoreToProcess.filter(
    (event) => event.eventId === eventId
  );

  const returnObj = omitObjectByKey(eventToReturn[0], "eventId");

  return returnObj;
};

const updateStoreEvent = (eventStore, eventId, event) => {
  const eventStoreToProcess = getStoreToProcess(eventStore);
  // check if event exists in store
  if (eventExistsInStore(eventStoreToProcess, eventId)) {
    // retrieve event by Id

    let eventToModify = getEventById(eventStoreToProcess, eventId);
    // remove event from store
    const eventStoreMinusEvent = removeStoreEvent(eventStoreToProcess, eventId);
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
  eventStore,
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
  eventStoreCount,
  getEventsInRange,
  updateStoreEvent,
  getEventById,
};
