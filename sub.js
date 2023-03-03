#!/usr/bin/env node

const Time = require('./index');
const time = new Time(process, 'sub');
console.log(time.time());
