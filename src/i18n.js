// src/i18n.js
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

// 1. 默认语言：中文
export const lang = useStorage('lang', 'zh')

// 2. 切换语言
export function toggleLang() {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
}

// 3. 翻译数据（你所有页面的文字都放这里）
const messages = {
  zh: {
    home: '首页',
    research: '研究方向',
    people: '团队成员',
    publications: '出版物',
    contact: '联系我们',
    joinUs: '加入我们',
    // 你可以无限加
  },
  en: {
    home: 'Home',
    research: 'Research',
    people: 'People',
    publications: 'Publications',
    contact: 'Contact',
    joinUs: 'Join Us',
  }
}

// 4. 自动获取当前语言文字
export const t = computed(() => messages[lang.value])