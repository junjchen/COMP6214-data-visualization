import _ from 'lodash'
import * as d3 from 'd3'
import Rx from 'rx'
import $ from 'jquery'
import EventEmitter from 'events'
import raw from './data'

// selections
const chartRoot = d3.select('.donut__chart')
const entitiesText = d3.select('.donut__entities')
const amountText = d3.select('.donut__amount')
const $chartExplanation = $('.donut__explanation')

// event streams
const emitter = new EventEmitter()
const eventStreams = {
    mouseover: Rx.Observable.fromEvent(emitter, 'mouseover'),
    mouseleave: Rx.Observable.fromEvent(emitter, 'mouseleave')
}

// util functions
const loadData = (group, prop) => {

    const sort = nodes => _.sortBy(nodes, x => {
        if (x.size)
            return -x.size
        if (x.children)
            return -_.sum(_.map(x.children, 'size'))
    })

    const combineSmallNodes = nodes => {
        const [bigEnough,
            tooSmall
        ] = _.partition(nodes, x => x.size > 100)
        return [
            ...bigEnough, {
                name: `Other ${tooSmall.length}`,
                size: _.sum(_.map(tooSmall, 'size')),
                raws: tooSmall
            }
        ]
    }

    const nodes = _(raw)
        .groupBy(group)
        .map((v, k) => ({
            name: k,
            children: _(v)
                .map(x => ({
                    name: x.invtitle,
                    size: x[prop],
                    raw: x
                }))
                .value()
        }))
        .sortBy(({
            children
        }) => _.sum(_.map(children, 'size')))
        .reverse()
        .value()

    const [firstChunk,
        secondChunk
    ] = _.chunk(nodes, 18)

    const tree = {
        name: 'TOTAL',
        children: [
            ..._.map(firstChunk, x => {
                x.children = combineSmallNodes(x.children)
                return x
            }), {
                name: `Other ${secondChunk.length} Agencies`,
                children: combineSmallNodes(_.flatMap(secondChunk, 'children'))
            }
        ]
    }

    const root = d3.hierarchy(tree)
    root.sum(x => x.size)
    return root
}

const getAncestors = node => {
    const path = []
    let current = node
    while (current.parent) {
        path.unshift(current)
        current = current.parent
    }
    return path
}

// draw
const draw = (group, prop, size) => {
    // clean
    chartRoot.html('')

    const root = loadData(group, prop)

    // definitions
    const radius = (0.8 * size / 2)
    const x = d3
        .scaleLinear()
        .range([
            0, 2 * Math.PI
        ])
    const y = d3
        .scaleSqrt()
        .range([0, radius])
    const colors = d3.scaleOrdinal(d3.schemeCategory20b)
    const color = x => {
        if (x.depth === 0)
            return 'transparent'
        if (x.children) {
            return colors(x.data.name)
        } else {
            return colors(x.parent.data.name)
        }
    }
    const partition = d3.partition()
    const arc = d3
        .arc()
        .startAngle(d => x(d.x0))
        .endAngle(d => x(d.x1))
        .innerRadius(d => y(d.y0))
        .outerRadius(d => y(d.y1))

    // center text box
    const w = 2 * y(0.333) / 1.414
    const offset = (size - w) / 2
    $chartExplanation.css({
        top: offset,
        left: offset,
        width: w,
        height: w
    })

    // draw
    const svg = chartRoot
        .append('svg')
        .attr('width', size)
        .attr('height', size)

    const g = svg
        .append('g')
        .attr('transform', `translate(${size / 2 }, ${size / 2})`)

    const d = g
        .selectAll('path')
        .data(partition(root).descendants())
        .enter()
        .append('path')
        .style('cursor', x => x.depth === 0 ? 'default' : 'pointer')
        .attr('d', arc)
        .style('fill', color)
        .on('mouseover', x => emitter.emit('mouseover', x))

    g.on('mouseleave', () => emitter.emit('mouseleave', root))

    // event handlers
    let disableMouseOver = false // not good, dropin fix
    const defaultEntiesText = root.data.name
    const defaultAmountText = '$' + d3.format(',.2f')(root.value) + 'M'
    entitiesText.text(defaultEntiesText)
    amountText.text(defaultAmountText)
    const onMouseover = x => {
        entitiesText.text(x.data.name)
        amountText.text('$' + d3.format(',.2f')(x.value) + 'M (' + d3.format('.2%')(x.value / root.value) + ')')
        const sequence = getAncestors(x)
        chartRoot
            .selectAll('path')
            .style('opacity', x => x.depth === 0 || _.includes(sequence, x) ?
                1 :
                0.3)
    }
    const onMouseleave = () => {
        entitiesText.text(defaultEntiesText)
        amountText.text(defaultAmountText)
        disableMouseOver = true
        chartRoot
            .selectAll('path')
            .transition()
            .duration(250)
            .style('opacity', 1)
            .on('end', () => disableMouseOver = false)
    }

    eventStreams.mouseover.filter(x => x.depth !== 0).subscribe(onMouseover)
    eventStreams.mouseleave.subscribe(onMouseleave)
}

export {
    draw,
    eventStreams
}