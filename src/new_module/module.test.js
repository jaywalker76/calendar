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

describe("Module functionality", () => {
  test.each`
    testName                                   | dateValue       | expectedResult
    ${"Date String generation with Param set"} | ${"10/01/2019"} | ${"October, 2019"}
    ${"Date String generation with Param set"} | ${"12/31/2019"} | ${"December, 2019"}
    ${"Date String generation with Param set"} | ${"01/01/2020"} | ${"January, 2020"}
    ${"Date String generation with Param set"} | ${"02/29/2020"} | ${"February, 2020"}
  `(
    "$testName: correctly converts $dateValue to $expectedResult",
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

  it("Returns weekday numbers", () => {
    const weekDayNumbers = [0, 1, 2, 3, 4, 5, 6];
    const moduleInstance = new CalendarModule();
    const retrievedWeekDays = moduleInstance.getWeekDayNumbers();

    expect(weekDayNumbers).toEqual(retrievedWeekDays);
  });

  it("Returns ordered weekday numbers", () => {
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
});
