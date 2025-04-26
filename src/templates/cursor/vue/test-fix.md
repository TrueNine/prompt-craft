---
description:
globs: 
alwaysApply: false
---

## 修复流程（按顺序执行）
1. **执行 ESLint 修复**
   ```bash
   pnpm eslint <文件路径> --fix
   ```
   - 修复所有代码风格和潜在问题
   - 确保无剩余 ESLint 警告和错误

2. **修复类型问题**
   ```bash
   pnpm vue-tsc --noEmit
   ```
   - 解决所有类型不匹配、未定义变量等问题
   - 添加必要的类型声明和导入

3. **修复测试逻辑**
   ```bash
   pnpm vitest run <文件路径> --reporter verbose
   ```
   - 排查测试失败原因（断言错误、异步问题等）
   - 修正测试逻辑，确保测试能正确验证功能

## Typescript/Vue测试特有工具
- 使用 vitest 内置的调试工具（如 test.skip、test.todo、vi.spyOn 等）
- 对组件进行挂载测试时确保正确配置全局插件和依赖
- 组件快照测试需注意属性和事件绑定

## 命名规范检查
- 文件名必须以 `.spec.ts` 结尾
- 测试套件名称应清晰描述被测试组件/功能
- 测试方法名称应描述测试的具体场景和预期结果
- 所有命名与项目其他测试保持一致的风格
