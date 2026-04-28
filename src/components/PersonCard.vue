<template>
  <div class="person-card">
    <!-- 圆形头像 -->
    <div class="avatar-wrapper">
      <img :src="avatar" :alt="name" class="avatar" />
    </div>

    <!-- 姓名 + 职位 -->
    <h2 class="name">{{ name }}</h2>
    <p class="title">{{ title }}</p>

    <!-- 社交图标 -->
    <div class="social-links">
      <a v-if="email" :href="`mailto:${email}`" class="social-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
      <a v-if="linkedin" :href="linkedin" target="_blank" class="social-icon linkedin">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
    </div>

    <!-- 简介 -->
    <p class="bio">{{ bio }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, default: '研究员' },
  bio: { type: String, required: true },
  email: { type: String, default: '' },
  linkedin: { type: String, default: '' }
})
</script>

<style scoped>
.person-card {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  font-family: inherit;
}

/* 修复头像容器：去掉多余的蓝色背景，避免遮挡 */
.avatar-wrapper {
  width: 180px;
  height: 180px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  /* 去掉蓝色背景，只在图片加载失败时才显示 */
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 先去掉灰度滤镜，确保彩色头像正常显示 */
  /* filter: grayscale(100%); */
}

.name {
  font-size: 38px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #1a1a1a;
}

.title {
  font-size: 28px;
  color: #666;
  margin: 0 0 20px;
  font-weight: 500;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;

}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.social-icon.linkedin {
  background: #0077b5;
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.bio {
  font-size: 26px;
  line-height: 1.8;
  color: #333;
  text-align: left;
  margin: 0;
}
</style>