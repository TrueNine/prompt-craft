import type { FileTree } from '../../types'
import { genericProjectFileTrees } from './genericFiles'

const sourceCodeStructs: FileTree[] = [
  {
    path: 'autoconfig',
    type: 'directory',
    description: 'spring boot 自动配置类',
  },
  {
    path: 'entities',
    type: 'directory',
    description: 'jimmer 实体类',
    children: [
      {
        path: 'resolvers',
        type: 'directory',
        description: 'jimmer KTransientResolver 存放目录',
      },
      {
        path: 'resolvers',
        type: 'directory',
        description: 'jimmer KTransientResolver 存放目录',
      },
    ],
  },
  {
    path: 'repositories',
    type: 'directory',
    description: 'jimmer 仓库层',
    children: [
      {
        path: 'I*Repo.[kt|java]',
        type: 'file',
        description: 'jimmer Repository',
      },
    ],
  },
  {
    path: 'services',
    type: 'directory',
    description: '直接的服务类',
  },
  {
    path: 'typing',
    type: 'directory',
    description: '枚举类定义',
  },
]

/**
 * Kotlin项目通用文件结构
 *
 * 包含Kotlin项目特有的文件结构定义，如:
 * - gradle相关文件：build.gradle.kts, settings.gradle.kts等
 * - buildSrc目录：Gradle构建脚本
 * - 源代码目录结构：main/kotlin, test/kotlin等
 * - 构建输出目录：包含生成的代码、资源等
 *
 * 此结构扩展了通用项目文件结构，适用于所有Kotlin项目类型
 * 包含KSP(Kotlin Symbol Processing)和KAPT(Kotlin Annotation Processing)生成目录
 */
export const genericKotlinProjectFileTrees: FileTree[] = [
  ...genericProjectFileTrees,
  {
    path: '**/build.gradle.kts',
    type: 'file',
    description: 'build.gradle.kts 文件',
  },
  {
    path: '**/*settings.gradle.kts',
    type: 'file',
    description: 'settings.gradle.kts 文件',
  },
  {
    path: 'gradle/libs.versions.toml',
    type: 'file',
    description: 'gradle 依赖版本配置文件（重要，所有依赖均在此管理）',
  },
  {
    path: 'gradlew',
    type: 'file',
    description: 'gradlew 文件',
  },
  {
    path: 'gradlew.bat',
    type: 'file',
    description: 'gradlew.bat 文件',
  },
  {
    path: 'buildSrc',
    type: 'directory',
    description: 'buildSrc 目录',
  },
  {
    path: '**/build/',
    type: 'directory',
    description: '构建输出目录',
    children: [
      {
        path: 'generated',
        type: 'directory',
        description: '重要 kotlin 项目生成目录',
        children: [
          {
            path: 'ksp',
            type: 'directory',
            description: 'kotlin 注解处理器生成目录',
            children: [
              {
                path: 'main',
                type: 'directory',
                description: '与 src/main 一致（此目录应被AI索引）',
              },
              {
                path: 'test',
                type: 'directory',
                description: '与 src/test 一致（此目录应被AI索引）',
              },
            ],
          },
          {
            path: 'source',
            type: 'directory',
            description: 'kotlin kapt 生成的目录',
            children: [
              {
                path: 'kapt',
                type: 'directory',
                description: '与 src/ 结构一致',
              },
              {
                path: 'kaptKotlin',
                type: 'directory',
                description: '与 src/ 结构一致',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**/src/',
    type: 'directory',
    description: '源代码目录',
    children: [
      {
        path: '**/main/kotlin/',
        type: 'directory',
        description: 'kotlin 源码',
        children: [
          ...sourceCodeStructs,
        ],
      },
      {
        path: '**/main/java/',
        type: 'directory',
        description: 'java 源码',
        children: [
          ...sourceCodeStructs,
        ],
      },
      {
        path: '**/test/kotlin/',
        type: 'directory',
        description: 'kotlin 测试代码',
      },
      {
        path: '**/test/java/',
        type: 'directory',
        description: 'java 测试代码',
        children: [
          ...sourceCodeStructs,
        ],
      },
      {
        path: '**/[java|kotlin]/resources/',
        type: 'directory',
        description: '资源文件',
      },
    ],
  },
]
