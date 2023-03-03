#!/usr/bin/env node

const Time = require('./index');
const time = new Time(process);
console.log(time.time());
