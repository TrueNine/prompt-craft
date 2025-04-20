---
description:
globs: *.spec.ts,*.spec.tsx
alwaysApply: false
---

# 测试技术栈与规范（TypeScript/Vitest/Vue）

可用依赖：vitest、@vue/test-utils、jsdom、happy-dom

---

## 测试框架选型

- 单元测试：Vitest
- 组件测试：@vue/test-utils
- Mock 框架：Vitest
- DOM 断言：@vue/test-utils
- 端到端/集成：Playwright

---

## 命名规范

- 测试文件名：被测文件名 + `.spec.ts` 或 `.spec.tsx`
- 测试用例名：用反引号包裹，描述场景
  - 正向：`方法名/组件名 输入条件 返回预期结果`
  - 异常：`方法名/组件名 失败场景 抛出预期异常`
  - 边界：`方法名/组件名 边界条件 返回预期结果`
  - 性能：`方法名/组件名 性能指标 返回预期结果`

---

## TypeScript/Vue 风格测试编写规则

- 测试代码应充分体现 TypeScript/Vue 语言特性：
  - 善用类型推断、泛型、解构、可选链等 TS 语法糖
  - 组件测试优先使用 @vue/test-utils，断言表达式化、语义化
  - 变量命名简洁、可读性强，遵循 TS/JS/Vue 惯例
  - 测试代码整体尽量函数式、表达式化，减少冗余和样板代码
  - 组件测试推荐使用 Vue 的 slot、props、emit 等特性，保持 Vue 风味
  - 充分利用 Vitest 的快照、参数化测试、异步测试能力

---

## 代码示例

```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MyButton from '@/components/MyButton.vue'

describe('MyButton', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(MyButton, { props: { label: '提交' } })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('点击后触发 click 事件', async () => {
    await wrapper.trigger('click')
    // 断言事件被触发，例如：
    // expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('禁用状态下不可点击', () => {
    wrapper = mount(MyButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it.each([
    ['primary'],
    ['secondary'],
    ['danger']
  ])('不同类型按钮渲染正确: %s', (type) => {
    wrapper = mount(MyButton, { props: { type } })
    expect(wrapper.classes()).toContain(type)
  })
})
```

---

## 测试失败处理建议

- 明确失败原因，断言/日志输出具体信息
- 针对失败场景，提出修复或优化建议
- 反思被测对象设计，必要时优化业务逻辑
- 主动提出改进建议，共同提升质量
