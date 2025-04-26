---
description: Vue样式规范
globs: *.tsx,*.vue,*.css,*.vue,*.html,*.scss
alwaysApply: false
---

## 核心样式要求
- UnoCSS: **必须**作为唯一的原子化CSS解决方案，严禁使用其他UI库的class
- SCSS: **必须**使用SCSS编写非原子化样式，利用嵌套/变量/混合/函数减少冗余
- 响应式: 必须使用响应式前缀(sm/md/lg/xl)，移动优先
- 布局: 必须使用flex/grid，禁止固定宽度和像素值
- 主题: 必须支持明暗主题，禁止硬编码颜色

## 样式严禁项
- 禁止内联样式
- 禁止非scoped样式
- 禁止忽略响应式适配
- 禁止使用普通CSS编写复杂样式

## 样式其他规范
- 图标: 必须使用<YIco>组件，格式i-{collection}:{icon-name}
- 动画: 必须优化性能(transform/opacity)，考虑prefers-reduced-motion
- 样式复用: 对重复样式必须使用SCSS变量和混合抽象
