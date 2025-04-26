import type { LanguageType } from '../../types'
import { generateFileTreeText } from '../../inspector'
import { defaultProjectStructure } from './projectStructures'

/**
 * 默认语言文件映射
 *
 * 为每种支持的语言类型提供文本格式的文件树结构
 * 使用generateFileTreeText函数将文件树结构对象转换为文本表示
 *
 * 包含以下语言类型:
 * - kotlin+spring-boot: Kotlin Spring Boot项目文件结构文本
 * - typescript+vue: TypeScript Vue项目文件结构文本
 * - markdown+cursor-rules: Markdown Cursor规则项目文件结构文本
 *
 * 用于生成项目结构说明文档或初始化模板
 */
export const defaultLanguageFiles: { [key in LanguageType]: string } = {
  'kotlin+spring-boot': generateFileTreeText(defaultProjectStructure['kotlin+spring-boot']),
  'typescript+vue': generateFileTreeText(defaultProjectStructure['typescript+vue']),
  'markdown+cursor-rules': generateFileTreeText(defaultProjectStructure['markdown+cursor-rules']),
}
