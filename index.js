const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const moment = require('moment');

module.exports = class Time {
  constructor(process, change) {
    this.process = process;
    this.change = change;
  }

  time() {
    const argv = this.argv();
    const period = this.period(argv);
    if (isNaN(Number(argv._[0])) && this.change) {
      console.log('Передан неверный параметр!');
      return;
    }
    if (argv._.length !== 0) {
      return this.changeTime(argv._[0], period);
    } else {
      return this.formatTime(moment(), period.format);
    }
  }
  changeTime(quantity, { period, format }) {
    quantity = this.change === 'add' ? +quantity : -quantity;

    return this.formatTime(moment().add(quantity, period), format);
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
    } else {
      return {
        period: 'year',
        format: 'YYYY',
      };
    }
  }

  argv() {
    const argv = yargs(hideBin(this.process.argv))
      .option('year', {
        alias: 'y',
        type: 'boolean',
        description: 'отображение года',
        default: false,
      })
      .option('month', {
        alias: 'm',
        type: 'boolean',
        description: 'отображение месяца',
        default: false,
      })
      .option('day', {
        alias: 'd',
        type: 'boolean',
        description: 'отображение даты в календарном месяце',
        default: false,
      }).argv;
    return argv;
  }
};
