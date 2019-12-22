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
}

const getNumberOfDaysInMonth = (dateParam) => {
  const dateValue = dateValidator(dateParam);

  return new Date(dateValue.getFullYear(), dateValue.getMonth()+1, 0).getDate();
}

const dateValidator = (dateParam) => {
  const dateValue = dateParam !== undefined ? new Date(dateParam) : new Date();

  return dateValue;
}



export { getMonthYearString, getDayName, getNumberOfDaysInMonth };
