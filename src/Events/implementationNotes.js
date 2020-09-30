//  // Complete these items
//   *      removeStoreEvent: (store, eventId) -> store
//  *      updateStoreEvent: (store, eventId, event) -> store
//  *
//  *  - as operações de removeStoreEvent e updateStoreEvent fazem throw de um erro se o eventId não existir na store
//  *  - as operçãoes devem tratar os argumentos como imutável, ou seja, nenhuma das funções da API modifica
//  *      nenhum dos argumentos que se lhes são passados; podem, quando fizer sentido, aproveitar parte do conteudo
//  *      dos argumentos para construir o resultado
//  *  - um evento (quer como argumento, quer como output das funções) tem a estrutura { title, start_date, end_date }

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