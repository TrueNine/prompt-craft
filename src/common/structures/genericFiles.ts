import type { FileTree } from '../../types'

/**
 * 通用项目文件结构
 *
 * 包含所有项目类型共用的基础文件结构定义，如:
 * - .editorconfig：编辑器配置文件
 * - .gitignore：Git忽略文件
 * - README.md：项目说明文档
 * - LICENSE：许可证文件
 */
export const genericProjectFileTrees: FileTree[] = [
  {
    path: '.editorconfig',
    type: 'file',
    description: 'editorconfig 格式化文件（严格遵照 editorconfig 配置的格式化规则）',
  },
  {
    path: '.gitignore',
    type: 'file',
    description: '.gitignore 文件',
  },
  {
    path: '.cursor/rules',
    type: 'directory',
    description: 'cursor 规则文件',
  },
  {
    path: '.cursorignore',
    type: 'file',
    description: 'cursorignore 文件',
  },
  {
    path: '.gitattributes',
    type: 'file',
    description: '.gitattributes 文件',
  },
  {
    path: 'README.md',
    type: 'file',
    description: '项目说明文档',
  },
  {
    path: 'LICENSE',
    type: 'file',
    description: '许可证文件',
  },
]
