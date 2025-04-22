import { Buffer } from 'node:buffer'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

export function getContent(input: string, cwd: string = process.cwd()): string {
  if (!input) {
    throw new Error('empty')
  }
  if (input.startsWith('export default "data:') || input.startsWith('export default \'data:')) {
    const match = input.match(/^export default ["'](data:.*)["']$/)
    if (!match)
      throw new Error('Invalid export default data url')
    input = match[1]
  }
  if (input.startsWith('data:')) {
    const base64Match = input.match(/^data:.*?;base64,(.*)$/)
    if (base64Match) {
      return base64Match[1] ? Buffer.from(base64Match[1], 'base64').toString('utf-8') : ''
    }
    const idx = input.indexOf(',')
    if (idx === -1)
      throw new Error('Invalid data url: missing comma')
    const data = input.slice(idx + 1)
    return data ? decodeURIComponent(data) : ''
  }
  return readFileSync(resolve(cwd, input), 'utf-8')
}

/**
 * 将驼峰命名（camelCase）转换为小写烤串命名（kebab-case）
 * 例如：myVariableName -> my-variable-name
 */
export function camelToKebab(str: string): string {
  if (!str) {
    return ''
  }
  // 下划线后跟大写字母，先变 _-，后续再修正
  let result = str.replace(/_([A-Z])/g, '_-$1')
  // 其它所有大写前加 -
  result = result.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  result = result.replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
  result = result.replace(/([^\w\-])([A-Z])/g, '$1-$2')
  result = result.replace(/([A-Z])/g, '-$1')
  // 合并多余的 -，去头部 -
  result = result.replace(/-+/g, '-')
  result = result.replace(/^-+/, '')
  // 小写化
  result = result.toLowerCase()
  // _- 还原成 -_
  return result.replace(/_-/g, '-_')
}

/**
 * 写入规则文件到指定目录
 * @param rulesDir 规则文件目录
 * @param fileName 文件名
 * @param content 文件内容
 */
export function writeRuleFile(rulesDir: string, fileName: string, content: string): void {
  try {
    // 确保目录存在
    mkdirSync(rulesDir, { recursive: true })

    // 写入文件
    const filePath = resolve(rulesDir, `${fileName}.mdc`)
    writeFileSync(filePath, content, 'utf-8')
  } catch (error) {
    console.error(`写入规则文件失败: ${fileName}`, error)
    throw error
  }
}

/**
 * 清理规则目录
 * @param rulesDir 规则文件目录
 */
export function cleanRulesDir(rulesDir: string): void {
  try {
    rmSync(rulesDir, { recursive: true, force: true })
    mkdirSync(rulesDir, { recursive: true })
  } catch (error) {
    console.error('清理规则目录失败', error)
    throw error
  }
}
