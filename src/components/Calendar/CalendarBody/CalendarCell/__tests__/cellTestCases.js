const cellWithoutEvent = {
  day: 1,
  weekday: 1,
  currentMonth: true,
};

const cellWithEvent = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const cellStartAndBody = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
  ],
};

const cellBodyAndEnd = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: false,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const cellWithBody = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
  ],
};

const twoEventsInCell = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const eventsStartDiffDays = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: false,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const eventsEndDiffDays = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
  ],
};

const bothEventsStartAndEndDiffDays = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
  ],
};

const threeEventsInCell = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const threeEventsInCellDiffStart = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: false,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const threeEventsInCellDiffEnd = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
};

const threeEventsInCellDiffOriginAndEnd = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
    {
      eventStart: false,
      eventBody: true,
      eventEnd: false,
      eventTitle: "Test",
    },
  ],
};

const threeEventsWithAdditionalInformation = {
  day: 1,
  weekday: 1,
  currentMonth: true,
  eventObject: [
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
    {
      eventStart: true,
      eventBody: true,
      eventEnd: true,
      eventTitle: "Test",
    },
  ],
  additionalEvents: true,
};

export {
  cellWithoutEvent,
  cellWithEvent,
  cellStartAndBody,
  cellBodyAndEnd,
  cellWithBody,
  twoEventsInCell,
  eventsStartDiffDays,
  eventsEndDiffDays,
  bothEventsStartAndEndDiffDays,
  threeEventsInCell,
  threeEventsInCellDiffStart,
  threeEventsInCellDiffEnd,
  threeEventsInCellDiffOriginAndEnd,
  threeEventsWithAdditionalInformation,
};
