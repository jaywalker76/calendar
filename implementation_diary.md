# Calendar

3b2a4b9c7700
1 - move tests specific to month implementation to its own suite; trying to better orgazine the testing structure
2 - change the date instantiation on line 105, in order to get Jan2019 - was getting Oct2019 (done in next commit)

655ae30
3 - Create test table for other months
These tests are calling this function: getTotalDaysInMonth which returns a simple number, regarding the number of days in the month. The getDaysInMonth function will be responsible for returning the day objects. CUrrently, this function is hardcoded for Jan2020. It should hook into the getTotalDaysInMonth, to get the number of days, for which it will need to generate day cells
**The tests in line 96 and 104 could be merged as both functions are somewhat related, but it seems harmful to have the dayCount function be calculated implicitly rather than explicitly.**
