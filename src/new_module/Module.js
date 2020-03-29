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
    let currentDate = this.instantiatedDate;

    const lastDayInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    return Math.ceil(lastDayInMonth / 7);
  }

  getMonthObject() {
    let weeksToGenerate = this.getNumberOfWeeksInMonth();

    let monthObject = [];
    let startingDate = this.instantiatedDate;

    startingDate =
      startingDate.getDay() === 0
        ? startingDate
        : new Date(
            startingDate.setDate(startingDate.getDate() - startingDate.getDay())
          );

    let dayCounter = startingDate.getDate() === 1 ? 1 : startingDate.getDate();

    // for first day in month determine if it falls on sunday
    // if not subtract index days from date
    let isCurrentMonth = this.instantiatedDate === startingDate.getMonth();

    for (
      let numberOfWeeks = 0;
      numberOfWeeks < weeksToGenerate;
      numberOfWeeks++
    ) {
      let week = [];

      for (let daysInWeek = 0; daysInWeek < 7; daysInWeek++) {
        let currentDate = new Date(
          startingDate.getFullYear(),
          startingDate.getMonth(),
          dayCounter
        );
        let presentDay = currentDate.getDate();
        let presentMonth = currentDate.getMonth();

        if (presentMonth !== startingDate.getMonth()) {
          isCurrentMonth = presentMonth !== startingDate.getMonth();
          // increase month and restart counter
          dayCounter = 1;
          currentDate = new Date(
            startingDate.getFullYear(),
            startingDate.getMonth() + 1,
            dayCounter
          ).getDate();
        }

        week.push({
          day: presentDay,
          weekday: daysInWeek,
          currentMonth: isCurrentMonth
        });

        dayCounter += 1;
      }
      monthObject.push(week);
    }

    // get number of weeks to generate
    // populate each week with day cell
    // populate day cell
    return monthObject;
  }
};
