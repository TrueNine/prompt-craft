---
description:
globs: *.ts,*.tsx,*.vue
alwaysApply: false
---

## 📚 核心规范
- 启用严格模式 (`strict: true`)
- 禁止使用 `any` 类型（需显式类型声明）
- 禁止三层以上条件/循环嵌套（需重构为函数）
- 禁止使用非空断言 (`!` 操作符)

## 🛡️ 类型系统
- 优先使用类型推断而非显式注解
- 避免类型断言（必要时使用 `as unknown as T` 形式）
- 泛型参数需显式约束（至少 `extends unknown`）

## ⚡ 性能准则
- 避免在循环内创建函数/对象
- 优先 `for...of` 而非 `forEach`
- 禁止在热路径中使用 `try...catch`

## 🧩 最佳实践
- 优先可选链 (`?.`) 而非 `&&` 链
- 优先空值合并 (`??`) 而非 `||` 判断
- 使用 `void 0` 替代 `undefined`
- 模块导入顺序：内置模块 → 外部模块 → 内部模块

## 🔧 工具规范
- 遇到 lint 错误时：
  1. 执行 `pnpm eslint <file_path> --fix`
  2. 手动修复剩余问题
  3. 提交前验证修复结果

## 📦 模块规范
- 禁止使用 `commonjs` 模块
- 禁止使用 `require` 语句
- 禁止使用 `import * as` 语法
