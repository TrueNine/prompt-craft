import { describe, expect, it } from 'vitest'
import { camelToKebab } from '../utils'

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
