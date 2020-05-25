Ora bem, assumindo que vamos avançar na direcção de adicionar eventos ao calendário, para ajudar a focar, aqui está uma descrição mínima do primeiro grande bloco de trabalho:

Epic 1

- Events should have a description, together with a start and end date (day-month-year)
- Edition should be done through drag-and-drop on the calendar month view
- Calendar should still work without events.

O que proponho é que faças o seguinte:

1. Cria um diagrama dos "modulos"/"componentes" (e relações de herança, composição, dependência) existentes actualmente no projecto ; exemplo, Calender (React Component) está ligado ao CalendarHeader por composição, está ligado ao Calendar Module.

2) Como arquitectos, queremos adiar a decisão de como será feita a persistência dos eventos (isto traduz-se em ter uma interface que abstrai a implementação concreta da persistênca).

Propõe duas formas diferentes de integrar os eventos na arquitectura acima (incluindo a persistencia) que satisfaçam os objectivos do épico e da necessidade de arquitectura. Isto é, define quais são os principais componentes (visuais e não só), que te parecem ser necessários para implementar os requisitos. Não é necessário definir funções, nem detalhes de propriedades. Apenas se pretende um diagrama de alto nível, caixas e setas.

Adiciona também uma frase a descrever o propósito (responsabilidade) cada módulo/componente; tenta ser o mais específico e sucinto possível (se algum módulo/componente for dificil de descrever, isso pode ser um sinal de que há mais que uma responsabilidade em jogo e que o módulo/componente deve ser partido).

    https://en.wikipedia.org/wiki/Single-responsibility_principle

3. Define o que seriam os critérios de aceitação da primeira tarefa (visualizar um evento pré-definido) deste bloco de trabalho. E escreve um primeiro teste (sem implementação ainda).

---

EventRow:
Generate rows for visual representation of calendar events

---

Calendar Events structure:

events: {
{
id: number,
title: string,
start: Date,
end: Date,
desc: string, optional,
notes: string, optional,
event_category: string, optional
}
}

Notes:

- Event Category should have associated color.
  - Events with no category render with default color(TBD)

---

Calendar Mode:

- basic: calendar renders with no additional functionality -> as in click to add/resize events
- selectable: clicking or dragging on calendar cell presents prompt to insert Event Details
  - clicking on existing event brings up event information
- year: presents a 12 month representation of current year, with no interaction

focus on month view

- isMonthView? -> for the time being this will be the only view

Day cell needs to be segmented

- day number needs to be placeed in specific container
  - embelishment: day at corner, with day number in background?
- day cell can contain event or be empty

EventRow
Events to be a row overlaid on top of cell, for multi day events

- this row contains the cell representations for continuous events
