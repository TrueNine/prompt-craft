---
description:
globs: *.ts,*.tsx,*.vue
alwaysApply: false
---

## 核心规范
- 禁止使用 `any` 类型（需显式类型声明）
- 禁止三层以上条件/循环嵌套（需重构为函数）
- 禁止非空断言
- `undefined` 应使用 `void 0` 替代

## 性能准则
- 避免在循环内创建函数/对象
- 优先 `forEach` 而非 `for...of`
- 禁止在热路径中使用 `try...catch`

## 最佳实践
- 优先可选链 (`?.`) 而非 `&&` 链
- 优先空值合并 (`??`) 而非 `||` 判断

## 模块规范
- 禁止使用 `commonjs` 模块
- 禁止使用 `require` 语句
- 禁止使用 `import * as` 语法
