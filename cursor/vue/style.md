---
description: 
globs: *.tsx,*.vue,*.css,*.vue,*.html,*.scss
alwaysApply: false
---
# 设计系统
- 设计风格：Material Design
- 同时支持移动端和PC端，响应式布局
- 仅在复杂交互场景下考虑其他设计系统
- 如需书写CSS，则只能使用 SCSS
- 保持视觉一致性和用户体验

# 样式实现规范

## 核心原则
- 组件样式隔离：禁止在组件内部编写样式
- 原子化优先：Vue组件优先使用原子化CSS
- 组件优先：优先使用组件库 + 原子化CSS的组合方案
- 在任何时候，应注意适配亮暗主题

## 动画与过渡
- Transition Duration: 100ms
- 确保动画流畅且简洁
- 提供即时的视觉反馈

## 度量标准
- 基础字号：1rem = 16px
- UnoCSS单位：1 = 0.25rem

## 图标规范
- 技术栈：UnoCSS + @iconify-json
- 使用方式：`<YIco class="i-xxx:xxx text-6" />`
- 规范限制：禁止使用其他组件库的图标组件

## 属性处理
- 当属性与原子化CSS存在冲突时：
```vue
<Comp :border="true" />  // ✓ 正确
<Comp border />          // ✗ 避免
```
