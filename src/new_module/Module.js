/**
This module is responsible for handling the model to be presented visually
*/
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
    return new Date(this.date);

    //instantiatedDate -> returns new Date(this.date) -> this way mutations made onn the this.instantiatedDate will not affect the this.date
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

  // this function is to be invoked by parent component (calendar.js -> this is the component that retains the state)
  getWeekDayNumbers() {
    let dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    let remainingDays = dayNumbersArray.splice(this.weekStartDay);
    let orderedDays = remainingDays.concat(dayNumbersArray);

    dayNumbersArray = orderedDays;

    return dayNumbersArray;
  }

  // responsible for renderization -> place in CalendarColHeader
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

// responsible for renderization -> place in CalendarColHeader
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
    let currentDate = this.instantiatedDate;

    let theYear = currentDate.getFullYear();
    let theMonth = currentDate.getMonth() + 1;

    let firstDayOfMonth = new Date(theYear, theMonth - 1, 1);
    let lastDayOfMonth = new Date(theYear, theMonth, 0);
    let numDaysInMonth = lastDayOfMonth.getDate();

    let firstWeekDay = (firstDayOfMonth.getDay() - this.weekStartDay + 7) % 7;
    let daysUsedToRender = firstWeekDay + numDaysInMonth;

    return Math.ceil(daysUsedToRender / 7);
  }

  // how can I modify tests for a scenario in which I pass arguments to a function
  // internally?
  // so cool to modify something and have the tests still pass
  getWeekInYear(weekDateParam) {
    const day = weekDateParam !== undefined ? weekDateParam : this.date;
    const MILLISECONDS_IN_WEEK = 604800000;
    const firstDayOfWeek = 0; // sunday as the first day (1 = monday)
    const startOfYear = new Date(day.getFullYear(), 0, 1);
    startOfYear.setDate(
      startOfYear.getDate() + (firstDayOfWeek - (startOfYear.getDay() % 7))
    );
    const dayWeek = Math.round((day - startOfYear) / MILLISECONDS_IN_WEEK) + 1;

    return dayWeek;
  }

  getFirstDayOfWeek(dateParam) {
    let weekDay = dateParam.getDay();
    let dateDifferential = dateParam.getDate() - weekDay;

    return new Date(dateParam.setDate(dateDifferential));
  }

  getMonthObject() {
    let weeksToGenerate = this.getNumberOfWeeksInMonth();
    let monthObject = [];

    let startingDate =
      this.instantiatedDate.getDay() === 0
        ? this.instantiatedDate
        : this.getFirstDayOfWeek(this.instantiatedDate);
    let dayCounter = 0;

    for (
      let numberOfWeeks = 0;
      numberOfWeeks < weeksToGenerate;
      numberOfWeeks++
    ) {
      // the week object
      let week = [];
      for (let daysInWeek = 0; daysInWeek < 7; daysInWeek++) {
        // generate day
        // the startingDate
        let startDate = new Date(startingDate);
        let day = new Date(
          startDate.setDate(
            startDate.getDate() + this.weekStartDay + dayCounter
          )
        );
        week.push({
          currentMonth: day.getMonth() === this.instantiatedDate.getMonth(),
          day: day.getDate(),
          weekday: day.getDay(),
        });
        // update count of days to generate
        dayCounter += 1;
      }
      monthObject.push(week);
    }
    return monthObject;
  }

  // responsible for renderization -> place in CalendarColHeader
  getWeekHeader() {
    return ["S", "M", "T", "W", "T", "F", "S"];
  }
};
