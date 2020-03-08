/**
 *
 * Presentational Code
 */
const getMonthString = date => {
  return date.toLocaleString("default", { month: "long" });
};

const getYear = date => {
  return date.toLocaleString("default", { year: "numeric" });
};

const getMonthYearString = dateParam => {
  const dateValue = dateValidator(dateParam);
  return getMonthString(dateValue) + " " + getYear(dateValue);
};

const getDayName = (dateParam, dayDescriptorType, locale) => {
  const dayDescType =
    dayDescriptorType !== undefined ? dayDescriptorType : "long";
  const date = new Date(dateParam);
  return date.toLocaleDateString(locale, { weekday: dayDescType });
};

/**
 *
 * Business Logic Code
 */

const getNumberOfDaysInMonth = dateParam => {
  const dateValue = dateValidator(dateParam);

  return new Date(
    dateValue.getFullYear(),
    dateValue.getMonth() + 1,
    0
  ).getDate();
};

const dateValidator = dateParam => {
  const dateValue = dateParam !== undefined ? new Date(dateParam) : new Date();

  return dateValue;
};

const addDaysToDate = (date, daysToAdd) => {
  let result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};

const getLastDayInMonth = dateParam => {
  let nextMonth = new Date(dateParam.setMonth(dateParam.getMonth() + 1));
  return new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
};

const getIsoWeek = dateParam => {
  let date = new Date(dateParam.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

  let week1 = new Date(date.getFullYear(), 0, 4);

  let weekNumber =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );

  let weekYear = dateParam.getFullYear();

  return {
    week: weekNumber,
    year: weekYear
  };
};

const getWeekDifferential = (lastWeek, firstWeek) => {
  if (lastWeek.year === firstWeek.year) {
    return lastWeek.week - firstWeek.week + 1;
  } else if (lastWeek.year > firstWeek.year) {
    return 52 + lastWeek.week - firstWeek.week + 1;
  } else {
    throw Error("Incorrect date params");
  }
};

const updateDateValue = (direction, date) => {
  debugger;
  let newDate;
  if (direction === "left") {
    newDate = new Date(date.setMonth(date.getMonth() - 1));
  } else {
    newDate = new Date(date.setMonth(date.getMonth() + 1));
  }
  return newDate;
};

export {
  getMonthYearString,
  getDayName,
  getNumberOfDaysInMonth,
  addDaysToDate,
  getLastDayInMonth,
  getIsoWeek,
  getWeekDifferential,
  updateDateValue
};
