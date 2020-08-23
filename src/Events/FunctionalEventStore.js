/**
 *
 * Exercício:
 * Criar uma versão funcional de uma "event store", que satisfaça os seguintes requisitos:
 *  - operações a implementar:
 *      newStore: () -> store
 *      addStoreEvent: (store, event) -> { store: store, eventId: id }
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

export const functionalStore = () => 1;
