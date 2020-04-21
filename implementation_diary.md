# Calendar

3b2a4b9c7700
1 - move tests specific to month implementation to its own suite; trying to better orgazine the testing structure
2 - change the date instantiation on line 105, in order to get Jan2019 - was getting Oct2019 (done in next commit)

655ae30
3 - Create test table for other months
These tests are calling this function: getTotalDaysInMonth which returns a simple number, regarding the number of days in the month. The getDaysInMonth function will be responsible for returning the day objects. CUrrently, this function is hardcoded for Jan2020. It should hook into the getTotalDaysInMonth, to get the number of days, for which it will need to generate day cells
**The tests in line 96 and 104 could be merged as both functions are somewhat related, but it seems harmful to have the dayCount function be calculated implicitly rather than explicitly.**
ff28c5e
This commit includes the creation of a test battery for retrieval of month objects for a given set of months. It will fail initially. It should be resolved by switching the invoked function, as stated in the previous point.
Actually, I forgot that the test should be compared to an object, as this is whats being expected
Left wondering if there's a better way to generate the testing objects.
89dd6f6
This commit implements a change from the hardcoded value in line 83 of Module.js, to invoking getTotalDaysInMonth

# ToDo:

## monthRepresentation - this object contains the necessary cells to represent a given month, with full weeks, meaning that it should contain the days of the month, as well as the days of the previous and next month, necessary to represent a full week.

(each of the following steps should have at least one test)

### Feature Steps

0. Month Object should have the correct number of weeks(week is an object containing day cells) - week objects can be empty boxes -> representation would be an array with empty objects (the correct number) (test for different number of weeks 4/5/6)
1. Week object should contain cells containing the day and info if they belong to current or prev/next month. (test scenario can be for the complete month object) -> start with an easy month i.e day 1 starts on day 1 -> March is a good candidate (1st March is first day of week)
   Feb with 28 days starting on a Sunday -> good test candidate (da)
   next test -> days at the beginning of month, with days of next month at end (days at end) March
   next test -> days at end of month, with days of previous month at beginnning (days at start)Feb
   next test -> month with both cases -> April

1) Implement graphic representation -> test first -> this means the day grid.

getMonthObject -> refactor into smaller functionality chunks

20200406 - ToDo

- refactor so that we have an object that represents the grid -> along the lines of the header; rather than the calendar being rendered in line the object should be returned from a function.
- Use the Already created Calendar Header

20200413 - ToDo
Add to js files in which we were working, add description of responsibility of said module.

~~Finish Col Header renderization: separate code~~
~~Convert Calendar Body into a Component~~
~~Should Calendar Header be part of Body?~~ makes sense that the col header be part of the calendar body

1. Change starting day of week


20200420
- Homework -> rename classes/modules to more significant names
- Identify and remove unused code
- Attribute more correct naming to testing objects, in order to reflect exactly how the object is supposed to be tested
- Reorganize component structure into own folders (folder=same name as comp, with index.js that exports the component)
- calendarModule.getWeekHeader(): right now returns week day short designation; the conversion from number to representational display, it can reside in the parent component, or in the CalendarColHeader component
- For functionality moved to own modules, move also accompanying tests

- change week start day representation for col header
- Implement nav arrow display and calendar month change on arrow click
- Include more examples for storybook
- Consider next steps and mentoring guidance
