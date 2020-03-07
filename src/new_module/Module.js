module.exports = class CalendarModule {
  /**
   * 
   * @param date - string in format MM/DD/YYYY
   * 
   */
  
  // accept string in a given format and convert it to date
  constructor(date) {
    this.date = date === undefined ? new Date() : new Date(date);
  }

  // Getter
  get dateString() {
    return this.generateDateString();
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

  getWeekDayNumbers(startIndex) {
    let dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    if (startIndex !== undefined) {
      let remainingDays = dayNumbersArray.splice(startIndex);
      let orderedDays = remainingDays.concat(dayNumbersArray);

      dayNumbersArray = orderedDays;
    }

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
    return new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  }

  getDaysInMonth() {
    // testing for January
    const daysInMonth = 31;
    let daysObj = [];

    for (let i = 0; i < daysInMonth; i++) {
      daysObj.push({ day: i + 1, month: 1 });
    }
    return daysObj;
  }
};
