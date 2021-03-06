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
  get instantiatedDate(){
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
    return new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  }

  getDaysInMonth() {
    // testing for January
    const daysInMonth = 31;
    let daysObj = [];

    for (let i = 0; i < daysInMonth; i++) {
      daysObj.push({ day: i + 1, isCurrentMonth: true });
    }
    return daysObj;
  }

  getWeekObject(){
    let weekRepresentation = this.getWeekDayNumbers().map(i => ({"weekDay":i}) );

    return weekRepresentation;
  }

  getWeekNumber(dateParam){
    const date = dateParam || this.date;
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(this.date.getFullYear(), 0, 4);
    
    return  1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
  

  getWeeksInMonth(){
   const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
   const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

   const startWeekNumber = this.getWeekNumber(firstDay)
   const endWeekNumber = this.getWeekNumber(lastDay)


    return endWeekNumber - (startWeekNumber === 1 ? 0 : startWeekNumber);
  }

  getMonthObject(){

    let weeksInMonth = this.getWeeksInMonth();
    let daysInMonth = this.getDaysInMonth();
    
    let monthRepresentation = [];

    while (weeksInMonth--) {
      let weekRepresentation = [];
      let daysInWeek = 7;
      while(daysInWeek-- && daysInMonth.length > 0){
        weekRepresentation.push(daysInMonth.shift())
      }
      monthRepresentation.push(weekRepresentation);
    }
    return monthRepresentation

  }  

};
