import type { FileTree } from '../../types'
import { genericProjectFileTrees } from './genericFiles'

/**
 * TypeScript项目通用文件结构
 *
 * 包含TypeScript项目特有的文件结构定义，如:
 * - package.json：项目依赖配置
 * - src目录结构：源代码目录
 * - 测试文件目录结构
 * - 类型定义目录
 *
 * 此结构扩展了通用项目文件结构，适用于所有TypeScript项目类型
 */
export const genericTypescriptProjectFileTrees: FileTree[] = [
  ...genericProjectFileTrees,
  {
    path: '**/package.json',
    type: 'file',
    description: 'package.json 文件',
  },
  {
    path: 'eslint.config.*',
    type: 'file',
    description: 'eslint 配置文件',
  },
  {
    path: 'vite.config.*',
    type: 'file',
    description: 'vite 配置文件',
  },
  {
    path: '**/src/',
    type: 'directory',
    description: '源代码目录',
    children: [
      {
        path: '**/__tests__/',
        type: 'directory',
        description: '测试文件',
        children: [
          {
            path: '**/*.spec.ts',
            type: 'file',
            description: '测试文件',
          },
        ],
      },
      {
        path: 'types',
        type: 'directory',
        description: '类型定义（至少被引用10次）',
      },
      {
        path: '**/index.ts',
        type: 'file',
        description: '当前文件夹入口文件',
      },
    ],
  },
]
