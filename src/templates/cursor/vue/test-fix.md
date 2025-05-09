---
description: Vue测试修复指南
globs: *.spec.ts,*.spec.tsx
alwaysApply: false
---

## 修复流程
1. **执行ESLint修复**
   ```bash
   pnpm eslint <文件> --fix
   ```
   - 解决代码风格和潜在问题
   - 消除所有ESLint警告和错误

2. **修复类型问题**
   ```bash
   pnpm vue-tsc --noEmit
   ```
   - 解决类型不匹配问题
   - 添加必要类型声明

3. **修复测试逻辑**
   ```bash
   pnpm vitest run <文件> --reporter verbose
   ```
   - 分析测试失败原因
   - 修正测试逻辑

## 测试工具
- 使用vitest调试工具：`test.skip`、`test.todo`、`vi.spyOn`
- 组件测试时正确配置全局插件和依赖
- 注意快照测试中的属性和事件绑定

## 命名检查
- 文件名必须以`.spec.ts`结尾
- 测试套件名应描述被测组件/功能
- 测试方法名应描述具体场景和预期结果
