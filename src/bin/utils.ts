import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function getContent(input: string): string {
  if (input.startsWith('data:')) {
    const match = input.match(/^data:.*?;base64,(.*)$/)
    if (match) {
      return Buffer.from(match[1], 'base64').toString('utf-8')
    } else {
      const idx = input.indexOf(',')
      return decodeURIComponent(input.slice(idx + 1))
    }
  } else {
    return readFileSync(resolve(__dirname, input), 'utf-8')
  }
}

/**
 * 将驼峰命名（camelCase）转换为小写烤串命名（kebab-case）
 * 例如：myVariableName -> my-variable-name
 */
export function camelToKebab(str: string): string {
  if (!str) return ''
  // 下划线后跟大写字母，先变 _-，后续再修正
  let result = str.replace(/_([A-Z])/g, '_-$1')
  // 其它所有大写前加 -
  result = result.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  result = result.replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
  result = result.replace(/([^a-zA-Z0-9\-_])([A-Z])/g, '$1-$2')
  result = result.replace(/([A-Z])/g, '-$1')
  // 合并多余的 -，去头部 -
  result = result.replace(/-+/g, '-')
  result = result.replace(/^-+/, '')
  // 小写化
  result = result.toLowerCase()
  // _- 还原成 -_
  return result.replace(/_-/g, '-_')
}
