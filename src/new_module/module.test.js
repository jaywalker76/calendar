import CalendarModule from "./Module";

import { mondayStart, fridayStart, sundayStart } from "./week_defs";

import { Jan2020, February2019, February2020, April2020 } from "./day_months";

describe("Module functionality", () => {
  test.each`
    dateValue       | expectedResult
    ${"10/01/2019"} | ${"October, 2019"}
    ${"12/31/2019"} | ${"December, 2019"}
    ${"01/01/2020"} | ${"January, 2020"}
    ${"02/29/2020"} | ${"February, 2020"}
  `(
    "Date String generation with Param set: correctly converts $dateValue to $expectedResult",
    ({ dateValue, expectedResult }) => {
      const moduleInstance = new CalendarModule(dateValue);
      expect(moduleInstance.dateString).toBe(expectedResult);
    }
  );

  it("Displays string for current date when no date param is set", () => {
    const dateObj = new Date();
    const monthName = dateObj.toLocaleString("default", { month: "long" });
    const yearString = dateObj.getFullYear();

    const moduleInstance = new CalendarModule();
    expect(moduleInstance.dateString).toBe(`${monthName}, ${yearString}`);
  });

  it("Returns ordered weekday numbers, given no specific starting day", () => {
    const weekDayNumbers = [0, 1, 2, 3, 4, 5, 6];
    const moduleInstance = new CalendarModule();
    const retrievedWeekDays = moduleInstance.getWeekDayNumbers();

    expect(weekDayNumbers).toEqual(retrievedWeekDays);
  });

  it("Returns ordered weekday numbers, given a specific start day", () => {
    const weekDayNumbers = [2, 3, 4, 5, 6, 0, 1];
    const moduleInstance = new CalendarModule(null, 2);
    const retrievedWeekDays = moduleInstance.getWeekDayNumbers();

    expect(weekDayNumbers).toEqual(retrievedWeekDays);
  });

  it("Returns weekday names", () => {
    const weekdayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const moduleInstance = new CalendarModule();
    const retrievedWeekdayNames = moduleInstance.getWeekDayNames();

    expect(weekdayNames).toEqual(retrievedWeekdayNames);
  });

  it("Returns reordered weekday names", () => {
    const weekdayNames = [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday"
    ];

    const moduleInstance = new CalendarModule(null, 1);
    const retrievedWeekdayNames = moduleInstance.getWeekDayNames();

    expect(weekdayNames).toEqual(retrievedWeekdayNames);
  });

  test.each`
    testName                   | startDay | expectedResult
    ${"week starts on monday"} | ${0}     | ${mondayStart}
    ${"week starts on friday"} | ${4}     | ${fridayStart}
    ${"week starts on sunday"} | ${6}     | ${sundayStart}
  `(
    "$testName: correctly converts $startDay to $expectedResult",
    ({ startDay, expectedResult }) => {
      const moduleInstance = new CalendarModule(null, startDay);

      expect(moduleInstance.getWeekDayNames()).toStrictEqual(expectedResult);
    }
  );
});

describe("Calendar implementation", () => {
  it("Returns calendar object for current month when no date param is specified", () => {
    const moduleInstance = new CalendarModule();
    const retrievedMonthDays = moduleInstance.getDaysInMonth();

    expect(Jan2020).toEqual(retrievedMonthDays);
  });

  test.each`
    monthName          | monthDateParameter | daysInMonth
    ${"January 2020"}  | ${"01/01/2020"}    | ${31}
    ${"February 2020"} | ${"02/01/2020"}    | ${29}
    ${"February 2019"} | ${"02/01/2019"}    | ${28}
    ${"April 2020"}    | ${"04/01/2020"}    | ${30}
  `(
    "$monthName should have $daysInMonth days",
    ({ monthDateParameter, daysInMonth }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthDays = moduleInstance.getTotalDaysInMonth();

      expect(retrievedMonthDays).toEqual(daysInMonth);
    }
  );

  test.each`
    monthName          | monthDateParameter | monthDayObject  | daysInMonth
    ${"January 2020"}  | ${"01/01/2020"}    | ${Jan2020}      | ${31}
    ${"February 2020"} | ${"02/01/2020"}    | ${February2020} | ${29}
    ${"February 2019"} | ${"02/01/2019"}    | ${February2019} | ${28}
    ${"April 2020"}    | ${"04/01/2020"}    | ${April2020}    | ${30}
  `(
    "Returns an object for $monthName having $daysInMonth days",
    ({ monthDateParameter, monthDayObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthDays = moduleInstance.getDaysInMonth();

      expect(retrievedMonthDays).toEqual(monthDayObject);
    }
  );

  it("Returns calendar object for month with a given date parameter", () => {
    const moduleInstance = new CalendarModule("01/01/2019");
    const retrievedMonthDays = moduleInstance.getTotalDaysInMonth();

    expect(retrievedMonthDays).toEqual(31);
  });
  // ensuring that the date being used to generate calendar objects
  // matches to current time when it not specifically defined
  it("Returns the Date object created on Module instantiation", () => {
    const moduleInstance = new CalendarModule();
    const retrievedDateObject = moduleInstance.instantiatedDate
      .toISOString()
      .slice(0, 16);
    const nowDate = new Date().toISOString().slice(0, 16);
    expect(retrievedDateObject).toEqual(nowDate);
  });
});

describe("Weekday properties implementation", () => {
  it("Correctly Identifies Week Number for first day of year", () => {
    const moduleInstance = new CalendarModule("01/01/2020");
    const specifiedWeekNumber = moduleInstance.getWeekNumber();

    expect(specifiedWeekNumber).toEqual(1);
  });

  it("Correctly Identifies Week Number for last day of year", () => {
    const moduleInstance = new CalendarModule("12/31/2021");
    const specifiedWeekNumber = moduleInstance.getWeekNumber();

    expect(specifiedWeekNumber).toEqual(52);
  });

  it("Days in week contain week number information", () => {
    const moduleInstance = new CalendarModule("01/01/2020");
    // get first day in first week of January
    const firstDayInJan = moduleInstance.getDaysInMonth().slice(0, 6)[0];

    expect(firstDayInJan.weekNumber).toEqual(1);
  });

  test.each`
    monthDateParameter | weekNumber
    ${"01/01/2020"}    | ${1}
    ${"01/23/2020"}    | ${4}
    ${"03/04/2020"}    | ${10}
    ${"12/31/2020"}    | ${52}
  `(
    "getWeekNumber returns week ${weekNumber} for a given date: ${monthDateParameter}",
    ({ monthDateParameter, weekNumber }) => {
      const moduleInstance = new CalendarModule();
      const specifiedWeekNumber = moduleInstance.getWeekNumber(
        monthDateParameter
      );

      expect(specifiedWeekNumber).toEqual(weekNumber);
    }
  );
});
