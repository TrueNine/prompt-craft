---
description: 
globs: *.vue
alwaysApply: false
---
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

## 命名约定
- 组件名：PascalCase
- 事件名：PascalCase
- 属性名：PascalCase

## 代码约束
- ✗ 禁用原生 DOM API
- ✗ 禁止手动导入自动引入的函数
- ✓ 保持组件代码简洁
- ✓ Props 和 Emits 使用接口在组件内部单独定义
- ✓ Emits 必须使用最新的元组定义语法
- ✓ 组件嵌套层级应保持精简

## 自动导入
- 遵循项目 vite.config.ts 的自动导入配置
- 禁止编写多余的 import 语句
- 优先使用自动导入的组合式 API

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
