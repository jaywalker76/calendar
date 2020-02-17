module.exports = class CalendarModule {
  constructor(date) {
    if (date !== undefined) {
      this.date = date;
    } else {
      this.date = new Date();
    }
  }
  // Getter
  get dateString() {
    return this.generateDateString();
  }
  // Method
  generateDateString() {
    const dateObj = new Date(this.date);
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
};

//export default CalendarModule;
