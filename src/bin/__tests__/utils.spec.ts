import { Buffer } from 'node:buffer'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { camelToKebab, getContent } from '../utils'

describe('camelToKebab 驼峰转短横线', () => {
  it('`myVariableName/camelCase/helloWorld 转为 kebab-case`', () => {
    expect(camelToKebab('myVariableName')).toBe('my-variable-name')
    expect(camelToKebab('camelCase')).toBe('camel-case')
    expect(camelToKebab('helloWorld')).toBe('hello-world')
  })

  it('`全小写单词保持不变 simple => simple`', () => {
    expect(camelToKebab('simple')).toBe('simple')
  })

  it('`包含数字 version1Number2/a1B2C3 转为 version1-number2/a1-b2-c3`', () => {
    expect(camelToKebab('version1Number2')).toBe('version1-number2')
    expect(camelToKebab('a1B2C3')).toBe('a1-b2-c3')
  })

  it('`首字母大写 MyVariableName/CamelCase 转为 kebab-case`', () => {
    expect(camelToKebab('MyVariableName')).toBe('my-variable-name')
    expect(camelToKebab('CamelCase')).toBe('camel-case')
  })

  it('`连续大写字母 getHTTPResponse/parseURLToID 转为 kebab-case`', () => {
    expect(camelToKebab('getHTTPResponse')).toBe('get-h-t-t-p-response')
    expect(camelToKebab('parseURLToID')).toBe('parse-u-r-l-to-i-d')
  })

  it('`空字符串返回空字符串`', () => {
    expect(camelToKebab('')).toBe('')
  })

  it('`特殊字符混合 foo$Bar/foo_Bar 转为 foo$-bar/foo-_bar`', () => {
    expect(camelToKebab('foo$Bar')).toBe('foo$-bar')
    expect(camelToKebab('foo_Bar')).toBe('foo-_bar')
  })

  it('`已是 kebab-case 保持不变 already-kebab-case`', () => {
    expect(camelToKebab('already-kebab-case')).toBe('already-kebab-case')
  })

  it('`全大写 ABC 转为 a-b-c`', () => {
    expect(camelToKebab('ABC')).toBe('a-b-c')
  })
})

describe('getContent 获取内容', () => {
  const fakeDir = '/fake/dir'

  beforeAll(() => {
    vi.stubGlobal('__dirname', fakeDir)
  })

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('`base64 data url 解码`', () => {
    const raw = 'hello, 世界!'
    const base64 = Buffer.from(raw, 'utf-8').toString('base64')
    const input = `data:text/plain;base64,${base64}`
    expect(getContent(input)).toBe(raw)
  })

  it('`非 base64 data url 解码`', () => {
    const raw = 'hello, 世界!'
    const encoded = encodeURIComponent(raw)
    const input = `data:text/plain,${encoded}`
    expect(getContent(input)).toBe(raw)
  })

  it('`带参数 data url 解码`', () => {
    const raw = 'foo-bar'
    const encoded = encodeURIComponent(raw)
    const input = `data:text/plain;charset=utf-8,${encoded}`
    expect(getContent(input)).toBe(raw)
  })

  it('`base64 data url 内容为空返回空字符串`', () => {
    const input = 'data:text/plain;base64,'
    expect(getContent(input)).toBe('')
  })

  it('`data url 逗号后无内容返回空字符串`', () => {
    const input = 'data:text/plain,'
    expect(getContent(input)).toBe('')
  })

  it('`空字符串抛出 empty 异常`', () => {
    vi.mock('node:fs', () => ({
      readFileSync: vi.fn(() => {
        throw new Error('empty')
      }),
    }))
    expect(() => getContent('')).toThrow('empty')
  })

  it('`非法 data url 抛出异常`', () => {
    const input = 'data:text/plain;base64'
    expect(() => getContent(input)).toThrow()
  })
})

it('`非 data url 路径 test.txt 返回文件内容`', async () => {
  vi.resetModules()
  const fakeDir = '/fake/dir'
  vi.stubGlobal('__dirname', fakeDir)
  const fakePath = 'test.txt'
  const fakeContent = 'file content!'
  vi.doMock('node:fs', () => ({
    readFileSync: vi.fn(() => fakeContent),
  }))
  const { getContent } = await import('../utils')
  expect(getContent(fakePath)).toBe(fakeContent)
  vi.resetModules()
  vi.unmock('node:fs')
})

it('`文件不存在 notfound.txt 抛出 not found 异常`', async () => {
  vi.resetModules()
  const fakeDir = '/fake/dir'
  vi.stubGlobal('__dirname', fakeDir)
  const fakePath = 'notfound.txt'
  vi.doMock('node:fs', () => ({
    readFileSync: vi.fn(() => {
      throw new Error('not found')
    }),
  }))
  const { getContent } = await import('../utils')
  expect(() => getContent(fakePath)).toThrow('not found')
  vi.resetModules()
  vi.unmock('node:fs')
})
