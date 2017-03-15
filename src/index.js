import _ from 'lodash'
import $ from 'jquery'
import Rx from 'rx'
import {
    draw as drawDonut,
    eventStreams
} from './donut'
import {
    draw as drawBars
} from './bar'
import data, {
    lookupKey
} from './data'


const redrawDonut = prop => drawDonut('aname', prop, Math.min(650, Math.max(550, $('main').width())))
const $filter = $('.prop_filter')
const filterChange = Rx.Observable.fromEvent($filter, 'change')
filterChange.subscribe(x => {
    redrawDonut(x.target.value)
})

// initial draw
redrawDonut('lcost')

// draw bar chart
const global = _.reduce(data, (ret, x) => ({
    lcost: ret.lcost + x.lcost,
    projcost: ret.projcost + x.projcost,
    plancost: ret.plancost + x.plancost
}), {
    lcost: 0,
    projcost: 0,
    plancost: 0
})

eventStreams.mouseleave.subscribe(() => {
    drawBars(global, 500, 150)
    $('.name').text(`Total ${data.length} Investments`)
    $('.id').text('')
})

eventStreams.mouseover.subscribe(x => {
    const aggregate = raws => _.reduce(raws, (ret, x) => ({
        lcost: ret.lcost + x.raw.lcost,
        projcost: ret.projcost + x.raw.projcost,
        plancost: ret.plancost + x.raw.plancost
    }), {
        lcost: 0,
        projcost: 0,
        plancost: 0
    })

    if (x.depth === 0) {
        drawBars(global, 500, 150)
        $('.name').text(`Total ${data.length} Investments`)
        $('.id').text('')
        return
    }

    if (x.data.raw) {
        const {
            invtitle,
            uinvid
        } = x.data.raw
        drawBars(x.data.raw, 500, 150)
        $('.name').text(`${invtitle}`)
        $('.id').text(`${uinvid}`)
    } else if (x.data.raws) {
        drawBars(aggregate(x.data.raws), 500, 150)
        $('.name').text(`Other ${x.data.raws.length} Investments`)
        $('.id').text('')
    } else {
        const aggregated = _.reduce(x.children, (ret, x) => {
            if (x.data.raw) {
                return {
                    count: ret.count + 1,
                    lcost: ret.lcost + x.data.raw.lcost,
                    projcost: ret.projcost + x.data.raw.projcost,
                    plancost: ret.plancost + x.data.raw.plancost
                }
            } else {
                const a = aggregate(x.data.raws)
                return {
                    count: ret.count + x.data.raws.length,
                    lcost: ret.lcost + a.lcost,
                    projcost: ret.projcost + a.projcost,
                    plancost: ret.plancost + a.plancost
                }
            }
        }, {
            count: 0,
            lcost: 0,
            projcost: 0,
            plancost: 0
        })
        drawBars(aggregated, 500, 150)
        $('.name').text(`${aggregated.count} investments in ${x.data.name}`)
        $('.id').text('')
    }
})