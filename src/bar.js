import _ from 'lodash'
import * as d3 from 'd3'
import {
    lookupKey
} from './data'

const chartRoot = d3.select('.bar')
//const draw = (data, width, height) => {
const draw = (raw, width, height) => {
    // clean
    chartRoot.html('')

    const chartWidth = width - 100

    const data = _.mapKeys(_.pick(raw, ['lcost', 'projcost', 'plancost']), (v, k) => lookupKey(k))
    const x = d3.scaleLinear().range([0, chartWidth]).domain([0, d3.max(_.values(data))])
    const y = d3.scaleBand().range([height, 0]).domain(_.keys(data)).padding(0.5)
    const colors = d3.scaleOrdinal(d3.schemeCategory20b)

    const svg = chartRoot
        .append('svg')
        .attr('width', chartWidth)
        .attr('height', height)

    const g = svg.append('g')
        .attr('transform', 'translate(100, 0)')

    g.append('g')
        .call(d3.axisLeft(y))

    const bar = g.append('g')
        .selectAll('g')
        .data(_.map(data, (v, k) => ({
            name: k,
            val: v
        })))
        .enter()
        .append('g')

    bar.append('rect')
        .attr('width', ({
            val
        }) => x(val))
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('y', ({
            name
        }) => y(name))
        .style('fill', ({
            name
        }) => colors(name))

    bar.append('text')
        .attr('transform', (({
            val,
            name
        }) => `translate(${x(val) + 5},${y(name) + y.bandwidth() * 0.75})`))
        .text(({
            val
        }) => `$${d3.format(',.2f')(val)}M`)
}

export {
    draw
}