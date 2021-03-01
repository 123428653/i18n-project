<template>
  <div class="home">
    <h1>你可能不知道国际化的那些事...</h1>
    <select ref="select" @change="change" :value="$getLang()">
      <option value="">选择语言</option>
      <option value="zh-CN">中文</option>
      <option value="en-US">英文</option>
      <option value="ar-EG">阿拉伯语</option>
    </select>
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
    <div>
      <h2>日期国际化</h2>
      <p>默认值：{{defaultDate}}</p>
      <p>中文日期：{{zhDate}}</p>
      <p>英文长日期：{{enLongDate}}</p>
      <p>英文短日期：{{enShortDate}}</p>
      <p>中文长日期：{{zhWeekLong}}</p>
      <p>中文短星期：{{zhWeekShort}}</p>
      <p>中文超短星期：{{zhWeekNarrow}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      defaultDate: new Intl.DateTimeFormat().format(new Date('2021/03/01')),
      zhDate: new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        }).format(new Date('2021/03/01')),
      enLongDate: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        }).format(new Date('2021/03/01')),
      enShortDate: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        }).format(new Date('2021/03/01')),
      zhWeekLong: new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(new Date('2021/03/01')),
      zhWeekShort: new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(new Date('2021/03/01')),
      zhWeekNarrow: new Intl.DateTimeFormat('zh-CN', { weekday: 'narrow' }).format(new Date('2021/03/01')),

    }
  },
  methods: {
    change (e) {
      e.currentTarget.value && localStorage.setItem('lang', e.currentTarget.value)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.left {
  margin-right: 50px;
}
</style>