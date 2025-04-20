# Cursor

Cursor 是由 Anysphere 开发的 AI 驱动的智能代码编辑器，总部位于美国。它深度集成 Claude 3.7、GPT-4o 等先进大模型，提供从代码生成到项目管理的全流程 AI 辅助开发体验。2025年3月估值突破百亿美元，成为增长最快的AI编程工具之一:cite[2]:cite[6]。

**订阅计划**
- 免费版：基础代码补全（限次）
- Pro版：$20/月/用户（标准AI功能）
- 企业版：$40/月/用户（含Claude 3.7 Max等高阶模型）:cite[6]:cite[8]

## 核心能力

- 🚀 **AI超级引擎**
  - 默认搭载 Claude 3.7 Sonnet/GPT-4o 双模型动态切换
  - 可选「Claude 3.7 Max」模式（单次操作最高$10，支持20万字符上下文）:cite[8]
  - 中文场景优化（需英文关键词触发）:cite[7]

- ✨ **智能开发流**
  - `Ctrl+K` 生成代码 / `Ctrl+L` 对话调试
  - Composer模式（`Ctrl+I`）批量修改多文件
  - 自动生成.gitcommit信息、.cursorignore规则:cite[4]

- 🔗 **上下文感知**
  - `@Files`/`@Code` 注入本地代码上下文
  - `@Docs` 关联API文档 / `@web` 实时网络检索:cite[4]

- ⚠️ **安全提醒**
  - 需警惕恶意.cursorrules文件注入攻击（隐藏Unicode字符可能植入后门）:cite[1]

## 竞品对比

| 维度        | Cursor优势                          | 局限性                     |
|-------------|-----------------------------------|--------------------------|
| 多语言支持   | TypeScript/Go编译通过率+9.7%:cite[7] | 中文语义理解弱于Trae:cite[7] |
| 生态整合     | 完全兼容VS Code插件体系:cite[4]    | 企业级部署功能欠缺:cite[7]   |

## 官方资源

- 🌐 官网：[cursor.com](https://www.cursor.com/)
- 📚 深度教程：[CSDN部署指南](https://blog.csdn.net/nikohsu/article/details/145798356):cite[4]
- ⚙️ GitHub：[getcursor/cursor](https://github.com/getcursor/cursor)
- 💬 用户反馈：曾因拒绝生成代码引发争议（"应该自己编程"事件）:cite[3]:cite[5]
