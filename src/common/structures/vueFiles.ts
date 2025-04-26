import type { FileTree } from '../../types'
import { genericTypescriptProjectFileTrees } from './typescriptFiles'

/**
 * TypeScript Vue项目文件结构
 *
 * 包含Vue项目特有的文件结构定义，如:
 * - Vue组件目录结构
 * - API请求定义
 * - Pinia状态管理
 * - 布局和视图组件
 * - Jimmer生成的客户端API
 *
 * 此结构扩展了TypeScript项目文件结构，适用于TypeScript Vue项目
 */
export const genericVueProjectFileTrees: FileTree[] = [
  ...genericTypescriptProjectFileTrees,
  {
    path: '**/src/',
    type: 'directory',
    children: [
      {
        path: 'api',
        type: 'directory',
        description: '网络请求定义',
      },
      {
        path: 'components',
        type: 'directory',
        description: '自定义公共组件（至少被引用5次）',
      },
      {
        path: 'store',
        type: 'directory',
        description: 'pinia 状态管理',
        children: [
          {
            path: 'modules/*.ts',
            type: 'file',
            description: '状态管理模块',
          },
        ],
      },
      {
        path: 'views',
        type: 'directory',
        description: '自定义公共视图（至少被引用5次）',
      },
      {
        path: 'layouts',
        type: 'directory',
        description: '自定义公共布局（至少被引用5次）',
      },
      {
        path: 'pages',
        type: 'directory',
        description: '网页页面（自动路由）',
        children: [
          {
            path: '**/*View.vue',
            type: 'file',
            description: '同网页拆分视图，位于同名路由目录下',
          },
        ],
      },
    ],
  },
  {
    path: '**/src/__generated/',
    type: 'directory',
    description: 'jimmer 生成的 client API 代码',
    children: [
      {
        path: 'model',
        type: 'directory',
        description: 'jimmer 生成的 client API 模型，网络请求响应需要使用这些类型',
        children: [
          {
            path: 'dto/*.ts',
            type: 'file',
            description: 'jimmer 生成的 client API DTO',
          },
          {
            path: 'embeddable/*.ts',
            type: 'file',
            description: 'jimmer 生成的 client API 嵌入式对象 类型定义',
          },
          {
            path: 'dynamic/*.ts',
            type: 'file',
            description: 'jimmer 生成的 client API 数据库实体模型 类型定义',
          },
          {
            path: 'enums/*.ts',
            type: 'file',
            description: 'jimmer 生成的 client API 枚举 类型定义',
          },
          {
            path: 'static/*.ts',
            type: 'file',
            description: 'jimmer 生成的 client API View 类型定义',
          },
        ],
      },
      {
        path: 'services/*.ts',
        type: 'file',
        description: 'jimmer 生成的 client API 网络请求服务',
      },
    ],
  },
]
