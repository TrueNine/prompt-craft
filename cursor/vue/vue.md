# 技术栈

## 核心框架
- Vue 3
- Vue Router 4
- Pinia
- Unplugin 全家桶
  - auto-import
  - vue-components
  - vue-router

## 组件生态
- PC端：Vuetify 3 (Material Design)
- 移动端：Varlet UI (Material Design)
- 复杂场景：Element Plus
- 工具库：VueUse > lodash-es

# 开发规范

## 命名约定
- 组件名：PascalCase
- 事件名：PascalCase
- 属性名：PascalCase

## 代码约束
- ✗ 禁用原生 DOM API
- ✗ 禁止手动导入自动引入的函数
- ✓ 保持组件代码简洁

## 组件模板
```vue
<script setup lang="ts">
interface Props {
  exampleProp: string
}

interface Emits {
  exampleEvent: [param: string]
}

const { exampleProp } = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <Example 
    :exampleProp="exampleProp" 
    @exampleEvent="handleExampleEvent" 
  />
</template>
```

# 目录结构
```
src/
  ├─ pages/      # 页面组件
  │  ├─ a/       # 后台页面
  │  └─ wxpa/    # 移动端页面
  ├─ components/ # 公共组件
  └─ layouts/    # 布局组件
```
