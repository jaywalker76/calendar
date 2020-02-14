import CalendarModule from "./Module";

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
});
