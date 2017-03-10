# COMP6214 - Open Data Innovation coursework

## Notes

* It looks like Project ID is universally unique

## Visualization ideas

* Ring chart illustrates investment amnout (Lifecycle cost, planned cost, projected cost) on different agencies / titles 
* Filter the ring chart by agency / title
* When one investment is selected, show investment details (yet to be decided how to illustrate)

## Problems and fix

* Changed linebreaks from LF to CRLF, to compile with CSV definition (RFC 4180)
* Remove header (disclaimer)
* Align mismatched columns
* Remove empty rows (*17 rows*)
* Remove the "Total" rows (*26 rows*)
* Merge clustered cells in column "Agency Name" (trailing space, typos, different terminologies, ambiguous determined by "Agency Code")
* Merge one cluster in column "Investment Title" (adds commas to its name)
* Remove rows that has same Project ID and other fields (by visual check) (*4 rows*)
* Merge cuslters in column "Agency Project ID", "Project Name", "Project Description" (trailing space, different symbols, typos) 
* Reconcile agency names against WIKIDATA
* Different number types in ProjectID column(xxxx v.s. x,xxx), transfer cells in that column to number
* Edit column 642, 643, 1864, 1865, 1866, 1867, removed the original Project Name, and realign the other columns -- well, column index does not mean anything ....
* Numbers in Lifecycle Cost column cells have ($m) appended
* One row says "Entered in error", hence removed
* Some numbers in Lifecyle are in a wrong scale (should be millions)
* Merge Update Time to Update Date, and remove Update Time column since it is redundant
* Wrong data, 2012 support service maint_12A has start data in 2011
* Fill in missing data based on empirical predictor
