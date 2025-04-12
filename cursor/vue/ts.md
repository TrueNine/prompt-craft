---
description: 
globs: *.ts,*.tsx,*.vue
alwaysApply: false
---
## 核心原则
- 启用严格模式 (strict mode)
- 禁止使用 any 类型
- 禁止使用非空断言
- 禁止恒定条件判断
- 禁止使用 undefined 而是 void 0
- 🚨 **重要**: 遇到 lint 错误时，**必须优先** 执行 `pnpm eslint --fix <file_path>` 自动修复，**然后再进行其他操作**。这将大幅提升效率！

## 导入规范
- 严格的导入顺序要求
- 使用 type import 导入类型
- 参考项目现有 ESLint 规则
- 遵循项目 tsconfig 配置
