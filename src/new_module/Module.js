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
}

export default CalendarModule;
