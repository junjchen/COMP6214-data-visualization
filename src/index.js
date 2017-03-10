import _ from 'lodash'
import $ from 'jquery'
import donutFactory from './donut'
import {lookupKey} from './data'

const {mouseoverStream, mouseleaveStream} = donutFactory('.donut', 620, 620)