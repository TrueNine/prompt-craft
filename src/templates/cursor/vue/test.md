---
description:
globs: *.spec.ts,*.spec.tsx
alwaysApply: false
---

## Typescript/Vue 环境与工具
- 包管理：pnpm
- 测试框架：vitest
- 代码检查：eslint
- 类型检查：vue-tsc

## Typescript/Vue测试文件命名规范
- 测试文件名：被测文件名 + `.spec.ts` 或 `.spec.tsx`
- 组件测试用例按功能或属性分组组织

## TypeScript/Vue 风格测试编写规则
- 测试代码应充分体现 TypeScript/Vue 语言特性：
  + 善用类型推断、泛型、解构、可选链等 TS 语法糖
  + 组件测试优先使用 @vue/test-utils，断言表达式化、语义化
  + 变量命名简洁、可读性强，遵循 TS/JS/Vue 惯例
  + 测试代码整体尽量函数式、表达式化，减少冗余和样板代码
  + 组件测试推荐使用 Vue 的 slot、props、emit 等特性，保持 Vue 风味
  + 充分利用 Vitest 的快照、参数化测试、异步测试能力
