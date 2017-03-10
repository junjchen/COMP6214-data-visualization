import _ from 'lodash'
import data from './d.csv'

const dict = {
    'Agency Code': 'acode',
    'Agency Name': 'aname',
    'Agency Project ID': 'aprojid',
    'Business Case ID': 'bcaseid',
    'Completion Date (B1)': 'compdate',
    'Cost Variance ($ M)': 'costvar',
    'Cost Variance (%)': 'costvarp',
    'Investment Title': 'invtitle',
    'Lifecycle Cost': 'lcost',
    'Planned Cost ($ M)': 'plancost',
    'Planned Project Completion Date (B2)': 'plancompdate',
    'Project Description': 'projdesc',
    'Project ID': 'projid',
    'Project Name': 'projname',
    'Projected/Actual Cost ($ M)': 'projcost',
    'Projected/Actual Project Completion Date (B2)': 'projcompdate',
    'Schedule Variance (%)': 'schvarp',
    'Schedule Variance (in days)': 'schvar',
    'Start Date': 'startdate',
    'Unique Investment Identifier': 'uinvid',
    'Unique Project ID': 'uprojid',
    'Updated Date': 'updated'
}

const datatypes = {
    compdate: 'date',
    costvar: 'number',
    costvarp: 'number',
    lcost: 'number',
    plancost: 'number',
    plancompdate: 'date',
    projcost: 'number',
    projcompdate: 'date',
    schvarp: 'number',
    schvar: 'number',
    startdate: 'date',
    updated: 'date'
}

const normalize = (res, value, key) => {
    key = dict[key] || key
    if (datatypes[key] === 'number') {
        value = _.round(+ value, 2)
    } else if (datatypes[key] === 'date') {
        value = new Date(value)
    }
    res[key] = value
    return res
}

const result = data.map(x => _.reduce(x, normalize, {}))

export default result

export const lookupKey = _.invert(dict)