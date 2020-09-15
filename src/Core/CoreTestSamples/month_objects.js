// Feb 28 days, starting on a Sunday
// with no leading and trailing days and having just 4 weeks
const February2015 = [
  [
    { day: 1, weekday: 0, currentMonth: true },
    { day: 2, weekday: 1, currentMonth: true },
    { day: 3, weekday: 2, currentMonth: true },
    { day: 4, weekday: 3, currentMonth: true },
    { day: 5, weekday: 4, currentMonth: true },
    { day: 6, weekday: 5, currentMonth: true },
    { day: 7, weekday: 6, currentMonth: true },
  ],
  [
    { day: 8, weekday: 0, currentMonth: true },
    { day: 9, weekday: 1, currentMonth: true },
    { day: 10, weekday: 2, currentMonth: true },
    { day: 11, weekday: 3, currentMonth: true },
    { day: 12, weekday: 4, currentMonth: true },
    { day: 13, weekday: 5, currentMonth: true },
    { day: 14, weekday: 6, currentMonth: true },
  ],
  [
    { day: 15, weekday: 0, currentMonth: true },
    { day: 16, weekday: 1, currentMonth: true },
    { day: 17, weekday: 2, currentMonth: true },
    { day: 18, weekday: 3, currentMonth: true },
    { day: 19, weekday: 4, currentMonth: true },
    { day: 20, weekday: 5, currentMonth: true },
    { day: 21, weekday: 6, currentMonth: true },
  ],
  [
    { day: 22, weekday: 0, currentMonth: true },
    { day: 23, weekday: 1, currentMonth: true },
    { day: 24, weekday: 2, currentMonth: true },
    { day: 25, weekday: 3, currentMonth: true },
    { day: 26, weekday: 4, currentMonth: true },
    { day: 27, weekday: 5, currentMonth: true },
    { day: 28, weekday: 6, currentMonth: true },
  ],
];
// Feb 2019 has 28 days
const February2019 = [
  [
    { day: 27, weekday: 0, currentMonth: false },
    { day: 28, weekday: 1, currentMonth: false },
    { day: 29, weekday: 2, currentMonth: false },
    { day: 30, weekday: 3, currentMonth: false },
    { day: 31, weekday: 4, currentMonth: false },
    { day: 1, weekday: 5, currentMonth: true },
    { day: 2, weekday: 6, currentMonth: true },
  ],
  [
    { day: 3, weekday: 0, currentMonth: true },
    { day: 4, weekday: 1, currentMonth: true },
    { day: 5, weekday: 2, currentMonth: true },
    { day: 6, weekday: 3, currentMonth: true },
    { day: 7, weekday: 4, currentMonth: true },
    { day: 8, weekday: 5, currentMonth: true },
    { day: 9, weekday: 6, currentMonth: true },
  ],
  [
    { day: 10, weekday: 0, currentMonth: true },
    { day: 11, weekday: 1, currentMonth: true },
    { day: 12, weekday: 2, currentMonth: true },
    { day: 13, weekday: 3, currentMonth: true },
    { day: 14, weekday: 4, currentMonth: true },
    { day: 15, weekday: 5, currentMonth: true },
    { day: 16, weekday: 6, currentMonth: true },
  ],
  [
    { day: 17, weekday: 0, currentMonth: true },
    { day: 18, weekday: 1, currentMonth: true },
    { day: 19, weekday: 2, currentMonth: true },
    { day: 20, weekday: 3, currentMonth: true },
    { day: 21, weekday: 4, currentMonth: true },
    { day: 22, weekday: 5, currentMonth: true },
    { day: 23, weekday: 6, currentMonth: true },
  ],
  [
    { day: 24, weekday: 0, currentMonth: true },
    { day: 25, weekday: 1, currentMonth: true },
    { day: 26, weekday: 2, currentMonth: true },
    { day: 27, weekday: 3, currentMonth: true },
    { day: 28, weekday: 4, currentMonth: true },
    { day: 1, weekday: 5, currentMonth: false },
    { day: 2, weekday: 6, currentMonth: false },
  ],
];
// Feb2020 has leading days, no trailing days
const February2020 = [
  [
    { day: 26, weekday: 0, currentMonth: false },
    { day: 27, weekday: 1, currentMonth: false },
    { day: 28, weekday: 2, currentMonth: false },
    { day: 29, weekday: 3, currentMonth: false },
    { day: 30, weekday: 4, currentMonth: false },
    { day: 31, weekday: 5, currentMonth: false },
    { day: 1, weekday: 6, currentMonth: true },
  ],
  [
    { day: 2, weekday: 0, currentMonth: true },
    { day: 3, weekday: 1, currentMonth: true },
    { day: 4, weekday: 2, currentMonth: true },
    { day: 5, weekday: 3, currentMonth: true },
    { day: 6, weekday: 4, currentMonth: true },
    { day: 7, weekday: 5, currentMonth: true },
    { day: 8, weekday: 6, currentMonth: true },
  ],
  [
    { day: 9, weekday: 0, currentMonth: true },
    { day: 10, weekday: 1, currentMonth: true },
    { day: 11, weekday: 2, currentMonth: true },
    { day: 12, weekday: 3, currentMonth: true },
    { day: 13, weekday: 4, currentMonth: true },
    { day: 14, weekday: 5, currentMonth: true },
    { day: 15, weekday: 6, currentMonth: true },
  ],
  [
    { day: 16, weekday: 0, currentMonth: true },
    { day: 17, weekday: 1, currentMonth: true },
    { day: 18, weekday: 2, currentMonth: true },
    { day: 19, weekday: 3, currentMonth: true },
    { day: 20, weekday: 4, currentMonth: true },
    { day: 21, weekday: 5, currentMonth: true },
    { day: 22, weekday: 6, currentMonth: true },
  ],
  [
    { day: 23, weekday: 0, currentMonth: true },
    { day: 24, weekday: 1, currentMonth: true },
    { day: 25, weekday: 2, currentMonth: true },
    { day: 26, weekday: 3, currentMonth: true },
    { day: 27, weekday: 4, currentMonth: true },
    { day: 28, weekday: 5, currentMonth: true },
    { day: 29, weekday: 6, currentMonth: true },
  ],
];
// March starts on a sunday, no leading days, has trailing days
const March2020 = [
  [
    { day: 1, weekday: 0, currentMonth: true },
    { day: 2, weekday: 1, currentMonth: true },
    { day: 3, weekday: 2, currentMonth: true },
    { day: 4, weekday: 3, currentMonth: true },
    { day: 5, weekday: 4, currentMonth: true },
    { day: 6, weekday: 5, currentMonth: true },
    { day: 7, weekday: 6, currentMonth: true },
  ],
  [
    { day: 8, weekday: 0, currentMonth: true },
    { day: 9, weekday: 1, currentMonth: true },
    { day: 10, weekday: 2, currentMonth: true },
    { day: 11, weekday: 3, currentMonth: true },
    { day: 12, weekday: 4, currentMonth: true },
    { day: 13, weekday: 5, currentMonth: true },
    { day: 14, weekday: 6, currentMonth: true },
  ],
  [
    { day: 15, weekday: 0, currentMonth: true },
    { day: 16, weekday: 1, currentMonth: true },
    { day: 17, weekday: 2, currentMonth: true },
    { day: 18, weekday: 3, currentMonth: true },
    { day: 19, weekday: 4, currentMonth: true },
    { day: 20, weekday: 5, currentMonth: true },
    { day: 21, weekday: 6, currentMonth: true },
  ],
  [
    { day: 22, weekday: 0, currentMonth: true },
    { day: 23, weekday: 1, currentMonth: true },
    { day: 24, weekday: 2, currentMonth: true },
    { day: 25, weekday: 3, currentMonth: true },
    { day: 26, weekday: 4, currentMonth: true },
    { day: 27, weekday: 5, currentMonth: true },
    { day: 28, weekday: 6, currentMonth: true },
  ],
  [
    { day: 29, weekday: 0, currentMonth: true },
    { day: 30, weekday: 1, currentMonth: true },
    { day: 31, weekday: 2, currentMonth: true },
    { day: 1, weekday: 3, currentMonth: false },
    { day: 2, weekday: 4, currentMonth: false },
    { day: 3, weekday: 5, currentMonth: false },
    { day: 4, weekday: 6, currentMonth: false },
  ],
];
const March2020StartOnMonday = [
  [
    { day: 24, weekday: 1, currentMonth: false },
    { day: 25, weekday: 2, currentMonth: false },
    { day: 26, weekday: 3, currentMonth: false },
    { day: 27, weekday: 4, currentMonth: false },
    { day: 28, weekday: 5, currentMonth: false },
    { day: 29, weekday: 6, currentMonth: false },
    { day: 1, weekday: 0, currentMonth: true },
  ],
  [
    { day: 2, weekday: 1, currentMonth: true },
    { day: 3, weekday: 2, currentMonth: true },
    { day: 4, weekday: 3, currentMonth: true },
    { day: 5, weekday: 4, currentMonth: true },
    { day: 6, weekday: 5, currentMonth: true },
    { day: 7, weekday: 6, currentMonth: true },
    { day: 8, weekday: 0, currentMonth: true },
  ],
  [
    { day: 9, weekday: 1, currentMonth: true },
    { day: 10, weekday: 2, currentMonth: true },
    { day: 11, weekday: 3, currentMonth: true },
    { day: 12, weekday: 4, currentMonth: true },
    { day: 13, weekday: 5, currentMonth: true },
    { day: 14, weekday: 6, currentMonth: true },
    { day: 15, weekday: 0, currentMonth: true },
  ],
  [
    { day: 16, weekday: 1, currentMonth: true },
    { day: 17, weekday: 2, currentMonth: true },
    { day: 18, weekday: 3, currentMonth: true },
    { day: 19, weekday: 4, currentMonth: true },
    { day: 20, weekday: 5, currentMonth: true },
    { day: 21, weekday: 6, currentMonth: true },
    { day: 22, weekday: 0, currentMonth: true },
  ],
  [
    { day: 23, weekday: 1, currentMonth: true },
    { day: 24, weekday: 2, currentMonth: true },
    { day: 25, weekday: 3, currentMonth: true },
    { day: 26, weekday: 4, currentMonth: true },
    { day: 27, weekday: 5, currentMonth: true },
    { day: 28, weekday: 6, currentMonth: true },
    { day: 29, weekday: 0, currentMonth: true },
  ],
  [
    { day: 30, weekday: 1, currentMonth: true },
    { day: 31, weekday: 2, currentMonth: true },
    { day: 1, weekday: 3, currentMonth: false },
    { day: 2, weekday: 4, currentMonth: false },
    { day: 3, weekday: 5, currentMonth: false },
    { day: 4, weekday: 6, currentMonth: false },
    { day: 5, weekday: 0, currentMonth: false },
  ],
];
// April 2020 having days from previous and next month and has 29 days
const April2020 = [
  [
    { day: 29, weekday: 0, currentMonth: false },
    { day: 30, weekday: 1, currentMonth: false },
    { day: 31, weekday: 2, currentMonth: false },
    { day: 1, weekday: 3, currentMonth: true },
    { day: 2, weekday: 4, currentMonth: true },
    { day: 3, weekday: 5, currentMonth: true },
    { day: 4, weekday: 6, currentMonth: true },
  ],
  [
    { day: 5, weekday: 0, currentMonth: true },
    { day: 6, weekday: 1, currentMonth: true },
    { day: 7, weekday: 2, currentMonth: true },
    { day: 8, weekday: 3, currentMonth: true },
    { day: 9, weekday: 4, currentMonth: true },
    { day: 10, weekday: 5, currentMonth: true },
    { day: 11, weekday: 6, currentMonth: true },
  ],
  [
    { day: 12, weekday: 0, currentMonth: true },
    { day: 13, weekday: 1, currentMonth: true },
    { day: 14, weekday: 2, currentMonth: true },
    { day: 15, weekday: 3, currentMonth: true },
    { day: 16, weekday: 4, currentMonth: true },
    { day: 17, weekday: 5, currentMonth: true },
    { day: 18, weekday: 6, currentMonth: true },
  ],
  [
    { day: 19, weekday: 0, currentMonth: true },
    { day: 20, weekday: 1, currentMonth: true },
    { day: 21, weekday: 2, currentMonth: true },
    { day: 22, weekday: 3, currentMonth: true },
    { day: 23, weekday: 4, currentMonth: true },
    { day: 24, weekday: 5, currentMonth: true },
    { day: 25, weekday: 6, currentMonth: true },
  ],
  [
    { day: 26, weekday: 0, currentMonth: true },
    { day: 27, weekday: 1, currentMonth: true },
    { day: 28, weekday: 2, currentMonth: true },
    { day: 29, weekday: 3, currentMonth: true },
    { day: 30, weekday: 4, currentMonth: true },
    { day: 1, weekday: 5, currentMonth: false },
    { day: 2, weekday: 6, currentMonth: false },
  ],
];

// Month Objects for Testing, with week starting on Monday
// month with no trailing days
const May2020 = [
  [
    { day: 27, weekday: 1, currentMonth: false },
    { day: 28, weekday: 2, currentMonth: false },
    { day: 29, weekday: 3, currentMonth: false },
    { day: 30, weekday: 4, currentMonth: false },
    { day: 1, weekday: 5, currentMonth: true },
    { day: 2, weekday: 6, currentMonth: true },
    { day: 3, weekday: 0, currentMonth: true },
  ],
  [
    { day: 4, weekday: 1, currentMonth: true },
    { day: 5, weekday: 2, currentMonth: true },
    { day: 6, weekday: 3, currentMonth: true },
    { day: 7, weekday: 4, currentMonth: true },
    { day: 8, weekday: 5, currentMonth: true },
    { day: 9, weekday: 6, currentMonth: true },
    { day: 10, weekday: 0, currentMonth: true },
  ],
  [
    { day: 11, weekday: 1, currentMonth: true },
    { day: 12, weekday: 2, currentMonth: true },
    { day: 13, weekday: 3, currentMonth: true },
    { day: 14, weekday: 4, currentMonth: true },
    { day: 15, weekday: 5, currentMonth: true },
    { day: 16, weekday: 6, currentMonth: true },
    { day: 17, weekday: 0, currentMonth: true },
  ],
  [
    { day: 18, weekday: 1, currentMonth: true },
    { day: 19, weekday: 2, currentMonth: true },
    { day: 20, weekday: 3, currentMonth: true },
    { day: 21, weekday: 4, currentMonth: true },
    { day: 22, weekday: 5, currentMonth: true },
    { day: 23, weekday: 6, currentMonth: true },
    { day: 24, weekday: 0, currentMonth: true },
  ],
  [
    { day: 25, weekday: 1, currentMonth: true },
    { day: 26, weekday: 2, currentMonth: true },
    { day: 27, weekday: 3, currentMonth: true },
    { day: 28, weekday: 4, currentMonth: true },
    { day: 29, weekday: 5, currentMonth: true },
    { day: 30, weekday: 6, currentMonth: true },
    { day: 31, weekday: 0, currentMonth: true },
  ],
];
// month with no leading days
const June2020 = [
  [
    { day: 1, weekday: 1, currentMonth: true },
    { day: 2, weekday: 2, currentMonth: true },
    { day: 3, weekday: 3, currentMonth: true },
    { day: 4, weekday: 4, currentMonth: true },
    { day: 5, weekday: 5, currentMonth: true },
    { day: 6, weekday: 6, currentMonth: true },
    { day: 7, weekday: 0, currentMonth: true },
  ],
  [
    { day: 8, weekday: 1, currentMonth: true },
    { day: 9, weekday: 2, currentMonth: true },
    { day: 10, weekday: 3, currentMonth: true },
    { day: 11, weekday: 4, currentMonth: true },
    { day: 12, weekday: 5, currentMonth: true },
    { day: 13, weekday: 6, currentMonth: true },
    { day: 14, weekday: 0, currentMonth: true },
  ],
  [
    { day: 15, weekday: 1, currentMonth: true },
    { day: 16, weekday: 2, currentMonth: true },
    { day: 17, weekday: 3, currentMonth: true },
    { day: 18, weekday: 4, currentMonth: true },
    { day: 19, weekday: 5, currentMonth: true },
    { day: 20, weekday: 6, currentMonth: true },
    { day: 21, weekday: 0, currentMonth: true },
  ],
  [
    { day: 22, weekday: 1, currentMonth: true },
    { day: 23, weekday: 2, currentMonth: true },
    { day: 24, weekday: 3, currentMonth: true },
    { day: 25, weekday: 4, currentMonth: true },
    { day: 26, weekday: 5, currentMonth: true },
    { day: 27, weekday: 6, currentMonth: true },
    { day: 28, weekday: 0, currentMonth: true },
  ],
  [
    { day: 29, weekday: 1, currentMonth: true },
    { day: 30, weekday: 2, currentMonth: true },
    { day: 1, weekday: 3, currentMonth: false },
    { day: 2, weekday: 4, currentMonth: false },
    { day: 3, weekday: 5, currentMonth: false },
    { day: 4, weekday: 6, currentMonth: false },
    { day: 5, weekday: 0, currentMonth: false },
  ],
];
// month with leading and trailing days
const July2020 = [
  [
    { day: 29, weekday: 1, currentMonth: false },
    { day: 30, weekday: 2, currentMonth: false },
    { day: 1, weekday: 3, currentMonth: true },
    { day: 2, weekday: 4, currentMonth: true },
    { day: 3, weekday: 5, currentMonth: true },
    { day: 4, weekday: 6, currentMonth: true },
    { day: 5, weekday: 0, currentMonth: true },
  ],
  [
    { day: 6, weekday: 1, currentMonth: true },
    { day: 7, weekday: 2, currentMonth: true },
    { day: 8, weekday: 3, currentMonth: true },
    { day: 9, weekday: 4, currentMonth: true },
    { day: 10, weekday: 5, currentMonth: true },
    { day: 11, weekday: 6, currentMonth: true },
    { day: 12, weekday: 0, currentMonth: true },
  ],
  [
    { day: 13, weekday: 1, currentMonth: true },
    { day: 14, weekday: 2, currentMonth: true },
    { day: 15, weekday: 3, currentMonth: true },
    { day: 16, weekday: 4, currentMonth: true },
    { day: 17, weekday: 5, currentMonth: true },
    { day: 18, weekday: 6, currentMonth: true },
    { day: 19, weekday: 0, currentMonth: true },
  ],
  [
    { day: 20, weekday: 1, currentMonth: true },
    { day: 21, weekday: 2, currentMonth: true },
    { day: 22, weekday: 3, currentMonth: true },
    { day: 23, weekday: 4, currentMonth: true },
    { day: 24, weekday: 5, currentMonth: true },
    { day: 25, weekday: 6, currentMonth: true },
    { day: 26, weekday: 0, currentMonth: true },
  ],
  [
    { day: 27, weekday: 1, currentMonth: true },
    { day: 28, weekday: 2, currentMonth: true },
    { day: 29, weekday: 3, currentMonth: true },
    { day: 30, weekday: 4, currentMonth: true },
    { day: 31, weekday: 5, currentMonth: true },
    { day: 1, weekday: 6, currentMonth: false },
    { day: 2, weekday: 0, currentMonth: false },
  ],
];
// February with 29 days no leading deays
const February2016 = [
  [
    { day: 1, weekday: 1, currentMonth: true },
    { day: 2, weekday: 2, currentMonth: true },
    { day: 3, weekday: 3, currentMonth: true },
    { day: 4, weekday: 4, currentMonth: true },
    { day: 5, weekday: 5, currentMonth: true },
    { day: 6, weekday: 6, currentMonth: true },
    { day: 7, weekday: 0, currentMonth: true },
  ],
  [
    { day: 8, weekday: 1, currentMonth: true },
    { day: 9, weekday: 2, currentMonth: true },
    { day: 10, weekday: 3, currentMonth: true },
    { day: 11, weekday: 4, currentMonth: true },
    { day: 12, weekday: 5, currentMonth: true },
    { day: 13, weekday: 6, currentMonth: true },
    { day: 14, weekday: 0, currentMonth: true },
  ],
  [
    { day: 15, weekday: 1, currentMonth: true },
    { day: 16, weekday: 2, currentMonth: true },
    { day: 17, weekday: 3, currentMonth: true },
    { day: 18, weekday: 4, currentMonth: true },
    { day: 19, weekday: 5, currentMonth: true },
    { day: 20, weekday: 6, currentMonth: true },
    { day: 21, weekday: 0, currentMonth: true },
  ],
  [
    { day: 22, weekday: 1, currentMonth: true },
    { day: 23, weekday: 2, currentMonth: true },
    { day: 24, weekday: 3, currentMonth: true },
    { day: 25, weekday: 4, currentMonth: true },
    { day: 26, weekday: 5, currentMonth: true },
    { day: 27, weekday: 6, currentMonth: true },
    { day: 28, weekday: 0, currentMonth: true },
  ],
  [
    { day: 29, weekday: 1, currentMonth: true },
    { day: 1, weekday: 2, currentMonth: false },
    { day: 2, weekday: 3, currentMonth: false },
    { day: 3, weekday: 4, currentMonth: false },
    { day: 4, weekday: 5, currentMonth: false },
    { day: 5, weekday: 6, currentMonth: false },
    { day: 6, weekday: 0, currentMonth: false },
  ],
];
// February with 28 days with 4 weeks
const February2010 = [
  [
    { day: 1, weekday: 1, currentMonth: true },
    { day: 2, weekday: 2, currentMonth: true },
    { day: 3, weekday: 3, currentMonth: true },
    { day: 4, weekday: 4, currentMonth: true },
    { day: 5, weekday: 5, currentMonth: true },
    { day: 6, weekday: 6, currentMonth: true },
    { day: 7, weekday: 0, currentMonth: true },
  ],
  [
    { day: 8, weekday: 1, currentMonth: true },
    { day: 9, weekday: 2, currentMonth: true },
    { day: 10, weekday: 3, currentMonth: true },
    { day: 11, weekday: 4, currentMonth: true },
    { day: 12, weekday: 5, currentMonth: true },
    { day: 13, weekday: 6, currentMonth: true },
    { day: 14, weekday: 0, currentMonth: true },
  ],
  [
    { day: 15, weekday: 1, currentMonth: true },
    { day: 16, weekday: 2, currentMonth: true },
    { day: 17, weekday: 3, currentMonth: true },
    { day: 18, weekday: 4, currentMonth: true },
    { day: 19, weekday: 5, currentMonth: true },
    { day: 20, weekday: 6, currentMonth: true },
    { day: 21, weekday: 0, currentMonth: true },
  ],
  [
    { day: 22, weekday: 1, currentMonth: true },
    { day: 23, weekday: 2, currentMonth: true },
    { day: 24, weekday: 3, currentMonth: true },
    { day: 25, weekday: 4, currentMonth: true },
    { day: 26, weekday: 5, currentMonth: true },
    { day: 27, weekday: 6, currentMonth: true },
    { day: 28, weekday: 0, currentMonth: true },
  ],
];

export {
  February2015,
  February2019,
  February2020,
  March2020,
  March2020StartOnMonday,
  April2020,
  May2020,
  June2020,
  July2020,
  February2016,
  February2010,
};
