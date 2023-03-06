#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const moment = require('moment');

class Time {
  constructor(process) {
    this.process = process;
  }

  time() {
    const argv = this.argv();
    const period = this.period(argv);
    if ((argv._[1] && isNaN(Number(argv._[1]))) || !argv._[0]) {
      return 'Передан неверный параметр!';
    } else if (argv._[1]) {
      return this.changeTime(argv._, period);
    } else {
      return this.formatTime(moment(), period.format);
    }
  }

  changeTime(arr, { period, format }) {
    return arr[0] === 'add'
      ? this.formatTime(moment().add(+arr[1], period), format)
      : this.formatTime(moment().add(-arr[1], period), format);
  }

  formatTime(time, format) {
    return time.format(format);
  }

  period(argv) {
    if (argv.month) {
      return {
        period: 'month',
        format: 'MMMM',
      };
    } else if (argv.day) {
      return {
        period: 'day',
        format: 'DD',
      };
    } else if (argv.year) {
      return {
        period: 'year',
        format: 'YYYY',
      };
    } else {
      return {
        period: '',
        format: '',
      };
    }
  }

  argv() {
    const argv = yargs(hideBin(this.process.argv)).options({
      year: {
        alias: 'y',
        type: 'boolean',
        description: 'отображение года',
        default: false,
      },
      month: {
        alias: 'm',
        type: 'boolean',
        description: 'отображение месяца',
        default: false,
      },
      day: {
        alias: 'd',
        type: 'boolean',
        description: 'отображение даты в календарном месяце',
        default: false,
      },
    }).argv;
    return argv;
  }
}

const time = new Time(process);
console.log(time.time());
