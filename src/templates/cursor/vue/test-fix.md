---
description:
globs:
alwaysApply: false
---

## 测试工具环境
- pnpm
- vitest
- eslint
- vue-tsc
## 总体规范
- 严格遵照 [test.mdc](mdc:.cursor/rules/test.mdc) 以及其他规范来编写以及修复单元测试
- 禁止更改被测试对象或函数，如因被测试对象引起的错误，提出解决方案即可
- 若测试用例覆盖不足，需补齐相关用例，确保测试完整性
- 文件名、测试名称、测试方法名等如不符合规范，必需一并修正
## 执行步骤指导（自动循环，直到无法修复为止）
- 运行 `pnpm eslint <file_path> --fix`，修复所有 eslint 错误，直至无可修复项。
- 运行 `pnpm vue-tsc --noEmit`，修复所有类型（type）错误，直至无可修复项。
- 运行 `pnpm vitest run <file_path> --reporter verbose`，修复所有测试（test）错误，直至无可修复项。
## 错误分析与循环
- 每次修复后，重新执行上述所有步骤，直至 eslint、type、test 三类错误均为 0，或遇到无法自动修复的问题。
- 如遇无法修复的错误，需简要说明原因，并提出可行的解决建议。
- 检查并修正文件名、测试名称、测试方法名等命名规范问题，必要时同步修改相关引用，确保一致性。
