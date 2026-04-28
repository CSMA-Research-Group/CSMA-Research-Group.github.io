<template>
  <div class="navbar-container">
    <div class="navbar-brand" @click="goToHome">
      <span class="navbar-name">CSMA Research Group</span>
    </div>

    <div class="menu-wrapper">
      <el-menu
        mode="horizontal"
        class="navbar-menu"
        @select="handleMenuSelect"
        :default-active="$route.path"
        :ellipsis="false"
      >
        <el-menu-item index="/highlights">
          <span v-show="!isEnglish">研究亮点</span>
          <span v-show="isEnglish">Highlights</span>
        </el-menu-item>
        <el-menu-item index="/people">
          <span v-show="!isEnglish">人物</span>
          <span v-show="isEnglish">People</span>
        </el-menu-item>
        <el-menu-item index="/publications">
          <span v-show="!isEnglish">出版物</span>
          <span v-show="isEnglish">Publications</span>
        </el-menu-item>
        <el-menu-item index="/seminars">
          <span v-show="!isEnglish">研讨会</span>
          <span v-show="isEnglish">Seminars</span>
        </el-menu-item>
        <el-menu-item index="/positions">
          <span v-show="!isEnglish">职位</span>
          <span v-show="isEnglish">Positions</span>
        </el-menu-item>
        <el-menu-item index="/gallery">
          <span v-show="!isEnglish">画廊</span>
          <span v-show="isEnglish">Gallery</span>
        </el-menu-item>
        <el-menu-item index="/contact">
          <span v-show="!isEnglish">联系方式</span>
          <span v-show="isEnglish">Contact</span>
        </el-menu-item>
      </el-menu>

      <div class="lang-item" @click="toggleLang">
        {{ isEnglish ? '中文' : 'English' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const handleMenuSelect = (index) => router.push(index)
const goToHome = () => router.push('/')

// 👇 只在组件内部使用，不导出！
const isEnglish = ref(localStorage.getItem('lang') === 'en')
const toggleLang = () => {
  localStorage.setItem('lang', isEnglish.value ? 'zh' : 'en')
  window.location.reload() // 刷新页面，所有页面同步生效
}
</script>

<style scoped>
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
  background: transparent !important;
  height: 90px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.navbar-name {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff !important;
  letter-spacing: 0.8px;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
}

.menu-wrapper {
  display: flex;
  align-items: center;
}

.navbar-menu {
  background: transparent !important;
  border: none !important;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.navbar-menu :deep(.el-menu-item) {
  color: #ffffff !important;
  font-weight: 500;
  font-size: 18px;
  height: 90px !important;
  line-height: 90px !important;
  border-bottom: 2.5px solid transparent;
  background: transparent !important;
  transition: all 0.3s ease;
  padding: 0 20px !important;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
}

.navbar-menu :deep(.el-menu-item:hover),
.navbar-menu :deep(.el-menu-item.is-active) {
  color: #409eff !important;
  border-bottom: 2.5px solid #409eff !important;
  background: transparent !important;
}

.lang-item {
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  cursor: pointer;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.lang-item:hover {
  color: #409eff;
}
</style>