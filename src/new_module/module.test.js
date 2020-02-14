import CalendarModule from "./Module";

describe("Module functionality", () => {
  const ModuleInstance = new CalendarModule("10/01/2019");

  it("date string should match date param", () => {
    const dateString = ModuleInstance.dateString;

    console.log("parsed date: " + dateString);

    expect(dateString).toMatch("October, 2019");
  });
});
