# COMP6214-data-visualization

## Memo

* It looks like Project ID is universally unique

## TODOs

* [x] Unique Investment Identifier
* [x] Business Case ID
* [x] Agency Code
* [x] Agency Name
* [x] Investment Title
* [x] Project ID
* [x] Agency Project ID
* [x] Project Name
* [x] Project Description
* [x] Start Date
* [x] Completion Date (B1)
* [x] Planned Project Completion (B2)
* [x] Projected/Actual Project Completion Date (B2)
* [ ] Lifecycle Cost
* [ ] Schedule Variance (in days)
* [ ] Schedule Variance (%)
* [ ] Cost Variance ($ M)
* [ ] Cost Variance (%)
* [ ] Planned Cost ($ M)
* [ ] Projected/Actual Cost ($ M)
* [ ] Updated Date
* [ ] Updated Time
* [ ] Unique Project ID	
* [ ] Others

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
* Edit column 642, 643, 1864, 1865, 1866, 1867, removed the original Project Name, and realign the other columns
* Numbers in Lifecycle Cost column cells have ($m) appended
* One row says "Entered in error", hence removed
* Some numbers in Lifecyle are in a wrong scale (should be millions)
* Merge Update Time to Update Date, and remove Update Time column since it is redundant
