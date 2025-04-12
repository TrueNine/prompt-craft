---
description:
globs: *.tsx,*.vue,*.css,*.vue,*.html,*.scss
alwaysApply: false
---
# 设计系统
- 设计风格：请参考项目内具体的样式设计规范
- 同时支持移动端和PC端，响应式布局
- 请 AI 助手在实现样式时，务必查阅并遵循项目内定义的具体样式规范与 UI 组件库用法，以确保视觉一致性和用户体验。
- 基础字号：1rem = 16px
- UnoCSS单位：1 = 0.25rem

# 样式实现规范

## 核心原则
- 组件样式隔离：样式实现应**首选且绝大多数情况依赖**项目指定的 UI 组件库和原子化 CSS (UnoCSS)。**原则上禁止**使用 `<style>` 标签编写组件级 CSS。**特殊例外**: 若遇到无法通过前述方式合理实现的、极其复杂且非通用的特定样式，**必须**使用 `<style scoped lang="scss">` 进行封装。**严禁**使用未加 `scoped` 的 `<style>` 标签或内联 `style` 属性。
- 原子化优先：Vue组件优先使用原子化CSS
- **强制规范**: 在模板中使用 `class` 属性直接添加样式时，**必须且仅能** 使用原子化 CSS (UnoCSS) 类。**严禁** 混用或直接使用 UI 组件库提供的辅助/工具类（例如 Element Plus 的 `el-col-xs-4` 或 Ant Design Vue 的 `ant-col-6` 等非组件标签形式的类），以确保样式系统的独立性和未来 UI 库迁移的平滑性。
- 组件优先：优先使用组件库 + 原子化CSS的组合方案
- 所有自定义样式和组件选用必须同时兼容亮暗主题。利用 UI 库和 UnoCSS 的主题功能实现适配，避免使用硬编码颜色值。

## 动画与过渡规范

- **标准持续时间**: UI 元素状态变化（如悬停、激活）的过渡动画，**推荐** 使用 `100ms` 作为基准。优先选用 UI 库或 UnoCSS 提供的预设速度变量/类（例如 `duration-100`, `transition-fast`，请根据实际库调整名称）。
- **实现方式**:
    - **首选**: 使用项目 UI 库内置的过渡组件（如 `Transition`, `Fade`, `Slide` 等）或效果。
    - **次选**: 对于简单的交互反馈，使用 UnoCSS 的 `transition` 及相关原子类。
    - **避免**: 除非必要且现有库无法满足，否则**禁止**编写复杂的自定义 CSS `@keyframes` 动画。
- **原则**:
    - **目的明确**: 动画应服务于用户引导和状态反馈，保持**简洁**，避免干扰。
    - **体验流畅**: 使用标准缓动函数（如 `ease-in-out`），确保过渡**平滑**不突兀。
    - **性能优先**: 尽可能利用 CSS `transform` 和 `opacity` 实现动画。


## 图标规范与使用

- **唯一技术方案**: 项目图标**必须**通过 UnoCSS 的 `@iconify-json` 预设实现。这是确保图标资源统一管理和按需加载效率的最佳方式。
- **强制封装组件**: 所有图标的渲染**必须**通过项目统一封装的 `<YIco>` 组件进行。这有助于未来统一处理图标加载、应用通用样式或添加交互行为。
- **使用方法**:
    - 在 `<YIco>` 组件上通过 `class` 属性应用样式。
    - **图标指定**: 使用 `i-{collection}:{icon-name}` 的格式指定图标，例如 `i-mdi:home` 或 `i-lucide:settings`。
    - **大小与颜色**: 使用标准的 UnoCSS 原子类（如 `text-xl`, `text-red-500`, `w-6 h-6` 等）来控制图标的大小和颜色，应用在 `<YIco>` 组件上。
- **示例**:
    ```vue
    <!-- ✓ 正确：使用 YIco 组件，通过 class 指定图标和样式 -->
    <YIco class="i-mdi:account-circle text-4xl text-blue-600" />
    <YIco class="i-heroicons-solid:check-circle w-5 h-5 text-green-500" />

    <!-- ✗ 错误：直接使用原生标签或非 UnoCSS 方式 -->
    <!-- <i class="some-icon-font-class"></i> -->
    <!-- <span class="i-mdi:home"></span>  (禁止直接使用 span/i，必须用 YIco) -->

    <!-- ✗ 错误：使用其他 UI 库的图标组件 -->
    <!-- <el-icon><SomeIcon /></el-icon> -->
    ```
- **严格禁止**:
    - **禁止**直接在模板中使用 `<i>` 或 `<span>` 等原生标签配合 `i-xxx:xxx` 类名来渲染图标。
    - **禁止**引入或使用任何其他第三方图标库的组件（例如 Font Awesome 组件、Element Plus 的 `<el-icon>` 等）。此限制是为了维护视觉一致性、优化打包体积和简化依赖管理。

## 布尔类型 Prop 与原子化 CSS 规范

- **核心问题**: Vue 组件的布尔类型 Prop 的简写形式（例如 `<MyButton disabled />`）在视觉上可能与同名的原子化 CSS 类（例如 `.disabled`）难以区分，增加了代码理解成本，并可能在未来的样式系统迭代中引入难以预料的冲突。
- **强制规则**: 为了保证代码清晰度和样式应用的可预测性，**禁止**对组件使用布尔类型 Prop 的简写形式。
- **推荐实践**: 必须使用完整的 `:prop-name="true"` 绑定语法来传递布尔值 `true`。

```vue
<!-- ✓ 正确：清晰指明 disabled 是一个值为 true 的 Prop -->
<MyButton :disabled="true" />
<CustomCard :selected="true" />

<!-- ✗ 错误：禁止使用简写，避免与原子化 CSS (如 .disabled, .selected) 混淆 -->
<MyButton disabled />
<CustomCard selected />
```
