# 你可能不知道国际化的那些事...

如果您正需要做多国本地化，并且有做阿拉伯语复数的翻译时，这篇文章对您应该特别有用。

本文章主要围绕vue的国际化去说国际化的事，说起国际化第一个想到的肯定是 <code style="color:red">i18n</code> , 在vue中能是使用 <code style="color:red">vue-i18n</code> 库来做本地化的事情，其他框架其实也是一样的道理。

## 概念

什么是国际化？

在应用中，当应用处于某种语言环境下，应用会根据语言使用不同的翻译。（个人理解）

国际化翻译成英文：<code style="color:red">internationalization</code> ，由于单词首尾中包含18个字符，因此 <code style="color:red">i18n</code> 由此得来。




## 复数

在做多国本地化时，语句中出现数字的情况肯定是不少的，而出现数字时都有对应的单位，比如语句中带有：<code style="color:red">1次、5次、1分钟、8分钟、1天、10天</code> 等类似的数字与单位。

如果是英文的情况下以上对应会翻译成：<code style="color:red">1 time、2 times、1 minute、 5 minutes、1 day、10 days</code> ，而翻译提供的可能只是用 <code style="color:red">1 day</code> 这样的翻译，如果数字大于1的话，就不应该用 <code style="color:red">day</code> 这个单词，而是 <code style="color:red">days</code> 。在 <code style="color:red">vue-i18n</code> 中其实已经提供了 <code style="color:red">|</code> 管道符用来处理复数的显示。如下：


```js
// en-US.js
export default {
    day: {n} day | {n} days
}
```

```js
// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en-US'
Vue.use(VueI18n) // 通过插件的形式挂载

const i18n = new VueI18n({
    locale: 'en-US',
    messages: {
      'en-US':  en
    }
})

export default i18n
```

```js
// main.js
import Vue from 'vue'
import i18n from '@/lang/i18n'

new Vue({
  ...
  i18n,
  ...
}).$mount('#app')
```

```html
<!--App.vue-->
<template>
  <div id="app">
    <div>{{$tc('day', n, {n})}}</div>
    <!-- $tc：vue-i18n复数方法 -->
    <!-- 最终会显示：1 day -->
    <!-- 当 n 不为1时，例如：n=100 就会显示 100 days -->
  </div>
</template>

<script>
export default {
    naem: 'APP',
    data () {
        return {
            n: 1
        }
    }
}
</script>
```
由于阿拉伯语排版显示方式是 <code style="color:red">RTL</code> (也就是文字、布局从右往左排版)，在VSCode中的阿拉伯语，如果是使用了<code style="color:red">|</code> 管道符，翻译显示就会错乱，会让你的光标定位特别的蛋疼，想改一个翻译你得非常熟练的了解其规律，除非你懂阿拉伯文，否则改起来就是一团糟。

但是除了用 <code style="color:red">|</code> 管道符外是否还有别的方法来做复数的显示？

答案是有的！！后续揭晓，继续往下看吧...

## 黑盒子一（Intl.NumberFormat）

在工作中当我接到做阿拉伯语翻译任务时，很天真的认为阿拉伯文数字就是我认知里的阿拉伯数字 <code style="color:red">0、1、2、3、4、5、6、7、8、9</code> 然并卵，而是这种长得跟蝌蚪似的玩意 <code style="color:red;font-size:16px">٠١٢٣٤٥٦٧٨٩</code>  是不是很好奇我怎么打这些数字出来的？

答案就是黑盒子：<code style="color:red">[Intl.NumberFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)</code> 是对语言敏感的格式化数字类的构造器类。

用法如下：
```js
// 默认
console.log(new Intl.NumberFormat().format(1234))
// 1,234

// 中文
console.log(new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(123456789))
// 一二三,四五六,八七九

// 英文
console.log(new Intl.NumberFormat('en-US').format(1234))
// 1,234

// 阿拉伯文
console.log(new Intl.NumberFormat('ar-EG').format(1234))
// ١٬٢٣٤
```

如果想了解更多的用法查看MDN文档：<code style="color:red">[Intl.NumberFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)</code> 


## 黑盒子二 （Intl.PluralRules）

<code style="color:red">Intl.PluralRules</code>：
如果理解 <code style="color:red">vue-i18n</code> 复数，该方法其实就可以理解为 <code style="color:red">javascript</code> 的原生复数方法。

用法如下：

中文：任何数字都会返回other
```js

// 在中文里，任何数字都会返回other
new Intl.PluralRules('zh-CN').select(0);
// → 'other'
new Intl.PluralRules('zh-CN').select(1);
// → 'other'
new Intl.PluralRules('zh-CN').select(2);
// → 'other'
new Intl.PluralRules('zh-CN').select(100);
// → 'other'
```

英文：会返回one、other
```js
new Intl.PluralRules('en-US').select(0);
// → 'other'
new Intl.PluralRules('en-US').select(1);
// → 'one'
new Intl.PluralRules('en-US').select(2);
// → 'other'
new Intl.PluralRules('en-US').select(100);
// → 'other'
```

阿拉伯语：会区分数字zero、one、two、few、many、other
```js
new Intl.PluralRules('ar-EG').select(0);
// → 'zero'
new Intl.PluralRules('ar-EG').select(1);
// → 'one'
new Intl.PluralRules('ar-EG').select(2);
// → 'two'
new Intl.PluralRules('ar-EG').select(6);
// → 'few'
new Intl.PluralRules('ar-EG').select(18);
// → 'many'
new Intl.PluralRules('ar-EG').select(100);
// → 'other'
```

如果想了解更多的用法查看MDN文档：<code style="color:red">[Intl.PluralRules](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)</code> 


## 二黑合并谁与争锋

结合上面两黑盒子可以替代 <code style="color:red">|</code> 管道符的方法，如下代码：


中文： 由于```new Intl.PluralRules```接口传什么数字都是始终返回other，所以在黑盒子对象中，只需要写key为ohter就可以了

```js
// zh-CN.js

export default {
  // 管道符
  day: '{n} 天',

  // 黑盒子
  blackBox: {  // 随意取key名，这里是自定义的blackBox
    day: {
      other: '{n} 天'
    },
    setTimeTip: {
      other: '还没达到你设置的{time}分钟哦'
    }
  }
}
```

英文： 由于```new Intl.PluralRules```接口返回对应的类型只有one、other，所以只需要新增key为one、other即可。
```js
// en-US.js

export default {
  // 管道符
  day: '{n} day | {n} days',

  // 黑盒子
  blackBox: {  // 随意取key名，这里是自定义的blackBox
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
```

阿拉伯语： 由于```new Intl.PluralRules```接口返回对应的类型有字zero、one、two、few、many、other，所以只需要新增对应的key即可。

```js
// ar-EG.js 阿拉伯语
export default {
  // 管道符
  day: '{n} أيام | يوم | يومان | {n} يومًا | {n} يوم',
  
  // 黑盒子
  blackBox: {  // 随意取key名，这里是自定义的blackBox
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

```

#### 工具方法（已挂载至vue原型上）

```js
// 获取缓存语言
export const getLang = () => {
  return window.localStorage.getItem('lang') || navigator.language
}

// 返回对应数字的类型
export const PR = n => new Intl.PluralRules(getLang()).select(n)

// 返回对应的数字格式化
export const numFormat = n => new Intl.NumberFormat(getLang()).format(n)
```

```js
// i18n.js

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh-CN'
import en from './en-US'
import ar from './ar-EG'
import {
  getLang,
  PR,
} from '@/utils'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getLang(),
  messages: {
    'zh-CN': zh,
    'en-US': en,
    'ar-EG': ar
  },
  pluralizationRules: {
    'ar-EG' (choice) {
      // 自定义阿拉伯语管道符返回索引
      const type = PR(choice)
      const o = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'few': 0,
        'many': 3,
        'other': 4
      }
      return o[type]
    }
  }
})

export default i18n
```

#### 使用
```html
<template>
  <div class="home">
    <div class="flex">
      <div class="left">
        <h2>管道符</h2>
        <p>{{$tc('day', 0, {n: $numFormat(0)})}}</p>
        <p>{{$tc('day', 1, {n: $numFormat(1)})}}</p>
        <p>{{$tc('day', 2, {n: $numFormat(2)})}}</p>
        <p>{{$tc('day', 3, {n: $numFormat(3)})}}</p>
        <p>{{$tc('day', 18, {n: $numFormat(18)})}}</p>
        <p>{{$tc('day', 100, {n: $numFormat(100)})}}</p>
      </div>
      <div>
        <h2>二黑盒子结合</h2>
        <p>{{$t(`blackBox.setTimeTip.${$PR(0)}`, {time: $numFormat(0)})}}</p>
        <p>{{$t(`blackBox.setTimeTip.${$PR(1)}`, {time: $numFormat(1)})}}</p>
        <p>{{$t(`blackBox.setTimeTip.${$PR(2)}`, {time: $numFormat(2)})}}</p>
        <p>{{$t(`blackBox.setTimeTip.${$PR(3)}`, {time: $numFormat(3)})}}</p>
        <p>{{$t(`blackBox.setTimeTip.${$PR(18)}`, {time: $numFormat(18)})}}</p>
        <p>{{$t(`blackBox.setTimeTip.${$PR(100)}`, {time: $numFormat(100)})}}</p>
      </div>
    </div>
  </div>
</template>
```

## 国际化日期格式 （黑盒子三：Intl.DateTimeFormat）
国际化中肯定少不了日期的本地化，各个国家有各个国家的(<code style="color:red">~~国旗~~</code>)日期。


日期国际化也是有黑盒子的：<code style="color:red">[Intl.DateTimeFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)</code>，
用法如下：

```js
// 默认值
console.log(new Intl.DateTimeFormat().format(new Date('2021/03/01')));
// 2021/3/1

// 中文日期
new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date('2021/03/01'))
// 2021年3月1日

// 英文
// 长日期
new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date('2021/03/01'))
// March 1, 2021

// 短日期
new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date('2021/03/01'))
// Mar 1, 2021

// 只显示中文长星期
new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(new Date('2021/03/01'))
// 星期一


// 只显示中文短星期
new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(new Date('2021/03/01'))
// 周一


// 只显示中文超短星期
new Intl.DateTimeFormat('zh-CN', { weekday: 'narrow' }).format(new Date('2021/03/01'))
// 一

```
还有各种五花八门的显示方式，可以进行查询MDN文档：<code style="color:red">[Intl.DateTimeFormat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)</code> 

## End
最后献上demo地址：[https://github.com/123428653/i18n-project](https://github.com/123428653/i18n-project)

#### 安装依赖
```
yarn install
```

### 启动本地项目
```
yarn serve
```

### 打包
```
yarn build
```
