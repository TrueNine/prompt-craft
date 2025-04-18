---
description: 
globs: *Test.kt,*Test.java
alwaysApply: false
---
# 可用测试技术栈
- jUnit5
- junit5-params
- kotlin.test
- mockk
- spring-boot-test
- testcontainers

# 测试规范与最佳实践

## 1. 测试框架选择

- **基础测试框架**
  - Java 项目：使用 JUnit 5
- **Mock 框架**
  - Kotlin 项目：优先使用 MockK
  - Java 项目：使用 Mockito
- **集成测试框架**
  - 数据库测试：必须使用 Testcontainers
  - Redis 测试：Testcontainers + Redis 模块
  - 消息队列测试：使用对应的 Testcontainers 模块

## 2. 测试命名规范

- **类名**：被测试类名 + `Test`
- **方法名**：用反引号包裹，描述测试场景
  - 正向用例：`方法名 输入条件 返回预期结果`
  - 异常用例：`方法名 失败场景 抛出预期异常`
  - 边界用例：`方法名 边界条件 返回预期结果`
  - 性能用例：`方法名 性能指标 返回预期结果`


## 3. 代码示例

```kotlin
package com.example

// 推荐导入
import kotlin.test.Test
import kotlin.test.BeforeTest
import kotlin.test.AfterTest
import jakarta.annotation.Resource
// JUnit5 参数化测试相关导入
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource

@AutoConfigureMockMvc // 测试 spring webmvc 接口时按需添加
@SpringBootTest // 涉及 spring bean 注入时按需添加
class ExampleApiTest { // 被测试类名称+Test
  lateinit var mockMvc: MockMvc @Resource set // setter 注入
  lateinit var testData: Any

  @BeforeTest
  fun setup() {
    // 测试前准备
  }

  @AfterTest
  fun after() {
    // 测试后清理
  }

  @Test
  fun `getUserDatas 失败 后返回 403 响应码`() {
    // 测试逻辑
  }

  @Test
  fun `postUserDatas 保证 接口幂等性`() {
    // 测试逻辑
  }

  // JUnit5 参数化测试示例
  @ParameterizedTest
  @ValueSource(strings = ["admin", "guest", "user"])
  fun `getUserRole 输入不同角色 返回预期权限`(role: String) {
    // 参数化测试逻辑，根据 role 检查返回权限
  }
}
```

## 4. 推荐依赖

- jUnit5
- junit5-params
- mockk
- spring-boot-test
- testcontainers

## 5. 测试失败处理与建议

测试失败时，建议遵循如下流程和思考方式：

1. **明确失败原因**
   - 在断言或日志中输出清晰、具体的失败信息，便于快速定位问题。
2. **提出改进建议**
   - 针对失败场景，给出可行的修复或优化建议，帮助开发者高效解决问题。
3. **反思被测对象设计**
   - 不仅关注测试代码本身，也要思考是否可以通过优化或修改被测试对象（如业务逻辑、接口设计等）来根本解决问题。
4. **团队协作与评审**
   - 在评审测试用例和失败案例时，鼓励团队成员主动提出改进建议，共同提升代码与设计质量。
