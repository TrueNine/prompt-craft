import { describe, it, expect } from 'vitest'
import { camelToKebab } from '../utils'


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
