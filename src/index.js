import _ from 'lodash'
import $ from 'jquery'
import Rx from 'rx'
import {draw, mouseoverStream, mouseleaveStream} from './donut'
import {lookupKey} from './data'

const resizeStream = Rx
    .Observable
    .fromEvent(window, 'resize')

const redrawDonut = () => draw(Math.min(960, Math.max(600, $('.donut').width())))

resizeStream
    .throttle(300)
    .subscribe(redrawDonut)

// initial draw
redrawDonut()