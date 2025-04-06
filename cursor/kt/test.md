---
description: 
globs: *Test.kt
alwaysApply: false
---
- jUnit
- mockk
- spring-boot-test
- spring-mockmvc
- testcontainers
- jimmer
- redis
- postgresql


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

  @BeforeTest
  fun setup() {
    // 在测试前准备需要的测试数据
  }

  @AfterTest
  fun after() {
    // 在测试结束后销毁测试数据
  }

  @Test
  fun `getUserDatas 失败 后返回 403 响应码`() {
    // 测试逻辑
  }

  fun `postUserDatas 保证 接口幂等性`() {
    // 测试逻辑
  }
}
```
