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

const getNumberOfEventsInStore = (store) => store.length;

const getEventId = (store) => getNumberOfEventsInStore(store) + 1;

const addStoreEvent = (eventStore, event) => {
  // inconsistent store being passed
  // ToDo: standardize the eventStore argument
  let eventStoreToProcess;

  if (Array.isArray(eventStore)) {
    eventStoreToProcess = eventStore;
  } else {
    eventStoreToProcess = eventStore.store;
  }

  let eventWithId = { ...event, eventId: getEventId(eventStoreToProcess) };

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
  if (!eventExistsInStore(eventStore.store, id)) {
    throw new Error("Event does not exist in store");
  }

  const filteredStore = eventStore.store.filter(
    (event) => event.eventId !== id
  );
  return { store: filteredStore };
};

export {
  eventStore,
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
  getNumberOfEventsInStore,
};
