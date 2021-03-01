export default {
  // 管道符
  day: '{n} day | {n} days',

  // 黑盒子
  blackBox: { // 随意取key名，这里是自定义的blackBox
    day: {
      one: '{n} day',
      other: '{n} days'
    },
    setTimeTip: {
      one: 'It hasn\'t been {time} minute yet.',
      other: 'It hasn\'t been {time} minutes yet.'
    }
  }
}