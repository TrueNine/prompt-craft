---
description: 
globs: *Test.kt
alwaysApply: false
---
- 测试框架：JUnit 5
- 测试模拟框架：Mockk
- spring 测试：spring boot test
- spring webmvc接口工具：spring mockmvc
- 测试容器：testcontainers
- 数据库: PostgreSQL 17.4 + Jimmer 0.9.70（强类型DSL）
- 缓存：Redis 7.3

## 特殊规则

- `RefId` 通常指代 `net.yan100.compose.core.RefId`, 它是 kotlin 的 typealias, 真实类型为 `kotlin.Long`
- `RefId` 为其准备了基本类型到 `RefId` 的扩展方法 `net.yan100.compose.core.toId`. 调用示例: `1l.toId()`,`"1".toId()`
- `RefId` 为其准备判断是否为`RefId`的扩展方法 `net.yan100.compose.core.isId`. 调用示例: `id.isId()`

## 代码规范

### 命名规则

- 后缀规则：Controller类`Api`结尾，API路径含版本号（如`v1/user_account`）
- 分层命名：
  - Repository：`find`/`insert`/`update`/`delete`
  - Service：`fetch`/`post`/`remove`/`persist`
  - API：`get`/`post`/`put`/`delete`
- 禁用词：`ID`（统一使用`id`/`Id`）

### 开发实践

- 依赖注入：构造器注入优先，字段注入使用`@Resource`+lateinit
- 异常处理：禁用throw，强制使用`error`/`require`/`check`系列
- 实体规范：主键字段名为`id: RefId`（Long别名）
- 贫血模型：Controller仅做参数校验和结果返回

## 文档注释

### 结构规范

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

## 测试规范

- 方法命名：反引号包裹中文描述（`fun `测试 登录失败场景`()`）
- 依赖注入：`@Resource`注解于setter，禁用private
- 断言：统一使用kotlin.test断言库
- 事务：使用 `@Rollback` 确保测试用例不会污染数据库
- 测试数据：禁止在测试中准备数据，统一在 before 中 准备，在 after 中 清理

### 测试样例

```kotlin
package com.example

// 使用 kotlin.test 的别名而非直接的 junit or testng
import kotlin.test.Test
import kotlin.test.BeforeTest
import kotlin.test.AfterTest
// 使用jakarta而非javax
import jakarta.annotation.Resource
// ... 其他导入

@AutoConfigureMockMvc // 测试 spring webmvc接口则按需添加
@SpringBootTest // 测试涉及 spring bean 注入则按需添加
class ExampleApiTest { // 被测试类名称+Test
  lateinit var mockMvc: MockMvc @Resource set // 在 setter 使用 resource 注入
  lateinit var testData: Any

  @Test
  fun `methodName 失败后返回 403 响应码`() { // `测试方法名称 测试描述`()
    // 测试逻辑
  }

  @BeforeTest
  fun setup() {
    // 在测试前准备需要的测试数据
  }

  @AfterTest
  fun after() {
    // 在测试结束后清理测试数据
  }
}
```

## 附录：术语映射

| 缩写   | 全称    | 示例             |
|------|-------|----------------|
| dis  | 残疾    | disType=残疾类型   |
| cert | 证件    | certInfo=证件信息  |
| tax  | 税务    | taxVideo=个税视频  |
| spec | 查询参数  | specification  |
| wxpa | 微信公众号 | wxpaAuth=公众号认证 |
```
