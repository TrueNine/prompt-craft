import {
  defaultLanguageFiles,
  defaultProjectStructure,
  genericKotlinProjectFileTrees,
  genericProjectFileTrees,
  genericTypescriptProjectFileTrees,
} from './structures'

/**
 * 项目结构定义模块
 *
 * 从./structures/目录导入并重新导出所有项目结构相关定义
 * 包括:
 * - genericProjectFileTrees: 通用项目文件结构
 * - genericTypescriptProjectFileTrees: TypeScript项目文件结构
 * - genericKotlinProjectFileTrees: Kotlin项目文件结构
 * - defaultProjectStructure: 各类型项目默认结构
 * - defaultLanguageFiles: 各语言类型文件结构文本
 *
 * 此模块作为项目结构定义的统一入口点
 */
export {
  defaultLanguageFiles,
  defaultProjectStructure,
  genericKotlinProjectFileTrees,
  genericProjectFileTrees,
  genericTypescriptProjectFileTrees,
}
