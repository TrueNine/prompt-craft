---
description: Kotlin 项目规范与最佳实践指南
globs: *.kt
alwaysApply: false
---

# 项目技术

- Kotlin 2.2+
- JDK 24+

# Kotlin 与 Java 互操作规范

## 类设计原则
- 推荐显式声明 `open` 以支持继承
- 推荐使用 `@JvmField` 暴露公共字段

## 空安全处理
- 推荐明确的可空性声明
- 使用 `@get:JvmName` 自定义 getter 名称
- 使用 `@NotNull` 确保 Java 代码必须处理空值
- 适当使用 `lateinit` 声明非空变量

## 函数设计
- 推荐为默认参数提供 Java 重载 (`@JvmOverloads`)
- 推荐扩展函数使用伴生对象和 `@JvmStatic` 注解

## 协程支持
- 推荐提供阻塞式 Java 调用方法 (`@JvmName`)
- 推荐暴露 suspend 函数的 Java 适配器

# 函数式 API 最佳实践

## 集合操作
- 推荐使用函数式链式调用和 Sequence
- 禁止使用多个中间集合

## 高阶函数
- 推荐使用 TypeAlias 简化函数类型
- 推荐使用高阶函数增强可复用性
- 推荐使用 inline 优化性能

## 扩展函数
- 推荐使用扩展函数增强现有类
- 推荐使用扩展属性简化访问

## 异常处理
- 推荐使用 Kotlin 内置检查函数：`require`, `check`, `error`
- 禁止直接抛出异常或者显式捕获异常
