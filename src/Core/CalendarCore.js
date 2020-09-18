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
    const dayOfWeek = dateParam.getDay();
    let firstDayOfWeek = new Date(dateParam);
    let diff =
      dayOfWeek >= this.weekStartDay
        ? dayOfWeek - this.weekStartDay
        : 6 - dayOfWeek;

    firstDayOfWeek.setDate(dateParam.getDate() - diff);
    firstDayOfWeek.setHours(0, 0, 0, 0);
    return firstDayOfWeek;
  }

  getMonthObject() {
    let weeksToGenerate = this.getNumberOfWeeksInMonth();
    let monthObject = [];

    let startingDate = this.getFirstDayOfWeek(this.instantiatedDate);
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
        let day = new Date(startDate.setDate(startDate.getDate() + dayCounter));
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
};
