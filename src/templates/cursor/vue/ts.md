---
description:
globs: *.ts,*.tsx,*.vue
alwaysApply: false
---
## 核心原则

- 任何时候，应当遵循 [@optimization-skills.mdc](mdc:.cursor/rules/optimization-skills.mdc) 的优化建议指导，来编写代码

## 编码规范
- 启用严格模式 (strict mode)
- 禁止使用 any 类型
- 禁止三层以上条件或循环条件嵌套
- 尽量避免闭包
- 禁止使用非空断言
- 禁止恒定条件判断
- 禁止编写 `commonjs` 模块
- 禁止使用 undefined 而是 void 0
- 🚨 **重要**: 遇到 lint 错误时，**必须优先** 执行 `pnpm eslint <file_path> --fix` 自动修复，**然后再进行其他操作**。这将大幅提升效率！
