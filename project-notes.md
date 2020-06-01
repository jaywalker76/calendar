Calendar events

- create event
  - user clicks on day cell
  - does cell have event?
    - if true - present event information
    - if false - present event creation interface
      - update event list
      - update visual representation
- read event
  - read existing events
- update event
  - given edit interface if day contains event, update it
    - update event list
    - update visual representation
- delete event
  - given edit interface if day contains event, delete it
    - update event list
    - update visual representation

Event Presentation

- day has event?
  - render event cell

Notes:
Events are read once and rendered onto calendar

Tests:

- if day has event, test for event info presentation
