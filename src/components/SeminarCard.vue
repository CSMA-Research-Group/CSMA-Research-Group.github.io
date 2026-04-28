<template>
  <el-card class="seminar-card" shadow="hover">
    <!-- 1. 会议图片区：全新自适应宽高，完美适配实拍图，不再拉伸压扁 -->
    <div class="seminar-img-box">
      <!-- 支持传真实图片src，不传就用深蓝纯色占位 -->
      <img v-if="imgSrc" :src="imgSrc" alt="seminar cover" class="seminar-img" />
      <div v-else class="seminar-img-placeholder"></div>
    </div>

    <div class="seminar-content">
      <!-- 2. 标题 -->
      <h2 class="seminar-title">{{ title }}</h2>

      <!-- 3. 主讲人 + 职位 -->
      <div class="speaker-info">
        <span class="speaker-name">{{ speaker }}</span>
        <span class="speaker-position">{{ position }}</span>
      </div>

      <!-- 4. 日期 + 时间 -->
      <div class="time-info">
        <div class="time-item">
          <el-icon><Calendar /></el-icon>
          <span>会议日期：{{ date }}</span>
        </div>
        <div class="time-item">
          <el-icon><Clock /></el-icon>
          <span>会议时间：{{ time }}</span>
        </div>
      </div>

      <!-- 5. 简介 -->
      <div class="content-block">
        <h3>会议简介</h3>
        <p class="brief">{{ brief }}</p>
      </div>

      <!-- 6. 摘要 -->
      <div class="content-block">
        <h3>内容摘要</h3>
        <p class="abstract">{{ abstract }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { Calendar, Clock } from '@element-plus/icons-vue'

// 接收参数，新增 imgSrc 图片地址入参，其余原有参数全部保留
defineProps({
  title: String,
  speaker: String,
  position: String,
  date: String,
  time: String,
  brief: String,
  abstract: String,
  // 新增：会议封面图片地址，不传自动显示纯色背景
  imgSrc: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.seminar-card {
  overflow: hidden;
  border-radius: 12px;
}

/* ========== 全新重写图片容器，解决拉伸、比例错误问题 ========== */
.seminar-img-box {
  width: 100%;
  /* 宽松自适应高度，不再锁死矮高度，适配所有实拍会议照片 */
  padding-top: 56.25%; /* 标准16:9宽高比（网页通用图片比例，和参考官网完全一致） */
  position: relative;
  overflow: hidden;
}
/* 真实图片：等比完整显示，无边裁切、不变形 */
.seminar-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 完整铺满、等比裁剪、不拉伸不变形，完美适配实拍图 */
}
/* 无图片时：深蓝渐变纯色占位 */
.seminar-img-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a55c2 0%, #0d3a8c 100%);
}

/* 下方所有原有文字样式 100% 完全不动 */
.seminar-content {
  padding: 30px;
}
.seminar-title {
  font-size: 46px;
  font-weight: 600;
  color: #1a55c2;
  margin: 0 0 20px;
  line-height: 1.4;
}
.speaker-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}
.speaker-name {
  font-size: 28px;
  font-weight: 600;
  color: #222;
}
.speaker-position {
  font-size: 26px;
  color: #666;
}
.time-info {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 30px;
}
.time-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 26px;
  color: #444;
}
.content-block {
  margin-bottom: 24px;
}
.content-block h3 {
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin: 0 0 12px;
}
.content-block p {
  font-size: 26px;
  line-height: 1.8;
  color: #333;
  margin: 0;
}
</style>