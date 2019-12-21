const getMonthString = date => {
  return date.toLocaleString("default", { month: "long" });
};

const getYear = date => {
  return date.toLocaleString("default", { year: "numeric" });
};

const getMonthYearString = date => {
  const dateValue = date !== undefined ? new Date(date) : new Date();
  return getMonthString(dateValue) + " " + getYear(dateValue);
};

function getDayName(dateStr, locale) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export { getMonthYearString };
