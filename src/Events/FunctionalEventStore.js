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

const eventStore = [];

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

const addStoreEvent = (store, event) => {
  // ignoring id generation for the moment
  // const eventWithId = { ...event, id: 1 };
  let newStore = [event];
  if (store) {
    newStore = store.concat(newStore);
  }

  return { store: newStore, eventId: 1 }; //ToDo eventId Generation
};

const removeStoreEvent = (store, id) => {
  // const d = a.filter((v, k) => k < 1)
  const filteredStore = store.filter((event) => event !== id);
  return filteredStore;
  // d = [1]
};

export {
  eventStore,
  newStore,
  addStoreEvent,
  removeStoreEvent,
  sequentialEventAddition,
};
