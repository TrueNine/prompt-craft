import type { FileTree } from '../../types'
import { genericTypescriptProjectFileTrees } from './typescriptFiles'

/**
 * Markdown Cursor规则项目文件结构
 *
 * 包含Markdown项目特有的文件结构定义，如:
 * - CLI工具目录
 * - 项目检查器
 * - 通用工具函数
 * - 提示词模板文件
 * - 文档目录
 *
 * 此结构扩展了TypeScript项目文件结构，适用于Markdown Cursor规则项目
 */
export const genericMarkdownProjectFileTrees: FileTree[] = [
  ...genericTypescriptProjectFileTrees,
  {
    path: 'src',
    type: 'directory',
    children: [
      {
        path: 'bin',
        type: 'directory',
        description: 'CLI 命令行工具',
      },
      {
        path: 'inspector',
        type: 'directory',
        description: '项目检查器',
      },
      {
        path: 'common',
        type: 'directory',
        description: '通用工具函数',
      },
      {
        path: 'templates',
        type: 'directory',
        description: '提示词模板文件',
        children: [
          {
            path: 'cursor',
            type: 'directory',
            description: 'Cursor 提示词模板',
            children: [
              {
                path: 'shared',
                type: 'directory',
                description: '全局提示词',
              },
              {
                path: 'common',
                type: 'directory',
                description: '通用可替换嵌入提示词',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'docs',
    type: 'directory',
    description: '临时文档目录',
    children: [],
  },
]
