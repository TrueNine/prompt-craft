# GitHub Copilot

GitHub Copilot是由GitHub、OpenAI和微软联合开发的AI编程助手，2025年3月已升级集成GPT-4o模型并推出免费基础版，全球付费用户超100万，企业采用率达37%:cite[8]:cite[4]。

**订阅计划**  
- 免费版：2000次代码补全/月 + 50次聊天请求（2025年3月新增）:cite[4]  
- 个人版：$10/月（原价）或$100/年  
- 企业版：$19/用户/月（含高级安全审查）  
- 学生/开源维护者：免费:cite[8]  

## 核心能力

### 🚀 智能编码
- **GPT-4o模型**：基于27.5万仓库训练的代码补全引擎，支持30+语言:cite[2]  
- **自然语言转代码**：通过注释生成完整函数（如"列出GitHub仓库"自动生成API调用代码）:cite[7]  
- **多文件上下文**：跨文件分析代码关系，提供重构建议:cite[4]  

### 🔌 扩展生态
- **Copilot Extensions**：与Docker/MongoDB等服务交互，可直接生成Dockerfile或查询数据库:cite[1]  
  - 支持自定义扩展开发（OIDC身份验证+5技能集上限）:cite[1]  
  - Stack Overflow/GitBook等知识库即时查询:cite[1]  

### ⚠️ 安全警示
- **规则文件注入风险**：恶意.copilotrules可能植入隐藏Unicode指令，导致生成后门代码:cite[5]  
- **代码审查必需**：官方强调用户需自行验证生成代码（首次正确率仅43%）:cite[7]  

## 使用场景
1. **快速原型开发**：通过注释生成React组件/Python爬虫等:cite[7]  
2. **跨语言适配**：不熟悉JavaScript时自动转换Python算法:cite[7]  
3. **测试用例生成**：根据函数签名自动编写单元测试:cite[8]  
4. **文档查询**：通过GitBook扩展直接检索API文档:cite[1]  

## 官方资源
- 官网：[copilot.github.com](https://copilot.github.com)  
- 扩展市场：[GitHub Marketplace](https://github.com/marketplace?query=copilot)  
- 漏洞报告：2025年3月披露规则文件攻击向量:cite[5]  
