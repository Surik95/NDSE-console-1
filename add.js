#!/usr/bin/env node

const Time = require('./index');
const time = new Time(process, 'add');
console.log(time.time());
