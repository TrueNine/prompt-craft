import type { ProjectStructure } from '../../types'
import { genericMarkdownProjectFileTrees } from './markdownFiles'
import { genericSpringBootProjectFileTrees } from './springBootFiles'
import { genericVueProjectFileTrees } from './vueFiles'

/**
 * 默认项目结构定义
 *
 * 包含所有支持的项目类型结构定义:
 * - kotlin+spring-boot: Kotlin Spring Boot项目结构
 * - typescript+vue: TypeScript Vue项目结构
 * - markdown+cursor-rules: Markdown Cursor规则项目结构
 *
 * 每种项目类型都基于通用项目结构扩展，并添加特定框架所需的文件和目录结构
 */
export const defaultProjectStructure: ProjectStructure = {
  /**
   * Kotlin Spring Boot项目结构
   *
   * 扩展基础Kotlin项目结构，添加:
   * - Spring Boot配置文件
   * - Jimmer DTO文件
   */
  'kotlin+spring-boot': genericSpringBootProjectFileTrees,
  /**
   * TypeScript Vue项目结构
   *
   * 扩展基础TypeScript项目结构，添加:
   * - Vue组件目录结构
   * - API请求定义
   * - Pinia状态管理
   * - 布局和视图组件
   * - Jimmer生成的客户端API
   */
  'typescript+vue': genericVueProjectFileTrees,
  /**
   * Markdown Cursor规则项目结构
   *
   * 扩展基础TypeScript项目结构，添加:
   * - CLI工具目录
   * - 项目检查器
   * - 通用工具函数
   * - 提示词模板文件
   * - 文档目录
   */
  'markdown+cursor-rules': genericMarkdownProjectFileTrees,
}
