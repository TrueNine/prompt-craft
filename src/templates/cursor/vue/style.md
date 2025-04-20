---
description:
globs: *.tsx,*.vue,*.css,*.vue,*.html,*.scss
alwaysApply: false
---
# Vue 项目样式规范

## 核心原则与基础设定

- **设计系统兼容**:
    - 设计风格：请参考项目内具体的样式设计规范。
    - 响应式布局：同时支持移动端和 PC 端。
    - UI 库遵循：实现样式时，务必查阅并遵循项目内定义的具体样式规范与 UI 组件库用法。
- **技术栈与优先级**:
    - **强制：原子化 CSS (UnoCSS) + UI 组件库**: 样式实现应**首选且绝大多数情况**依赖此组合。
    - **特殊例外：`<style scoped lang="scss">`**: 仅用于无法通过上述方式合理实现的、极其复杂且非通用的特定样式。
    - **严禁**: 使用未加 `scoped` 的 `<style>` 标签、内联 `style` 属性，或直接在 `class` 中混用非 UnoCSS 的 UI 库工具类（如 `el-col-xs-4`）。
- **原子化 CSS (UnoCSS) 优先**:
    - Vue 组件模板中的 `class` 属性**必须且仅能**使用 UnoCSS 原子类。
    - **单位**: 1 = 0.25rem (基于基础字号 1rem = 16px)。
- **主题兼容**:
    - 所有自定义样式和组件选用必须同时兼容亮暗主题。
    - **实现**: 利用 UI 库和 UnoCSS 的主题功能，避免硬编码颜色值。

## 动画与过渡规范

- **标准持续时间**: UI 元素状态变化过渡动画，**推荐**使用 `100ms` 基准。优先选用 UI 库或 UnoCSS 预设速度（如 `duration-100`, `transition-fast`）。
- **实现方式优先级**:
    1.  **首选**: 项目 UI 库内置过渡组件/效果 (如 `Transition`, `Fade`)。
    2.  **次选**: UnoCSS `transition` 原子类（用于简单交互）。
    3.  **避免**: 复杂的自定义 CSS `@keyframes` 动画。
- **原则**:
    - **目的明确**: 服务于用户引导和状态反馈，保持**简洁**。
    - **体验流畅**: 使用标准缓动函数 (如 `ease-in-out`)，确保**平滑**。
    - **性能优先**: 尽可能利用 CSS `transform` 和 `opacity`。

## 图标规范

- **唯一技术方案**: **必须**通过 UnoCSS 的 `@iconify-json` 预设实现。
- **强制封装组件**: 所有图标渲染**必须**通过项目统一封装的 `<YIco>` 组件。
- **使用方法**:
    - **图标指定**: 在 `<YIco>` 组件上使用 `class` 指定图标，格式为 `i-{collection}:{icon-name}` (例如 `i-mdi:home`)。
    - **样式控制**: 使用标准的 UnoCSS 原子类（如 `text-xl`, `text-red-500`, `w-6 h-6`）控制 `<YIco>` 组件的大小和颜色。
- **示例**:
    ```vue
    <!-- ✓ 正确 -->
    <YIco class="i-mdi:account-circle text-4xl text-blue-600" />
    <YIco class="i-heroicons-solid:check-circle w-5 h-5 text-green-500" />

    <!-- ✗ 错误 -->
    <!-- <i class="some-icon-font-class"></i> -->
    <!-- <span class="i-mdi:home"></span> (禁止直接使用原生标签) -->
    <!-- <el-icon><SomeIcon /></el-icon> (禁止使用其他 UI 库图标组件) -->
    ```
- **严格禁止**:
    - **禁止**直接在模板中使用 `<i>` 或 `<span>` 等原生标签配合 `i-xxx:xxx` 类名渲染图标。
    - **禁止**引入或使用任何其他第三方图标库组件。

## 组件布尔类型 Prop 规范

- **核心问题**: 布尔 Prop 简写形式 (如 `<MyButton disabled />`) 与同名原子化 CSS 类 (如 `.disabled`) 可能混淆。
- **强制规则**: **禁止**对组件使用布尔类型 Prop 的简写形式。
- **推荐实践**: 必须使用完整的 `:prop-name="true"` 绑定语法传递布尔值 `true`。

```vue
<!-- ✓ 正确 -->
<MyButton :disabled="true" />
<CustomCard :selected="true" />

<!-- ✗ 错误 -->
<MyButton disabled />
<CustomCard selected />
```
