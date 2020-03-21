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

## 21Mar2020

- Implement week Id for current day
  - currently getting an error for week calculation,
- Implement Tests for Increasing and Decreasing current month
- Currently getting a week number mismatch. Will have to revisit this
