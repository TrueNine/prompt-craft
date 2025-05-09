---
description: Vue测试规范
globs: *.spec.ts,*.spec.tsx
alwaysApply: false
---

## 环境工具
- 包管理：pnpm
- 测试框架：vitest
- 代码检查：eslint
- 类型检查：vue-tsc

## 命名规范
- 测试文件以 `.spec.ts`或`.spec.tsx` 结尾
- 按功能分组测试用例

## 编写规则
- 使用TypeScript/Vue语言特性
  - 类型推断、泛型、解构、可选链
  - 组件测试用@vue/test-utils，且必须使用 tsx
  - 函数式、表达式化代码风格
- 充分利用Vue特性
  - 测试slot、props、emit
  - 保持Vue风格
- 使用vitest高级特性
  - 快照测试
  - 参数化测试
  - 异步测试
