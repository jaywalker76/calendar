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
    const firstDayInMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() - 1,
      1
    );
    const lastDayInMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    );

    const dayCount = firstDayInMonth.getDay() + lastDayInMonth.getDate();

    return Math.ceil(dayCount / 7);
  }

  getMonthObject() {
    let weeksToGenerate = this.getNumberOfWeeksInMonth();
    let numberOfDaysInMonth = this.getTotalDaysInMonth();
    let startingDay = this.date;
    let dayCounter = 0;
    //1 - get number of weeks in month

    //2 - populate weeks with day cells
    //3 - populate day cells with day info
    //4 - assumes that weeks start on sunday
    // let week = new Array(7).fill({""});

    let monthObject = [...new Array(weeksToGenerate)].map((el, index) =>
      [...new Array(7)].map((el, idx) => ({
        day: startingDay.getDate(),
        weekday: idx,
        stuff: new Date(
          startingDay.setDate(startingDay.getDate() + dayCounter)
        ).getDate(),
        counter: (dayCounter += 1)
      }))
    );
    // get number of weeks to generate
    // populate each week with day cell
    // populate day cell
    return monthObject;
  }
};
