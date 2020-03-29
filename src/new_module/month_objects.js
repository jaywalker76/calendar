// Feb 28 days, starting on a Sunday
const February2015 = [{}, {}, {}, {}, {}];
// Feb 2019 has 28 days
const February2019 = [{}, {}, {}, {}, {}];
// Feb2020 has days of previous month at start, no days for next month at end
const February2020 = [{}, {}, {}, {}, {}];
// March starts on a sunday, has no days from previous month has days for next month
const March2020 = [
  [
    { day: 1, weekday: 0, currentMonth: true },
    { day: 2, weekday: 1, currentMonth: true },
    { day: 3, weekday: 2, currentMonth: true },
    { day: 4, weekday: 3, currentMonth: true },
    { day: 5, weekday: 4, currentMonth: true },
    { day: 6, weekday: 5, currentMonth: true },
    { day: 7, weekday: 6, currentMonth: true }
  ],
  [
    { day: 8, weekday: 0, currentMonth: true },
    { day: 9, weekday: 1, currentMonth: true },
    { day: 10, weekday: 2, currentMonth: true },
    { day: 11, weekday: 3, currentMonth: true },
    { day: 12, weekday: 4, currentMonth: true },
    { day: 13, weekday: 5, currentMonth: true },
    { day: 14, weekday: 6, currentMonth: true }
  ],
  [
    { day: 15, weekday: 0, currentMonth: true },
    { day: 16, weekday: 1, currentMonth: true },
    { day: 17, weekday: 2, currentMonth: true },
    { day: 18, weekday: 3, currentMonth: true },
    { day: 19, weekday: 4, currentMonth: true },
    { day: 20, weekday: 5, currentMonth: true },
    { day: 21, weekday: 6, currentMonth: true }
  ],
  [
    { day: 22, weekday: 0, currentMonth: true },
    { day: 23, weekday: 1, currentMonth: true },
    { day: 24, weekday: 2, currentMonth: true },
    { day: 25, weekday: 3, currentMonth: true },
    { day: 26, weekday: 4, currentMonth: true },
    { day: 27, weekday: 5, currentMonth: true },
    { day: 28, weekday: 6, currentMonth: true }
  ],
  [
    { day: 29, weekday: 0, currentMonth: true },
    { day: 30, weekday: 1, currentMonth: true },
    { day: 31, weekday: 2, currentMonth: true },
    { day: 1, weekday: 3, currentMonth: false },
    { day: 2, weekday: 4, currentMonth: false },
    { day: 3, weekday: 5, currentMonth: false },
    { day: 4, weekday: 6, currentMonth: false }
  ]
];
// April 2020 having days from previous and next month and has 29 days
const April2020 = [{}, {}, {}, {}, {}];

export { February2015, February2019, February2020, March2020, April2020 };
