import { Buffer } from 'node:buffer'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { camelToKebab, getContent } from '../utils'

describe('camelToKebab 驼峰转短横线', () => {
  describe('基础转换', () => {
    it('`驼峰命名转为短横线（默认小写）`', () => {
      expect(camelToKebab('myVariableName')).toBe('my-variable-name')
      expect(camelToKebab('camelCase')).toBe('camel-case')
      expect(camelToKebab('helloWorld')).toBe('hello-world')
      expect(camelToKebab('userId')).toBe('user-id')
      expect(camelToKebab('isHTML')).toBe('is-html')
    })

    it('`全小写单词保持不变`', () => {
      expect(camelToKebab('simple')).toBe('simple')
    })

    it('`首字母大写转为小写`', () => {
      expect(camelToKebab('MyVariableName')).toBe('my-variable-name')
      expect(camelToKebab('CamelCase')).toBe('camel-case')
    })
  })

  describe('特殊情况处理', () => {
    it('`连续大写字母处理`', () => {
      expect(camelToKebab('getHTTPResponse')).toBe('get-http-response')
      expect(camelToKebab('parseURLToID')).toBe('parse-url-to-id')
      expect(camelToKebab('myXMLParser')).toBe('my-xml-parser')
      expect(camelToKebab('parseJSON')).toBe('parse-json')
    })

    it('`包含数字的处理`', () => {
      expect(camelToKebab('version1Number2')).toBe('version1-number2')
      expect(camelToKebab('a1B2C3')).toBe('a1-b2-c3')
      expect(camelToKebab('user123Name')).toBe('user123-name')
      expect(camelToKebab('get2ndItem')).toBe('get2nd-item')
      expect(camelToKebab('article99Comments')).toBe('article99-comments')
    })

    it('`特殊字符处理`', () => {
      expect(camelToKebab('foo$Bar')).toBe('foo$bar')
      expect(camelToKebab('foo_Bar')).toBe('foo-bar')
      expect(camelToKebab('my_variable')).toBe('my-variable')
      expect(camelToKebab('user_ID')).toBe('user-id')
      expect(camelToKebab('parse_XML_String')).toBe('parse-xml-string')
    })

    it('`边界情况处理`', () => {
      expect(camelToKebab('')).toBe('')
      expect(camelToKebab('A')).toBe('a')
      expect(camelToKebab('_')).toBe('_')
      expect(camelToKebab('__')).toBe('__')
      expect(camelToKebab('ABC')).toBe('abc')
    })
  })

  describe('大写模式', () => {
    it('`转换为大写模式`', () => {
      expect(camelToKebab('myVariableName', 'upper')).toBe('MY-VARIABLE-NAME')
      expect(camelToKebab('userId', 'upper')).toBe('USER-ID')
      expect(camelToKebab('isHTML', 'upper')).toBe('IS-HTML')
      expect(camelToKebab('parseJSON', 'upper')).toBe('PARSE-JSON')
      expect(camelToKebab('parse_XML_String', 'upper')).toBe('PARSE-XML-STRING')
      expect(camelToKebab('article99Comments', 'upper')).toBe('ARTICLE99-COMMENTS')
      expect(camelToKebab('A', 'upper')).toBe('A')
    })
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

  describe('data URL 处理', () => {
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

    it('`空内容处理`', () => {
      expect(getContent('data:text/plain;base64,')).toBe('')
      expect(getContent('data:text/plain,')).toBe('')
    })

    it('`非法 data url 抛出异常`', () => {
      expect(() => getContent('data:text/plain;base64')).toThrow()
    })

    it('`export default data url 解码`', () => {
      const raw = `---\ndescription: 测试内容\n---\n正文内容\n`
      const base64 = Buffer.from(raw, 'utf-8').toString('base64')
      expect(getContent(`export default "data:text/markdown;base64,${base64}"`)).toBe(raw)
      expect(getContent(`export default 'data:text/markdown;base64,${base64}'`)).toBe(raw)
    })
  })

  describe('文件系统处理', () => {
    it('`空字符串抛出 empty 异常`', () => {
      vi.mock('node:fs', () => ({
        readFileSync: vi.fn(() => {
          throw new Error('empty')
        }),
      }))
      expect(() => getContent('')).toThrow('empty')
    })

    it('`非 data url 路径返回文件内容`', async () => {
      vi.resetModules()
      vi.stubGlobal('__dirname', fakeDir)
      const fakePath = 'test.txt'
      const fakeContent = 'file content!'
      vi.doMock('node:fs', () => ({
        readFileSync: vi.fn(() => fakeContent),
      }))
      const { getContent: mockedGetContent } = await import('../utils')
      expect(mockedGetContent(fakePath)).toBe(fakeContent)
      vi.resetModules()
      vi.unmock('node:fs')
    })

    it('`文件不存在抛出 not found 异常`', async () => {
      vi.resetModules()
      vi.stubGlobal('__dirname', fakeDir)
      const fakePath = 'notfound.txt'
      vi.doMock('node:fs', () => ({
        readFileSync: vi.fn(() => {
          throw new Error('not found')
        }),
      }))
      const { getContent: mockedGetContent } = await import('../utils')
      expect(() => mockedGetContent(fakePath)).toThrow('not found')
      vi.resetModules()
      vi.unmock('node:fs')
    })
  })
})
