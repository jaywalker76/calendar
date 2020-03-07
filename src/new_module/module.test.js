import CalendarModule from "./Module";

import {
  mondayStart,
  tuesdayStart,
  wednesdayStart,
  thursdayStart,
  fridayStart,
  saturdayStart,
  sundayStart
} from "./week_defs";

import { monthTest } from "./day_months";

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
    const moduleInstance = new CalendarModule();
    const retrievedWeekDays = moduleInstance.getWeekDayNumbers(2);

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

    const moduleInstance = new CalendarModule();
    const retrievedWeekdayNames = moduleInstance.getWeekDayNames(1);

    expect(weekdayNames).toEqual(retrievedWeekdayNames);
  });

  test.each`
    testName                      | startDay | expectedResult
    ${"week starts on monday"}    | ${0}     | ${mondayStart}
    ${"week starts on tuesday"}   | ${1}     | ${tuesdayStart}
    ${"week starts on wednesday"} | ${2}     | ${wednesdayStart}
    ${"week starts on thursday"}  | ${3}     | ${thursdayStart}
    ${"week starts on friday"}    | ${4}     | ${fridayStart}
    ${"week starts on saturday"}  | ${5}     | ${saturdayStart}
    ${"week starts on sunday"}    | ${6}     | ${sundayStart}
  `(
    "$testName: correctly converts $startDay to $expectedResult",
    ({ startDay, expectedResult }) => {
      const moduleInstance = new CalendarModule();

      expect(moduleInstance.getWeekDayNames(startDay)).toStrictEqual(
        expectedResult
      );
    }
  );

  it("Returns day cells for a given month", () => {
    const moduleInstance = new CalendarModule();
    const retrievedMonthDays = moduleInstance.getDaysInMonth();

    expect(monthTest).toEqual(retrievedMonthDays);
  });

  it("Returns number of days for a given month", () => {
    const moduleInstance = new CalendarModule("10/01/2019");
    const retrievedMonthDays = moduleInstance.getTotalDaysInMonth();

    expect(retrievedMonthDays).toEqual(31);
  });
});
