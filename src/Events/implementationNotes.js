//  // Complete these items
//   *      removeStoreEvent: (store, eventId) -> store
//  *      updateStoreEvent: (store, eventId, event) -> store
//  *
//  *  - as operações de removeStoreEvent e updateStoreEvent fazem throw de um erro se o eventId não existir na store
//  *  - as operçãoes devem tratar os argumentos como imutável, ou seja, nenhuma das funções da API modifica
//  *      nenhum dos argumentos que se lhes são passados; podem, quando fizer sentido, aproveitar parte do conteudo
//  *      dos argumentos para construir o resultado
//  *  - um evento (quer como argumento, quer como output das funções) tem a estrutura { title, start_date, end_date }

// // Complete these items
// * removeStoreEvent: (store, eventId) -> store
// * updateStoreEvent: (store, eventId, event) -> store
// *
// * - as operações de removeStoreEvent e updateStoreEvent fazem throw de um erro se o eventId não existir na store
// * - as operçãoes devem tratar os argumentos como imutável, ou seja, nenhuma das funções da API modifica
// * nenhum dos argumentos que se lhes são passados; podem, quando fizer sentido, aproveitar parte do conteudo
// * dos argumentos para construir o resultado
// * - um evento (quer como argumento, quer como output das funções) tem a estrutura { title, start_date, end_date }

// Dado o que vimos até agora, se calhar adicionava mais duas funções:
// we already have one -> we'll rename the function
// - eventStoreCount: (store) -> # of events in store
// - getEventById: (store, id) -> event
// *NOTA* Aqui o ‘event’ retornado não tem o ID, porque o ID não faz parte da definição da estrutura do evento.

// - Implement a function that returns a new store
// Mock implementation
const newStore = newStore()

newStore = () =>{

// step 1 - returns an event store composed of an empty array of events and an ID seed field initialially set to zero)
return {data:[], eventIdSeed: 0}

// A descrição está um pouco estranha (a event store é o objecto todo, uma descrição mais precisa seria: 
// returns an event store composed of an empty array of events and an ID seed field initialially set to zero), 
// mas o resultado está ok.

// tests
// expect newStore.data to equal []
// expect newStore.eventSeedId to be 0

// Esta abordagem liga estes testes à estrutura da store, o que tem a desvantagem de os testes partirem se 
// decidires refactorizar a implementação e alterar a estrutura. 
// De uma forma geral, acho preferível que os testes (tal como os utilizadores destas funções) 
// tratem a store como um objecto opaco (black box).
// Uma alternativa seria definir os testes por combinação de operações, por exemplo:

// expect new store to have count of zero
// expect adding an event to an empty store to return a store with count of one and event id = 1
// expect to retrieve the added event by the id returned when adding an event to a store (empty or with some other events added before and after)
// expect adding a second event will return a store with count of two and event id = 2
// expect removing the second event and adding a third one will return a store with a count of two and event id = 3
// Etc.

}

// - Implement a function that adds an event to a store
// invoked by passing in a store and an event
// returns a new store, to which the event has been added, as well as the eventId
// of the newly added event

const eventStoreWithNewEvent = addStoreEvent(someExistingStore, { title, start_date, end_date })

/*
Cuidado com os nomes. O resultado não é uma store, é um objecto que tem uma store lá dentro.
Uma alternativa mais explícita seria:

const { eventStoreWithNewEvent, idOfAddedEvent } = addStoreEvent(someExistingStore, { title, start_date, end_date })
*/

// Mock implementation
// const addStoreEvent = (store, event)

// step 1 - generate an id to append to the event
// step 2 - event id, is to be generated taking into account the eventIdSeed, passed in with the store

// step 3 - check that store contains eventIdSeed, if not throw error
if(store.eventIdSeed){
  const eventId = generateEventId(store.eventIdSeed)
} else {
  throw Error()
}

/*
Já que vais testar a estrutura da store, se calhar também seria de validar que o store.data é uma array. E talvez colocar a lógica de validação numa função à parte porque provavelmente vais querer verificar que tens uma store bem formada nos outros métodos também.
*/
// step 4 - update event instance with generated id
const updatedEvent = {...event, eventId}
/*
Aqui estás a assumir que o evento que te foi passado está bem formado e que não tem campos a mais. Uma implementação mais defensiva seria, pelo menos, ir buscar explicitamente os campos:
const updatedEvent = { eventId, title: event.title, start_date: event.start_date, end_date: event.end_date };
*/
// step 5 - update event store with updated eventSeedId && return store

return {
  store:{
    data:[updatedEvent, ...],
    eventIdSeed: eventId
  },
  eventId: eventId
}

// // **for the time being we are ignoring repeated events -> this would be an event with duplicated event attributes
// // except for the id, which is unique**
// // push event into store (as note is array, this has to be done with a concat to ensure that a new store is returned
// // and we are not modifying the original store)

// // Assumptions and tests:
// // the store passed into the function has to contain a eventSeedId if this is not the case an error should be thrown
// //

// // test scenario 1: create store with 1 event:

// // 1 - newStore = newStore()
// // 2 - storeWithNewEvent = addStoreEvent(eventStore, event)

// // - expect storeWithNewEvent.data[0] to equal event passed as parameter
// // - expect storeWithNewEvent.eventSeedId to be 1
// // - expect storeWithNewEvent.data[0].id to equal newStore.eventSeedId

// Nestes testes, repete-se o comentário do nome que fiz mais acima. E da confusão gerada, leva a um erro na expressão dos testes. Nomeadamente, falta aqui uma indirecção porque o resultado do addStoreEvent() não é uma store, é um objecto que tem lá dentro uma store.
// O mesmo erro acontece daqui para a frente.

// // - expect getEventById(storeWithNewEvent.eventId) to equal storeWithNewEvent.data[0]
// // getEventById auxiliary function used to retrieve a specific event by its ID (view auxiliary functions section)

// Já que vais criar esta função, então esperava antes que o teste fosse:

// expect getEventById(storeWithNewEvent.eventId) to equal event


// // test scenario 2: create store with multiple events:
// // 1 - newStore = newStore()
// // 2 - newStore.addStoreEvent(eventStore, event) * n times

// // - expect newStore.data to equal object with inserted data for comparison
// // - for each added event:
// // expect newStore.eventSeedId to equal newStore.data[currentEvent].id

// Nesta formulação do teste, não só estás a forçar que a store tenha uma certa estrutura, como estás a obrigar a que o novo evento seja inserido no inicio. Quanto menos assumpções fizeres sobre a implementação, melhor os testes servem para suportar refactorizações futuras.

// // test scenario 3: event store does not contain eventIdSeed:
// // 1 - newStore = newStore()
// // 2 - newStore.addStoreEvent(eventStore, event)
// // - expect error to be thrown when eventStore does not contain eventIdSeed

// // test scenario 4: event is correctly added to previously existing event store:
// // 1 - store = storeWithExistingEvents
// // 2 - storeWithNewEvent = addStoreEvent(eventStore, event)

// // - expect storeWithNewEvent.data.length to equal store.data.length + 1
// // - expect storeWithNewEvent.getEventById(storeWithNewEvent.eventIdSeed) to equal event



// // test scenario 5: series of events are correctly added to previously existing event store:
// // 1 - store = storeWithExistingEvents
// // 2 - storeWithNewEvent = addStoreEvent(eventStore, event)
// // - expect storeWithNewEvent.data.length to equal store.data.length + 1
// // - expect storeWithNewEvent.getEventById(storeWithNewEvent.eventIdSeed) to equal event
// // * Not really sure as to what is the best way to test this

// Acho que o fulcro do teste devia ser que os eventos estão correctamente inseridos na store. Ou seja, dado N eventos inseridos, usar a função “getEventById” para obter os eventos previamente inseridos. Algo tipo:

// const { store1, id1 } = addStoreEvent(newStore(), event1);
// const { store2, id2 } = addStoreEvent(store1, event2);
// const { store3, id3 } = addStoreEvent(store2, event3);
// const { store4, id4 } = addStoreEvent(store3, event4);

// // ids should all be different
// expect id1 != id2
// expect id1 != id3
// expect id1 != id4
// expect id2 != id3
// expect id2 != id4
// expect id3 != id4

// // events should be retrievable by their respective ids
// expect getEventById( store4, id1 ) to equal event1
// expect getEventById( store4, id2 ) to equal event2
// expect getEventById( store4, id3 ) to equal event3
// expect getEventById( store4, id4 ) to equal event4

// }

// // - Implement a function that gets store events in a given range

// const eventsInGivenRange = getStoreEventsInRange(someExistingStore, start_date, end_date){

// // according to previous discussions, this should return a map of eventIds that fall within the range
// let eventsInRange = []

// Ou então:

// let eventsInRange = new Map();

// // iterate over events in store
// // if an events start_date is >=and <=end_date push event into eventsInRange

// eventsInRange[eventId] = {title, start_date, end_date}

// Nota que a estrutura dos eventos não tem Id 😊
// Além disso, aqui há duas interpretações possíveis. Ou só devolve eventos que estão estritamente dentro do intervalo ( event.start_date >= start_date && event.end_date <= end_date ), ou então devolve todos os que têm sobreposição ( event.start_date <= end_date && event.end_date >= start_date ).

// return eventsInRange;

// // Assumptions and tests:
// //
// // test scenario 1: eventStore passed in is empty:
// // expect eventsInRange.length to be 0


// // test scenario 2:
// // eventStore with 10 events starting on 2020-01-01 and ending on 2020-01-10
// // getStoreEventsInRange(someExistingStore, 2020-01-01, 2020-01-10)
// // expect eventsInRange.length to be 10

// // ToDo - include more testing scenarios
// }

// // auxiliary functions

// const generateEventId(eventIdSeed){
// // returns eventIdSeed + 1
// }

// const getEventById(store.data, eventId){
// // iterate over items in store.data and return an event if it matches
// // the eventId passed as a parameter
// }

// Cuidado com o valor de retorno, nota que a estrutura dos eventos não tem Id 😊
// Bom trabalho!


// - Implement a function that returns a new store
// Mock implementation
const newStore = newStore()
newStore = () =>{
  // step 1 - returns an event store of type array,  with eventSeedId set to 0
  return {data:[], eventIdSeed: 0}

  // tests
  // expect newStore.data to equal []
  // expect newStore.eventSeedId to be 0
}

  
// - Implement a function that adds an event to a store

// invoked by passing in a store and an event
// returns a new store, to which the event has been added, as well as the eventId
// of the newly added event
const eventStoreWithNewEvent = addStoreEvent(someExistingStore, { title, start_date, end_date })

// Mock implementation
addStoreEvent: (store, event){ 
  
  // step 1 - generate an id to append to the event
  // step 2 - event id, is to be generated taking into account the eventIdSeed, passed in with the store
  // step 3 - check that store contains eventIdSeed, if not throw error
  if(store.eventIdSeed){
    const eventId = generateEventId(store.eventIdSeed)
  } else {
    throw Error()
  }
  

  // step 4 - update event instance with generated id
  const updatedEvent = {...event, eventId}
  
  // step 5 - update event store with updated eventSeedId && return store

  return {
      store:{
        data:[updatedEvent, ...], 
        eventIdSeed: eventId
        }, 
      eventId: eventId
    }

  // **for the time being we are ignoring repeated events -> this would be an event with duplicated event attributes
  // except for the id, which is unique**
  // push event into store (as note is array, this has to be done with a concat to ensure that a new store is returned
  // and we are not modifying the original store)
  
  
  // Assumptions and tests:
  // the store passed into the function has to contain a eventSeedId if this is not the case an error should be thrown
  // 
  // test scenario 1: create store with 1 event:
  // 1 - newStore = newStore()
  // 2 - storeWithNewEvent = addStoreEvent(eventStore, event)

  //  - expect storeWithNewEvent.data[0] to equal event passed as parameter
  //  - expect storeWithNewEvent.eventSeedId to be 1
  //  - expect storeWithNewEvent.data[0].id to equal newStore.eventSeedId
  //  - expect getEventById(storeWithNewEvent.eventId) to equal storeWithNewEvent.data[0]
  // getEventById auxiliary function used to retrieve a specific event by its ID (view auxiliary functions section)

  // test scenario 2: create store with multiple events:
  // 1 - newStore = newStore()
  // 2 - newStore.addStoreEvent(eventStore, event) * n times

  //  - expect newStore.data to equal object with inserted data for comparison
  //  - for each added event:
  //      expect newStore.eventSeedId to equal newStore.data[currentEvent].id
  
  // test scenario 3: event store does not contain eventIdSeed:
  // 1 - newStore = newStore()
  // 2 - newStore.addStoreEvent(eventStore, event) 

  //  - expect error to be thrown when eventStore does not contain eventIdSeed
  
  // test scenario 4: event is correctly added to previously existing event store:
  // 1 - store = storeWithExistingEvents
  // 2 - storeWithNewEvent = addStoreEvent(eventStore, event) 

  //  - expect storeWithNewEvent.data.length to equal store.data.length + 1
  //  - expect storeWithNewEvent.getEventById(storeWithNewEvent.eventIdSeed) to equal event 
  

  // test scenario 5: series of events are correctly added to previously existing event store:
  // 1 - store = storeWithExistingEvents
  // 2 - storeWithNewEvent = addStoreEvent(eventStore, event) 

  //  - expect storeWithNewEvent.data.length to equal store.data.length + 1
  //  - expect storeWithNewEvent.getEventById(storeWithNewEvent.eventIdSeed) to equal event 
  // * Not really sure as to what is the best way to test this  
}

// - Implement a function that gets store events in a given range
const eventsInGivenRange = getStoreEventsInRange(someExistingStore, start_date, end_date){
  // according to previous discussions, this should return a map of eventIds that fall within the range
  let eventsInRange = []
  // iterate over events in store
  // if an events start_date is >=and <=end_date push event into eventsInRange 
  return eventsInRange;

  // Assumptions and tests:
  // 
  // test scenario 1: eventStore passed in is empty:
  // expect eventsInRange.length to be 0

  // test scenario 2: 
  // eventStore with 10 events starting on 2020-01-01 and ending on 2020-01-10
  // getStoreEventsInRange(someExistingStore, 2020-01-01, 2020-01-10)
  // expect eventsInRange.length to be 10
  // ToDo - include more testing scenarios
}



// auxiliary functions
const generateEventId(eventIdSeed){
  // returns eventIdSeed + 1
}

const getEventById(store.data, eventId){
  // iterate over items in store.data and return an event if it matches
  // the eventId passed as a parameter
}