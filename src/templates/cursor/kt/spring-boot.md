---
description: Spring Boot Kotlin 项目规范与最佳实践指南
globs: *Api.kt,*Service.kt,*Repository.kt,*Controller.kt,*Config.kt,*Entity.kt,*Dto.kt
alwaysApply: false
---

# 技术栈规范

- Spring Boot 3.5+
- Jakarta EE9+
- Jimmer kotlin

# 架构设计原则

## 分层架构
- Controller/Api：参数校验、结果返回
- Service：业务逻辑处理
- Repository：数据访问层

## 命名规范
### 分层命名动词
- Repository 层：`find`/`insert`/`update`/`delete`
- Service 层：`fetch`/`post`/`remove`/`persist`
- API 层：`get`/`post`/`put`/`delete`

### 通用命名规则
- 禁用 `ID` 全大写（统一使用 `id`/`Id`）
- 类后缀：Controller 统一使用 `Api` 结尾
- API 路径：必须包含版本号（如 `v1/user_account`）
- 避免使用全大写缩写（使用 `userId` 而非 `userID`）
- 实体标识符统一使用小写 `id`

# 开发最佳实践

## 依赖注入
- 推荐：构造器注入
- 允许：字段注入（配合 lateinit）

## ID 类型处理
- 实体主键统一使用 `RefId`（`Long` 的类型别名）
- DTO 层自动转换为 `String` 类型
- 提供便捷扩展方法用于数值转换和类型检查

# 注意事项

- 保持贫血模型：Controller/Api 层只负责参数校验和结果返回
- 所有外部输入必须经过验证
- 避免在 Service 层直接操作 HTTP 相关对象
- 优先使用 Kotlin 的空安全特性，避免显式空检查
