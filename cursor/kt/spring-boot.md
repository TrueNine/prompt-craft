---
description: 
globs: *Api.kt,*Service.kt,*Repository.kt,*Controller.kt,*Config.kt
alwaysApply: false
---
- spring-boot3
- jakarta-ee
- redis
- postgresql
- jimmer

### 开发实践

- 依赖注入：构造器注入优先，字段注入使用`@Resource`+lateinit
- 异常处理：禁用 throw，强制使用`error`/`require`/`check`系列
- 实体主键类型为`id: RefId`（Long别名）,inputDto 或者 outputDto 中, jimmer 会将其转换为 `String`
- 贫血模型：Controller/Api 仅做参数校验和结果返回

---

- `RefId` 通常指代 `net.yan100.compose.core.RefId`, 它是 kotlin 的 typealias, 真实类型为 `kotlin.Long`
- `RefId` 为其准备了基本类型到 `RefId` 的扩展方法 `net.yan100.compose.core.toId`. 调用示例: `1l.toId()`,`"1".toId()`
- `RefId` 为其准备判断是否为`RefId`的扩展方法 `net.yan100.compose.core.isId`. 调用示例: `id.isId()`

---

- 后缀规则：Controller 类`Api`结尾，API路径含版本号（如`v1/user_account`）
- 分层命名：
  - Repository：`find`/`insert`/`update`/`delete`
  - Service：`fetch`/`post`/`remove`/`persist`
  - API：`get`/`post`/`put`/`delete`
- 禁用词：`ID`（统一使用`id`/`Id`）



```kotlin
/**
 * # 类标题（H1）
 * > 功能概要
 *
 * 详细描述（支持Markdown）
 * @param 参数描述（data class参数需在此说明）
 */
class ExampleApi {
  /**
   * ## 方法标题
   * @param 使用Jimmer DSL操作数据库
   * @return 响应体结构说明
   */
  fun get() {
    // ...
  }
}
```
