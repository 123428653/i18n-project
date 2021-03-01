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