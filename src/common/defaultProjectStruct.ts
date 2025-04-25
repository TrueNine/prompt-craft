import type { FileTree, LanguageType, ProjectStructure } from '../types'
import { generateFileTreeText } from '../inspector'

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

export const genericTypescriptProjectFileTrees: FileTree[] = [
  ...genericProjectFileTrees,
  {
    path: '**/package.json',
    type: 'file',
    description: 'package.json 文件',
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
      },
      {
        path: '**/test/kotlin/',
        type: 'directory',
        description: 'kotlin 测试代码',
      },
      {
        path: '**/resources/',
        type: 'directory',
        description: '资源文件',
      },
    ],
  },
]

export const defaultProjectStructure: ProjectStructure = {
  'kotlin+spring-boot': [
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
      description: 'jimmer DTO 文件',
    },
  ],
  'typescript+vue': [
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
  ],
  'markdown+cursor-rules': [
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
  ],
}

export const defaultLanguageFiles: { [key in LanguageType]: string } = {
  'kotlin+spring-boot': generateFileTreeText(defaultProjectStructure['kotlin+spring-boot']),
  'typescript+vue': generateFileTreeText(defaultProjectStructure['typescript+vue']),
  'markdown+cursor-rules': generateFileTreeText(defaultProjectStructure['markdown+cursor-rules']),
}
