class CalendarModule {
  constructor(date) {
    this.date = date;
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
