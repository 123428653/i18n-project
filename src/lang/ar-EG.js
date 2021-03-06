export default {
  // 管道符
  day: '{n} أيام | يوم | يومان | {n} يومًا | {n} يوم',

  // 黑盒子
  blackBox: { // 随意取key名，这里是自定义的blackBox
    day: {
      zero: '{n} أيام',
      one: 'يوم', // 数字1是不需要显示阿拉伯文数字
      two: 'يومان', // 数字2是不需要显示阿拉伯文数字
      few: '{n} أيام',
      many: '{n} يومًا',
      other: '{n} يوم'
    },
    setTimeTip: {
      zero: 'لم يمضِ من الوقت {time} دقائق بعد.',
      one: 'لم يمضِ من الوقت دقيقة واحدة بعد.', // 数字1是不需要显示阿拉伯文数字
      two: 'لم يمضِ من الوقت دقيقتين بعد.', // 数字2是不需要显示阿拉伯文数字
      few: 'لم يمضِ من الوقت {time} دقائق بعد.',
      many: 'لم يمضِ من الوقت {time} دقيقة بعد.',
      other: 'لم يمضِ من الوقت {time} دقيقة بعد.'
    }
  }
}