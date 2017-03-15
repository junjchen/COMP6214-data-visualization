# Report for COMP6214 Open Data Course Work 1

## Cleaning data

1. File format error. CSV file should use CRLF as linebreak signals as it is defined in RFC4180, the given file uses LF only. *Fixed by change all line breaks to CRLF*
2. Unnecessary information removal. Unnecessary header and total rows are found in the given CSV file, which has no value. *Fixed by remove unnecessary rows*
3. Empty rows removal. *Fixed by remove empty rows*
4. Column alignment mismatch. *Fixed by re-align columns to be correct*
5. Invalid field values. In Agency name column's cells exists a lot of typos, use of abbreviations, trailing space, and other different terminology on the same thing. *Fixed by cluster analyzing and clean the data*
6. Duplicated rows. Using ProjectId as the unique identifier to strip out duplicated ones. *Fixed by remove duplicated rows*
7. Data format. The different data format is used, this occurs to number value as well as date value. *Fixed by reformating all value fields*
8. Error row. Ther exists one row says 'Entered by error'. *Fixed by removal*
9. Number scale. Some illogical numbers appears at Lifecycle cost column that can be determined as wrong scale factors by comparing with other data *Fixed by adjust number value to the correct scale*
10. Redundant data, Update Data and Update Time can be merged to represent the same thing. *Fixed by merge Update Time and Update Date*
11. Data can be further enhanced by granting semantic meanings, e.g. Agency names can reconcoled against WIKIDATA to link it to known agencies. So it will be easier to consume the data.

## Visualization

### Demo Link
Link to demo https://junjchen.github.io/monic/

### Audience
The audience of this visualization are people who

#### interested in which agencies majority of the money goes to and its portion
The knowledge can be acquired by looking at the donut chart, to see which agencies occupy the biggest portion of the inner ring.

#### interested in which projects costs the majority of the money and which agency it belongs to
The knowledge can be acquired by looking at the donut chart, to see wich project occupy the biggest portion of the outer ring and the agency it belongs to. 

#### interested in how different costs type's amount impact the portion of the money flow
The knowledfe can be acquired by changing the filter value of the donut chart, which allows using one of lifecycle cost, planned cost, and actual cost. So one can perform a visual comparsion.

#### interested in how a project's actual cost compare with the planned one
The knwoledge can be acuired by looking at the bar chart on the right panel, that shows comparision of amount on differnt cost types.

#### interested in how a project's schedule goes, whether it finishes on time, earlier or delayed
The knowledge can be acuired by lokoing att the timeline bar chart on the right panel, to compare the length of the bar representing estimation and actual project time

### How to host
- Install nodejs and git if haven't
- Clone git repo `git clone https://github.com/junjchen/monic`
- Run command `npm install` in the repo to pull all the dependencies
- Run command `npm start` to start up the development server, then you will be able to visit by going to `localhost:8080/docs`
- To build, run command `npm run build`, which will generate a bundled js file to `./docs` folder

### Opensource libraries used
- D3.js https://github.com/d3/d3
- jQuery https://github.com/jquery/jquery
- Lodash https://github.com/lodash/lodash
- rxjs https://github.com/Reactive-Extensions/RxJS