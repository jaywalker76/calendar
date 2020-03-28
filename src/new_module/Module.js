module.exports = class CalendarModule {
  /**
   *
   * @param {string} date - string in format MM/DD/YYYY
   * @param {number} weekStartDay - number indicating starting day of week
   * accept string in a given format and convert it to date
   */

  constructor(date, weekStartDay) {
    this.date = date === undefined ? new Date() : new Date(date);
    this.weekStartDay = weekStartDay === undefined ? 0 : weekStartDay;
  }

  // Getter
  get dateString() {
    return this.generateDateString();
  }
  /**
   * It makes sense for the Module to return the date object, so that it can be available to other
   * cases which will need it
   */
  get instantiatedDate() {
    return this.date;
  }
  /**
   * Move new Date Object instantiation to Constructor
   */
  // Method
  generateDateString() {
    const dateObj = this.date;
    const monthName = dateObj.toLocaleString("default", { month: "long" });
    const yearString = dateObj.getFullYear();

    return `${monthName}, ${yearString}`;
  }

  getWeekDayNumbers() {
    let dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    let remainingDays = dayNumbersArray.splice(this.weekStartDay);
    let orderedDays = remainingDays.concat(dayNumbersArray);

    dayNumbersArray = orderedDays;

    return dayNumbersArray;
  }

  getLocalizedDayNames(locale) {
    let lcl = locale !== undefined ? locale : "en-US";

    let baseDate = new Date(Date.UTC(2020, 0, 6)); //monday
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(baseDate.toLocaleDateString(lcl, { weekday: "long" }));
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekdays;
  }

  getWeekDayNames(weekdayStartIndex) {
    let weekdayNames = [];
    let localizedWeekdayNames = this.getLocalizedDayNames();
    let weekDayNumbers = this.getWeekDayNumbers(weekdayStartIndex);

    for (let i = 0; i < localizedWeekdayNames.length; i++) {
      weekdayNames.push(localizedWeekdayNames[weekDayNumbers[i]]);
    }

    return weekdayNames;
  }

  getTotalDaysInMonth() {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
  }

  getDaysInMonth() {
    const daysInMonth = this.getTotalDaysInMonth();
    let daysObj = [];

    for (let i = 0; i < daysInMonth; i++) {
      daysObj.push({ day: i + 1, isCurrentMonth: true });
    }
    return daysObj;
  }

  getNumberOfWeeksInMonth() {
    // we need to calculate the number of the week so that we can calculate the number of weeks in a month
    return 6;
  }

  getWeekNumber() {
    var date = new Date(this.date.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }
};
