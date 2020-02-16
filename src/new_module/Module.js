class CalendarModule {
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

  getWeekDayNumbers() {
    return [0, 1, 2, 3, 4, 5, 6];
  }

  getWeekDayNames() {
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
  }
}

export default CalendarModule;
