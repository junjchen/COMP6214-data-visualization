import _ from 'lodash'
import * as d3 from 'd3'
import Rx from 'rx'
import EventEmitter from 'events'
import raw from './data'

const emitter = new EventEmitter()

const loadData = group => {

    const sizeThreshold = 200

    const sort = nodes => _.sortBy(nodes, x => {
        if (x.size) 
            return -x.size
        if (x.children) 
            return -_.sum(_.map(x.children, 'size'))
    })

    const combineSmallNodes = nodes => {
        const [bigEnough,
            tooSmall] = _.partition(nodes, x => x.size > sizeThreshold)
        return [
            ...bigEnough, {
                name: 'Others',
                size: _.sum(_.map(tooSmall, 'size'))
            }
        ]
    }

    const tree = {
        name: 'Total',
        children: _(raw)
            .groupBy(group)
            .map((v, k) => ({
                name: k,
                children: _(v)
                    .map(x => ({name: x.invtitle, size: x.lcost, raw: x}))
                    .value()
            }))
            .sortBy(({children}) => _.sum(_.map(children, 'size')))
            .reverse()
            .value()
    }

    const [firstChunk,
        secondChunk] = _.chunk(tree.children, 15)

    const ret = {
        name: 'Total',
        children: [
            ..._.map(firstChunk, x => {
                x.children = combineSmallNodes(x.children)
                return x
            }), {
                name: 'Others',
                children: combineSmallNodes(_.flatMap(secondChunk, 'children'))
            }
        ]
    }

    return ret
}

const factory = (selector, width, height) => {

    // load and convert data
    const data = loadData('aname')
    const root = d3.hierarchy(data)
    root.sum(x => x.size)

    // definitions
    const chartRoot = d3.select(selector + '__chart')
    const entitiesText = d3.select(selector + '__entities')
    const amountText = d3.select(selector + '__amount')

    const radius = (Math.min(width, height) / 2) - 10
    const formatNumber = d3.format('.2');
    const x = d3
        .scaleLinear()
        .range([
            0, 2 * Math.PI
        ]);
    const y = d3
        .scaleSqrt()
        .range([0, radius]);

    const color = d3.scaleOrdinal(d3.schemeCategory20b)
    const partition = d3.partition()
    const arc = d3
        .arc()
        .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
        .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
        .innerRadius(d => Math.max(0, y(d.y0)))
        .outerRadius(d => Math.max(0, y(d.y1)))

    const getAncestors = node => {
        const path = []
        let current = node
        while (current.parent) {
            path.unshift(current);
            current = current.parent
        }
        return path
    }

    // event handlers
    const mouseover = x => {

        emitter.emit('mouseover', x)

        entitiesText.text(x.data.name)
        amountText.text(d3.format(',.2f')(x.value) + ' (' + d3.format('.2%')(x.value / root.value) + ')')

        const sequence = getAncestors(x)
        chartRoot
            .selectAll('path')
            .style('opacity', x => x.depth === 0 || _.includes(sequence, x)
                ? 1
                : 0.3)
    }

    const mouseleave = () => {

        emitter.emit('mouseleave')

        entitiesText.text('')
        amountText.text('')

        chartRoot
            .selectAll('path')
            .on('mouseover', null);

        chartRoot
            .selectAll('path')
            .transition()
            .duration(450)
            .style('opacity', 1)
            .on('end', () => chartRoot.selectAll('path').on('mouseover', mouseover))
    }

    // draw
    const svg = chartRoot
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    const g = svg
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const d = g
        .selectAll('path')
        .data(partition(root).descendants())
        .enter()
        .append('path')
        .attr('d', arc)
        .style('fill', x => x.depth === 0
            ? 'transparent'
            : color((x.children
                ? x
                : x.parent).data.name))
        .on('mouseover', mouseover)

    g.on('mouseleave', mouseleave)

    const mouseoverStream = Rx
        .Observable
        .fromEvent(emitter, 'mouseover')

    const mouseleaveStream = Rx
        .Observable
        .fromEvent(emitter, 'mouseleave')

    return {mouseoverStream, mouseleaveStream}

}

export default factory