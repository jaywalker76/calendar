import CalendarModule from "./Module";

describe("Module functionality", () => {
  const ModuleInstance = new CalendarModule("01/10/2019");

  it("date string should match date param", () => {
    const dateString = ModuleInstance.dateString;

    expect(dateString).toMatch("October, 2019");
  });
});
