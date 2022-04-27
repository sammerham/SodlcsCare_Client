const moment = require('moment')
const duration = require('moment-duration-format')

const time = {
  '28800': '08:00',
  '29700': '08:15',
  '30600': '08:30',
  
  
}
var seconds = 3820;
var formatted = moment.duration(29700, 'seconds').format("hh:mm");

console.log(formatted); // 01:03:40

