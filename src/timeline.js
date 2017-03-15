import * as d3 from 'd3'
import _ from 'lodash'
import {
    lookupKey
} from './data'

const chartRoot = d3.select('.timeline__chart')

const draw = (raw, width, height) => {
    // clean
    chartRoot.html('')

    if (!raw)
        return

    const {
        compdate,
        startdate,
        plancompdate,
        projcompdate
    } = raw
    const enddate = _.reduce([compdate, plancompdate, projcompdate], (ret, x) => {
        if (!ret)
            return x
        if (ret !== undefined && x !== undefined)
            return ret.getTime() < x.getTime() ? x : ret
        return ret
    }, undefined)
    const x = d3.scaleTime().domain([startdate, enddate]).range([0, width])

    const xaxis = d3.axisTop().scale(x).ticks(4)

    const data = [{
            name: lookupKey('projcompdate'),
            val: projcompdate
        },
        {
            name: lookupKey('plancompdate'),
            val: plancompdate
        },
        {
            name: lookupKey('compdate'),
            val: compdate
        }
    ]

    const y = d3.scaleBand().domain(_.map(data, 'name')).range([height, 0]).padding(0.9)
    const colors = d3.scaleOrdinal(d3.schemeCategory20b)

    const svg = chartRoot.append('svg').attr('width', width).attr('height', height)

    const g = svg.append('g')

    g.append('g').call(xaxis)

    const stdDate = g.append('g').attr('transform', 'translate(0, -48)')

    stdDate.append('text')
        .text('Project Start Date')
    stdDate.append('text')
        .attr('transform', 'translate(0, 16)')
        .attr('class', 'date')
        .text(d3.timeFormat('%b %e, %Y')(startdate))

    const bar = g.append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .classed('hide', ({
            val
        }) => val === undefined)

    bar.append('rect')
        .attr('width', ({
            val
        }) => val ? x(val) : 0)
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('y', ({
            name
        }) => y(name))
        .style('fill', ({
            name
        }) => colors(name))

    const texts = bar.append('g')
        .attr('transform', ({
            name
        }) => `translate(0, ${y(name) - y.bandwidth() -  15})`)

    texts.append('text')
        .text(({
            name
        }) => name)

    texts.append('text')
        .attr('transform', 'translate(0, 16)')
        .attr('class', 'date')
        .text(({
            val
        }) => val && d3.timeFormat('%b %e, %Y')(val))
}

export {
    draw
}