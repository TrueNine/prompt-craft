import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { camelToKebab } from '../utils'
import { getContent } from '../utils'
import * as fs from 'node:fs'
import * as path from 'node:path'

describe('camelToKebab', () => {
  it('普通驼峰命名', () => {
    expect(camelToKebab('myVariableName')).toBe('my-variable-name')
    expect(camelToKebab('camelCase')).toBe('camel-case')
    expect(camelToKebab('helloWorld')).toBe('hello-world')
  })

  it('单词全小写', () => {
    expect(camelToKebab('simple')).toBe('simple')
  })

  it('包含数字', () => {
    expect(camelToKebab('version1Number2')).toBe('version1-number2')
    expect(camelToKebab('a1B2C3')).toBe('a1-b2-c3')
  })

  it('首字母大写', () => {
    expect(camelToKebab('MyVariableName')).toBe('my-variable-name')
    expect(camelToKebab('CamelCase')).toBe('camel-case')
  })

  it('连续大写字母', () => {
    expect(camelToKebab('getHTTPResponse')).toBe('get-h-t-t-p-response')
    expect(camelToKebab('parseURLToID')).toBe('parse-u-r-l-to-i-d')
  })

  it('空字符串', () => {
    expect(camelToKebab('')).toBe('')
  })

  it('特殊字符混合', () => {
    expect(camelToKebab('foo$Bar')).toBe('foo$-bar')
    expect(camelToKebab('foo_Bar')).toBe('foo-_bar')
  })

  it('已是 kebab-case', () => {
    expect(camelToKebab('already-kebab-case')).toBe('already-kebab-case')
  })

  it('全大写', () => {
    expect(camelToKebab('ABC')).toBe('a-b-c')
  })
})

// mock __dirname
const fakeDir = '/fake/dir'
vi.stubGlobal('__dirname', fakeDir)

// 修正 path.resolve 的 mock，避免 TypeError
vi.mock('node:path', async (importOriginal) => {
  const mod: any = await importOriginal()
  return {
    ...mod,
    resolve: vi.fn((...args: any[]) => mod.resolve(...args)),
  }
})

// 修正 fs.readFileSync 的 mock，避免 TypeError
vi.mock('node:fs', async (importOriginal) => {
  const mod: any = await importOriginal()
  return {
    ...mod,
    readFileSync: vi.fn((...args: any[]) => mod.readFileSync(...args)),
  }
})

describe('getContent', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should decode base64 data url', () => {
    const str = 'hello, 世界!'
    const base64 = Buffer.from(str, 'utf-8').toString('base64')
    const input = `data:text/plain;base64,${base64}`
    expect(getContent(input)).toBe(str)
  })

  it('should decode non-base64 data url', () => {
    const str = 'hello, 世界!'
    const encoded = encodeURIComponent(str)
    const input = `data:text/plain,${encoded}`
    expect(getContent(input)).toBe(str)
  })

  it('should decode data url with extra params', () => {
    const str = 'foo-bar'
    const encoded = encodeURIComponent(str)
    const input = `data:text/plain;charset=utf-8,${encoded}`
    expect(getContent(input)).toBe(str)
  })

  it('should handle malformed base64 data url gracefully', () => {
    const input = 'data:text/plain;base64,' // 没有内容
    expect(getContent(input)).toBe('')
  })

  it('should decode data url with comma but no data', () => {
    const input = 'data:text/plain,'
    expect(getContent(input)).toBe('')
  })

  it('should read file content if not data url', () => {
    const fakePath = 'test.txt'
    const fakeContent = 'file content!'
    const resolvedPath = path.resolve(fakeDir, fakePath)
    vi.spyOn(path, 'resolve').mockReturnValue(resolvedPath)
    vi.spyOn(fs, 'readFileSync').mockReturnValue(fakeContent)
    expect(getContent(fakePath)).toBe(fakeContent)
    expect(fs.readFileSync).toHaveBeenCalledWith(resolvedPath, 'utf-8')
  })

  it('should throw if file not found', () => {
    const fakePath = 'notfound.txt'
    vi.spyOn(path, 'resolve').mockReturnValue('/notfound.txt')
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => { throw new Error('not found') })
    expect(() => getContent(fakePath)).toThrow('not found')
  })

  it('should handle empty string input', () => {
    // 这里会尝试读取文件，应该抛错
    vi.spyOn(path, 'resolve').mockReturnValue('/empty')
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => { throw new Error('empty') })
    expect(() => getContent('')).toThrow('empty')
  })

  it('should handle data: without comma', () => {
    // 这种格式其实不合法，decodeURIComponent 会抛错
    const input = 'data:text/plain;base64'
    expect(() => getContent(input)).toThrow()
  })
})
