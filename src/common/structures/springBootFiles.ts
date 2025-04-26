import type { FileTree } from '../../types'
import { genericKotlinProjectFileTrees } from './kotlinFiles'

/**
 * Kotlin Spring Boot项目文件结构
 *
 * 包含Spring Boot项目特有的文件结构定义，如:
 * - Spring Boot配置文件
 * - Jimmer DTO文件
 *
 * 此结构扩展了Kotlin项目文件结构，适用于Kotlin Spring Boot项目
 */
export const genericSpringBootProjectFileTrees: FileTree[] = [
  ...genericKotlinProjectFileTrees,
  {
    path: '**/src/[main|test]/resources/',
    type: 'directory',
    description: '资源目录',
    children: [
      {
        path: '**/application.[yml|yaml|properties]',
        type: 'file',
        description: 'spring boot 配置文件',
      },
    ],
  },
  {
    path: '**/src/[main|test]/dto/**.dto',
    type: 'file',
    description: 'jimmer DTO 文件（自动生成到 build/generated/ksp/ 下）',
  },
]
