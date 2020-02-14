class CalendarModule {
  constructor(date) {
    this.date = date;
  }
  // Getter
  get dateString() {
    return this.generateDateString();
  }
  // Method
  generateDateString() {}
}

export default CalendarModule;
