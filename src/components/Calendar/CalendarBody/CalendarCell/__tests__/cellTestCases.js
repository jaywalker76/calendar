const cellWithoutEvent = {
  day: 1,
  weekday: 1,
  currentMonth: true,
};

const cellWithEvent = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: {
    eventStart: true,
    eventBody: true,
    eventEnd: true,
    eventTitle: "Test",
  },
};

const cellStartAndBody = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: {
    eventStart: true,
    eventBody: true,
    eventEnd: false,
    eventTitle: "Test",
  },
};

const cellBodyAndEnd = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: {
    eventStart: false,
    eventBody: true,
    eventEnd: true,
    eventTitle: "Test",
  },
};

const cellWithBody = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: {
    eventStart: false,
    eventBody: true,
    eventEnd: false,
    eventTitle: "Test",
  },
};

export {
  cellWithoutEvent,
  cellWithEvent,
  cellStartAndBody,
  cellBodyAndEnd,
  cellWithBody,
};
