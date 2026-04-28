<template>
  <div class="publication-card">
    <!-- 论文标题（带跳转链接） -->
    <h3 class="title">
      <a :href="url" target="_blank" rel="noopener noreferrer">
        {{ title }}
      </a>
    </h3>

    <!-- 发表日期标签 -->
    <span class="year-tag">{{ year }}</span>

    <!-- 作者列表 -->
    <p class="authors">{{ authors }}</p>

    <!-- 出版商/会议信息 -->
    <p class="venue">{{ venue }}</p>
  </div>
</template>

<script setup>
// 定义组件接收的参数
const props = defineProps({
  // 论文标题
  title: {
    type: String,
    required: true
  },
  // 论文跳转链接
  url: {
    type: String,
    default: '#'
  },
  // 作者列表
  authors: {
    type: String,
    required: true
  },
  // 发表年份
  year: {
    type: [String, Number],
    default: ''
  },
  // 会议/期刊/预印本信息
  venue: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.publication-card {
  position: relative;
  padding: 24px 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

/* 年份标签，在卡片右上角 */
.year-tag {
  position: absolute;
  top: 24px;
  right: 32px;
  padding: 6px 14px;
  background: #f0f2f5;
  border-radius: 20px;
  font-size: 16px;
  color: #666;
}

/* 论文标题 */
.title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px;
  line-height: 1.4;
}

.title a {
  color: #0066cc;
  text-decoration: none;
}

.title a:hover {
  text-decoration: underline;
}

/* 作者列表 */
.authors {
  font-size: 24px;
  color: #444;
  line-height: 1.6;
  margin: 0 0 12px;
}

/* 出版商/会议信息 */
.venue {
  font-size: 24px;
  color: #666;
  margin: 0;
}
</style>