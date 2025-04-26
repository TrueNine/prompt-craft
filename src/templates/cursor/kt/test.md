---
description: Kotlin 测试规范与最佳实践指南
globs: *Test.kt
alwaysApply: false
---

# Kotlin 测试技术栈
- 测试框架：JUnit 5 + kotlin.test
- Mock 框架：MockK（首选）/ Mockito（Java 互操作时）
- 参数化测试：JUnit 5 Params
- 集成测试：testcontainers
- Spring 测试：spring-boot-starter-test

# Kotlin特定命名规范
- 单元测试类命名：`[类名]Test`
- 分组类名：`[被测试方法名|变量名][Function|Variable|Class]Group`

# Kotlin 测试编写规范
1. 充分利用 Kotlin 特性，减少样板代码，提升代码可读性
2. 一个测试方法只验证一个行为
3. 禁止测试间的依赖
