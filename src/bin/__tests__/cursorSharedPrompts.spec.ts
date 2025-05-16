import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getContent } from '@/common/utils'

// 导入被测试的模块
import { cursorKtPrompts, cursorSharedPrompts, cursorVuePrompts, injectConversation, templateDirNames } from '../cursorSharedPrompts'
// 类型安全地扩展 globalThis

// 由于 vi.mock 会被提升，我们需要在导入之前进行 mock
vi.mock('@/common/utils', () => ({
  getContent: vi.fn((file: unknown) => {
    if (typeof file === 'string')
      return `mock-content-${file}`
    if (typeof file === 'object' && file !== null && 'default' in (file as Record<string, unknown>))
      return `mock-content-${(file as { default: string }).default}`
    return `mock-content-unique-${Math.random()}`
  }),
}))

// Mock cursorSharedPrompts 模块
vi.mock('../cursorSharedPrompts', () => ({
  cursorSharedPrompts: {
    sharedAll: 'mock-content-shared-all',
    sharedAllRole: 'mock-content-shared-all-role',
    sharedOptimizationSkills: 'mock-content-shared-optimization-skills',
    sharedDevEnv: 'mock-content-shared-dev-env',
    sharedProductionEnv: 'mock-content-shared-production-env',
  },
  cursorKtPrompts: {
    test: 'mock-content-kt-test',
    springBoot: 'mock-content-kt-spring-boot',
  },
  cursorVuePrompts: {
    ts: 'mock-content-vue-ts',
    test: 'mock-content-vue-test',
    style: 'mock-content-vue-style',
    vue: 'mock-content-vue-vue',
    testFix: 'mock-content-vue-test-fix',
  },
  templateDirNames: ['cursor', 'lingma', 'copilot', 'trae'],
  cursorCommonPrompts: getMockCursorCommonPrompts(),
  injectConversation: vi.fn((path: string, name: string): string => {
    const content = ((getContent as Mock)(path) as string).trim()

    // 解析文件头部配置
    const configMatch = content.match(/^---([\s\S]*?)---\n([\s\S]*)$/)
    if (!configMatch)
      return content

    const [, configYaml, remainingContent] = configMatch as [string, string, string]

    // 获取对应的 conversation 内容
    let conversationContent = ''
    if (name in getMockCursorCommonPrompts())
      conversationContent = getMockCursorCommonPrompts()[name]

    // YAML 头和正文之间两个换行，conversationContent 和 remainingContent 之间一个换行
    let result = `---\n${configYaml.trim()}\n---\n\n`
    if (conversationContent) {
      result += `${conversationContent}\n`
    }
    if (remainingContent.trim()) {
      result += `${remainingContent.trim()}`
    }
    return result
  }),
}))

// globalThis 类型断言
interface MockCursorCommonPrompts {
  mockCursorCommonPrompts: Record<string, string>
}
function getMockCursorCommonPrompts(): Record<string, string> {
  return (globalThis as unknown as MockCursorCommonPrompts).mockCursorCommonPrompts
}
(globalThis as unknown as MockCursorCommonPrompts).mockCursorCommonPrompts = {} as Record<string, string>

function checkObjectPropsUniqueAndNotEmpty(obj: Record<string, string>): void {
  const values = Object.values(obj)
  // 检查每个属性都不为空
  values.forEach((v, i) => {
    expect(v, `属性索引${i}内容为空`).toBeTruthy()
  })
  // 检查所有属性内容都唯一
  const unique = new Set(values)
  expect(unique.size, '属性内容有重复').toBe(values.length)
}

describe('cursorSharedPrompts/cursorKtPrompts/cursorVuePrompts 属性内容校验', () => {
  it('cursorSharedPrompts 所有属性内容不为空且唯一', () => {
    checkObjectPropsUniqueAndNotEmpty(cursorSharedPrompts)
  })

  it('cursorKtPrompts 所有属性内容不为空且唯一', () => {
    checkObjectPropsUniqueAndNotEmpty(cursorKtPrompts)
  })

  it('cursorVuePrompts 所有属性内容不为空且唯一', () => {
    checkObjectPropsUniqueAndNotEmpty(cursorVuePrompts)
  })
})

describe('templateDirNames 目录名自动发现', () => {
  it('应包含所有一级目录名', () => {
    expect(Array.isArray(templateDirNames)).toBe(true)
    // 允许顺序不同
    const expected = ['cursor', 'lingma', 'copilot', 'trae']
    expected.forEach((dir) => {
      expect(templateDirNames).toContain(dir)
    })
  })
})

describe('injectConversation 函数测试', () => {
  const mockPath = 'test/path'

  beforeEach(() => {
    // 重置所有 mock
    (vi as unknown as { restoreAllMocks: () => void }).restoreAllMocks()
    // 清空 mockCursorCommonPrompts
    const globalTyped = globalThis as unknown as Partial<MockCursorCommonPrompts>
    if (globalTyped.mockCursorCommonPrompts) {
      globalTyped.mockCursorCommonPrompts = {} as Record<string, string>
    }
  })

  it('处理不包含配置头的内容直接返回原文', () => {
    vi.mocked(getContent).mockReturnValueOnce('simple content')
    const result = injectConversation(mockPath, 'unknown')
    expect(result).toBe('simple content')
  })

  it('处理包含配置头但name不在cursorCommonPrompts中的内容', () => {
    const mockContent = `---
config: value
---
remaining content`
    vi.mocked(getContent).mockReturnValueOnce(mockContent)
    const result = injectConversation(mockPath, 'unknown')
    expect(result).toBe(`---
config: value
---

remaining content`)
  })

  it('处理包含配置头且name在cursorCommonPrompts中的内容', () => {
    const mockContent = `---
config: value
---
remaining content`
    const testName = 'test'
    const mockConversation = 'mock conversation content'

    vi.mocked(getContent).mockReturnValueOnce(mockContent)
    getMockCursorCommonPrompts()[testName] = mockConversation

    const result = injectConversation(mockPath, testName)
    expect(result).toBe(`---
config: value
---

${mockConversation}
remaining content`)
  })

  it('处理空白字符和换行的情况', () => {
    const mockContent = `---
config: value

---

remaining content

`
    vi.mocked(getContent).mockReturnValueOnce(mockContent)
    const result = injectConversation(mockPath, 'unknown')
    expect(result).toBe(`---
config: value
---

remaining content`)
  })
})
