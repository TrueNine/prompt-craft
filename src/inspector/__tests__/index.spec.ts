import type { FileTree } from '../../types'
import { describe, expect, it } from 'vitest'
import { generateFileTreeText } from '../index'

describe('generateFileTreeText', () => {
  it('generateFileTreeText 输入单个文件 返回正确的文件树文本', () => {
    const fileTree: FileTree = {
      path: 'test.txt',
      type: 'file',
      description: '测试文件',
    }
    const expected = 'test.txt #测试文件\n'
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入空目录 返回仅包含目录名的文本', () => {
    const fileTree: FileTree = {
      path: 'empty',
      type: 'directory',
      children: [],
    }
    const expected = 'empty/\n'
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入带子文件的目录 返回正确的树形结构文本', () => {
    const fileTree: FileTree = {
      path: 'root',
      type: 'directory',
      children: [
        {
          path: 'file1.txt',
          type: 'file',
          description: '文件1',
        },
        {
          path: 'file2.txt',
          type: 'file',
        },
      ],
    }
    const expected
= `root/
└─file1.txt #文件1
└─file2.txt\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入嵌套目录结构 返回正确的多层级树形文本', () => {
    const fileTree: FileTree = {
      path: 'root',
      type: 'directory',
      children: [
        {
          path: 'dir1',
          type: 'directory',
          children: [
            {
              path: 'file1.txt',
              type: 'file',
            },
          ],
        },
        {
          path: 'file2.txt',
          type: 'file',
        },
      ],
    }
    const expected
= `root/
└─dir1/
│└─file1.txt
└─file2.txt\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入空白描述 返回不含描述的文件名', () => {
    const fileTree: FileTree = {
      path: 'test.txt',
      type: 'file',
      description: '   ',
    }
    expect(generateFileTreeText(fileTree)).toBe('test.txt\n')
  })

  it('generateFileTreeText 输入复杂嵌套结构 返回完整的树形层级文本', () => {
    const fileTree: FileTree = {
      path: 'project',
      type: 'directory',
      description: '项目根目录',
      children: [
        {
          path: 'src',
          type: 'directory',
          children: [
            {
              path: 'components',
              type: 'directory',
              children: [
                {
                  path: 'Button.tsx',
                  type: 'file',
                  description: '按钮组件',
                },
                {
                  path: 'Input.tsx',
                  type: 'file',
                  description: '输入框组件',
                },
              ],
            },
            {
              path: 'utils',
              type: 'directory',
              children: [
                {
                  path: 'helper.ts',
                  type: 'file',
                },
              ],
            },
          ],
        },
        {
          path: 'README.md',
          type: 'file',
          description: '文档',
        },
      ],
    }
    const expected
= `project/ #项目根目录
└─src/
│└─components/
││└─Button.tsx #按钮组件
││└─Input.tsx #输入框组件
│└─utils/
││└─helper.ts
└─README.md #文档\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入带星号的目录 不添加斜杠', () => {
    const fileTree: FileTree = {
      path: '**/__tests__',
      type: 'directory',
      children: [],
      description: '测试目录',
    }
    const expected = '**/__tests__ #测试目录\n'
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入带星号的目录及其子文件 正确处理目录结构', () => {
    const fileTree: FileTree = {
      path: '**/__tests__',
      type: 'directory',
      description: '测试目录',
      children: [
        {
          path: '*.spec.ts',
          type: 'file',
          description: '测试文件',
        },
        {
          path: 'normal',
          type: 'directory',
          children: [],
        },
      ],
    }
    const expected
= `**/__tests__ #测试目录
└─*.spec.ts #测试文件
└─normal/\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 输入文件树数组 返回按排序规则排序的组合文本', () => {
    const fileTrees: FileTree[] = [
      {
        path: 'file1.txt',
        type: 'file',
        description: '文件1',
      },
      {
        path: 'dir2',
        type: 'directory',
        children: [],
      },
      {
        path: 'dir1',
        type: 'directory',
        children: [],
      },
      {
        path: '*.spec.ts',
        type: 'file',
        description: '测试文件',
      },
    ]
    const expected = `dir1/
dir2/
file1.txt #文件1
*.spec.ts #测试文件\n`
    expect(generateFileTreeText(fileTrees)).toBe(expected)
  })

  it('generateFileTreeText 输入空数组 返回空字符串', () => {
    const fileTrees: FileTree[] = []
    expect(generateFileTreeText(fileTrees)).toBe('')
  })

  it('generateFileTreeText 输入多层级目录数组 返回正确的组合树形结构', () => {
    const fileTrees: FileTree[] = [
      {
        path: 'project1',
        type: 'directory',
        description: '项目1',
        children: [
          {
            path: 'src',
            type: 'directory',
            children: [
              {
                path: 'index.ts',
                type: 'file',
              },
            ],
          },
        ],
      },
      {
        path: 'project2',
        type: 'directory',
        description: '项目2',
        children: [
          {
            path: 'docs',
            type: 'directory',
            children: [
              {
                path: 'README.md',
                type: 'file',
              },
            ],
          },
        ],
      },
    ]
    const expected = `project1/ #项目1
└─src/
│└─index.ts
project2/ #项目2
└─docs/
│└─README.md\n`
    expect(generateFileTreeText(fileTrees)).toBe(expected)
  })

  it('generateFileTreeText 目录内文件按排序规则排序', () => {
    const fileTree: FileTree = {
      path: 'root',
      type: 'directory',
      children: [
        {
          path: 'file2.txt',
          type: 'file',
        },
        {
          path: 'dir2',
          type: 'directory',
          children: [],
        },
        {
          path: 'file1.txt',
          type: 'file',
        },
        {
          path: 'dir1',
          type: 'directory',
          children: [],
        },
        {
          path: '*.test.ts',
          type: 'file',
        },
      ],
    }
    const expected = `root/
└─dir1/
└─dir2/
└─file1.txt
└─file2.txt
└─*.test.ts\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })

  it('generateFileTreeText 复杂嵌套目录保持排序规则', () => {
    const fileTree: FileTree = {
      path: 'src',
      type: 'directory',
      children: [
        {
          path: 'index.ts',
          type: 'file',
        },
        {
          path: '__tests__',
          type: 'directory',
          children: [
            {
              path: 'b.spec.ts',
              type: 'file',
            },
            {
              path: 'a.spec.ts',
              type: 'file',
            },
          ],
        },
        {
          path: 'components',
          type: 'directory',
          children: [
            {
              path: 'Button.vue',
              type: 'file',
            },
            {
              path: 'Input.vue',
              type: 'file',
            },
          ],
        },
      ],
    }
    const expected = `src/
└─__tests__/
│└─a.spec.ts
│└─b.spec.ts
└─components/
│└─Button.vue
│└─Input.vue
└─index.ts\n`
    expect(generateFileTreeText(fileTree)).toBe(expected)
  })
})
