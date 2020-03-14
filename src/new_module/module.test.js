import CalendarModule from "./Module";

import {
  mondayStart,
  fridayStart,
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
    testName                      | startDay | expectedResult
    ${"week starts on monday"}    | ${0}     | ${mondayStart}
    ${"week starts on friday"}    | ${4}     | ${fridayStart}
    ${"week starts on sunday"}    | ${6}     | ${sundayStart}
  `(
    "$testName: correctly converts $startDay to $expectedResult",
    ({ startDay, expectedResult }) => {
      const moduleInstance = new CalendarModule(null, startDay);

      expect(moduleInstance.getWeekDayNames()).toStrictEqual(
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

  it("Returns the Date object created on Module instantiation", () => {
    const moduleInstance = new CalendarModule();
    const retrievedDateObject = (moduleInstance.instantiatedDate).toISOString().slice(0,16);
    const nowDate = (new Date()).toISOString().slice(0,16);

    expect(retrievedDateObject).toEqual(nowDate);
  });

    // ToDo:
    // get week generator
    // get month generator
    // increase month rep
    // decrease month rep
  it("Returns an ordered array representing a week, containing 7 cells representing the days of the week", () => {
    const moduleInstance = new CalendarModule();
    const retrievedWeekObject = (moduleInstance.getWeekObject());

    expect(retrievedWeekObject.length).toEqual(7);
  })

  // this may be a duplicated test
  it("Returns an ordered array representing a week given a starting day of week", ()=>{
    const moduleInstance = new CalendarModule(null, 3);
    const retrievedWeekObject = (moduleInstance.getWeekObject());
    let orderedWeekDays = retrievedWeekObject.map(e =>  e.weekDay)

    expect(orderedWeekDays).toEqual([3,4,5,6,0,1,2])
  })

  it("Returns the number of weeks in a given month", ()=>{
    const moduleInstance = new CalendarModule("01/01/2020");
    const numberOfWeeksInMonth = (moduleInstance.getWeeksInMonth());

    expect(numberOfWeeksInMonth).toEqual(5)
  })

  it("Returns the week number for a given week", ()=>{
    const moduleInstance = new CalendarModule("01/01/2020");
    const dateWeekNumber = (moduleInstance.getWeekNumber());

    expect(dateWeekNumber).toEqual(1)
  })

  it("Returns a structure representing a month", ()=>{
    const moduleInstance = new CalendarModule("01/01/2020");
    const monthRepresentation = (moduleInstance.getMonthObject());

    // for January it should have 5 weeks and 31 days
    expect(monthRepresentation.length).toEqual(5);

    let dayCount = 0;

    monthRepresentation.map((currElem, index) => {
      dayCount += currElem.length;
     })

     expect(dayCount).toEqual(31);
    
  })

});
