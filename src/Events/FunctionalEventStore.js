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

  newStartString = newStartDate.toISOString().substring(0, 11);

  return sequentialEventAddition(result.store, newStartString, end);
};

const getNumberOfEventsInStore = (store) => store.length;

const getEventId = (store) => getNumberOfEventsInStore(store) + 1;

const addStoreEvent = (eventStore, event) => {
  // ignoring id generation for the moment
  // const eventWithId = { ...event, id: 1 };
  // modifying this function so that the event id
  // is added to the event itself
  let eventWithId = { ...event, eventId: getEventId(eventStore.store) };

  if (eventStore && Array.isArray(eventStore)) {
    eventWithId = eventStore.concat(eventWithId);
  } else {
    eventWithId = eventStore.store.concat(eventWithId);
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
