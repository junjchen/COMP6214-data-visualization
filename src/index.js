import _ from 'lodash'
import $ from 'jquery'
import Rx from 'rx'
import donutFactory from './donut'
import {lookupKey} from './data'

const resizeStream = Rx
    .Observable
    .fromEvent(window, 'resize')

const {draw, mouseoverStream, mouseleaveStream} = donutFactory()
draw($('.donut').width())

resizeStream
    .throttle(300)
    .subscribe(() => {
        draw($('.donut').width())
    })