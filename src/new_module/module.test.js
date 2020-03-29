import CalendarModule from "./Module";

import { mondayStart, fridayStart, sundayStart } from "./week_defs";

import {
  February2015,
  February2019,
  February2020,
  March2020,
  April2020
} from "./month_objects";

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
  test.each`
    monthName          | monthDateParameter | weeksInMonth | monthObject
    ${"March 2020"}    | ${"03/01/2020"}    | ${5}         | ${March2020}
    ${"February 2015"} | ${"02/01/2015"}    | ${4}         | ${February2015}
    ${"February 2019"} | ${"02/01/2019"}    | ${5}         | ${February2019}
    ${"February 2020"} | ${"02/01/2020"}    | ${5}         | ${February2020}
    ${"April 2020"}    | ${"04/01/2015"}    | ${5}         | ${April2020}
  `(
    "Month Object  for $monthName should have the correct number of weeks: $weeksInMonth",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedNumberOfWeeks = moduleInstance.getNumberOfWeeksInMonth();

      expect(retrievedNumberOfWeeks).toEqual(monthObject.length);
    }
  );

  test.each`
    monthName          | monthDateParameter | monthObject
    ${"March 2020"}    | ${"03/01/2020"}    | ${March2020}
    ${"February 2020"} | ${"02/01/2020"}    | ${February2020}
  `(
    "Generated Month Object for $monthName matches the test object",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthObject = moduleInstance.getMonthObject();

      expect(retrievedMonthObject).toEqual(monthObject);
    }
  );
});
