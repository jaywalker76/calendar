import CalendarModule from "../CalendarCore";
import _ from "lodash";

import {
  February2015,
  February2019,
  February2020,
  March2020,
  April2020,
  May2020,
  June2020,
  July2020,
  February2016,
  February2010,
} from "../CoreTestSamples/month_objects";

const removeDateObjectFromRetrievedMonth = (monthObjectToParse) =>
  monthObjectToParse.map((week) => {
    return week.map((day) => {
      return _.omit(day, ["dayObject"]);
    });
  });

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
});

describe("Calendar implementation", () => {
  test.each`
    monthName          | monthDateParameter | weeksInMonth | monthObject
    ${"February 2015"} | ${"02/01/2015"}    | ${4}         | ${February2015}
    ${"March 2020"}    | ${"03/01/2020"}    | ${5}         | ${March2020}
    ${"February 2019"} | ${"02/01/2019"}    | ${5}         | ${February2019}
    ${"February 2020"} | ${"02/01/2020"}    | ${5}         | ${February2020}
    ${"April 2020"}    | ${"04/01/2020"}    | ${5}         | ${April2020}
  `(
    "Month Object for $monthName should have the correct number of weeks: $weeksInMonth",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthObject = moduleInstance.getMonthObject();

      expect(retrievedMonthObject.length).toEqual(monthObject.length);
    }
  );

  test.each`
    monthName          | monthDateParameter | weeksInMonth | monthObject
    ${"February 2015"} | ${"02/01/2015"}    | ${4}         | ${February2015}
    ${"March 2020"}    | ${"03/01/2020"}    | ${5}         | ${March2020}
    ${"February 2019"} | ${"02/01/2019"}    | ${5}         | ${February2019}
    ${"February 2020"} | ${"02/01/2020"}    | ${5}         | ${February2020}
    ${"April 2020"}    | ${"04/01/2020"}    | ${5}         | ${April2020}
  `(
    "Month Object for $monthName should have the correct number of weeks: $weeksInMonth",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthObject = moduleInstance.getMonthObject();

      expect(retrievedMonthObject.length).toEqual(monthObject.length);
    }
  );

  test.each`
    monthName          | monthDateParameter | monthObject
    ${"February 2015"} | ${"02/01/2015"}    | ${February2015}
    ${"March 2020"}    | ${"03/01/2020"}    | ${March2020}
    ${"February 2019"} | ${"02/01/2019"}    | ${February2019}
    ${"February 2020"} | ${"02/01/2020"}    | ${February2020}
    ${"April 2020"}    | ${"04/01/2020"}    | ${April2020}
  `(
    "Generated Month Object for $monthName matches the test object",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedMonthObject = moduleInstance.getMonthObject();

      const filteredMonthObj = removeDateObjectFromRetrievedMonth(
        retrievedMonthObject
      );

      expect(filteredMonthObj).toEqual(monthObject);
    }
  );
});

describe("Week Number Implementation", () => {
  test.each`
    monthDateParameter | weekNumber
    ${"04/04/2020"}    | ${15}
    ${"02/01/2015"}    | ${6}
    ${"02/22/2015"}    | ${9}
    ${"04/21/2015"}    | ${17}
    ${"05/31/2015"}    | ${23}
    ${"05/26/2019"}    | ${22}
    ${"02/16/2020"}    | ${8}
    ${"02/23/2020"}    | ${9}
  `(
    "Correctly calculates week in year number for $monthDateParameter",
    ({ monthDateParameter, weekNumber }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedWeekNumber = moduleInstance.getWeekInYear();

      expect(retrievedWeekNumber).toEqual(weekNumber);
    }
  );

  test.each`
    monthDateParameter | weekNumber
    ${"04/04/2020"}    | ${5}
    ${"02/01/2015"}    | ${4}
  `(
    "Correctly calculates the number of weeks in a month leveraging getWeekInYear function",
    ({ monthDateParameter, weekNumber }) => {
      const moduleInstance = new CalendarModule(monthDateParameter);
      const retrievedNumberOfWeeksInMonth = moduleInstance.getNumberOfWeeksInMonth();

      expect(retrievedNumberOfWeeksInMonth).toEqual(weekNumber);
    }
  );
});

describe("Calendar Implementation for week starting on Monday", () => {
  test.each`
    monthName          | monthDateParameter | monthObject
    ${"May 2020"}      | ${"05/01/2020"}    | ${May2020}
    ${"June 2020"}     | ${"06/01/2020"}    | ${June2020}
    ${"July 2020"}     | ${"07/01/2020"}    | ${July2020}
    ${"February 2016"} | ${"02/01/2016"}    | ${February2016}
    ${"February 2010"} | ${"02/01/2010"}    | ${February2010}
  `(
    "Generated Month Object for $monthName matches the test object",
    ({ monthDateParameter, monthObject }) => {
      const moduleInstance = new CalendarModule(monthDateParameter, 1);

      const retrievedMonthObject = moduleInstance.getMonthObject();
      const filteredMonthObj = removeDateObjectFromRetrievedMonth(
        retrievedMonthObject
      );

      expect(filteredMonthObj).toEqual(monthObject);
    }
  );
});
