# COMP6214-data-visualization

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
* [ ] Start Date
* [ ] Completion Date (B1)
* [ ] Planned Project Completion Date (B2)
* [ ] Projected/Actual
* [ ] Project Completion Date (B2)
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



