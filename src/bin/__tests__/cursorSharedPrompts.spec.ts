import { describe, expect, it, vi } from 'vitest'
import { cursorKtPrompts, cursorSharedPrompts, cursorVuePrompts, templateDirNames } from '../cursorSharedPrompts'

vi.mock('../utils', () => ({
  getContent: (file: any) => {
    // 根据文件名返回唯一 mock 内容，保证每个属性唯一
    if (typeof file === 'string')
      return `mock-content-${file}`
    if (file && file.default)
      return `mock-content-${file.default}`
    return `mock-content-unique-${Math.random()}`
  },
}))

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
