import { Buffer } from 'node:buffer'
import * as fs from 'node:fs'
import * as path from 'node:path'
import processModule from 'node:process'

/**
 * 删除指定目录（基于当前命令行执行的根路径）
 * @param dir 相对根路径的目录名
 * @param cwd 当前命令行执行的根路径
 */
export function removeDirFromCwd(dir: string, cwd: string = processModule.cwd()): void {
  const targetPath = path.join(cwd, dir)
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
}

/**
 * 写入并创建文本文件（基于当前命令行执行的根路径）
 * @param cwd 当前命令行执行的根路径
 * @param filepath 相对根路径的文件路径
 * @param content 要写入的内容
 * @param encoding 编码格式，默认为 'utf8'
 */
export function writeTextFileFromCwd(
  cwd: string = processModule.cwd(),
  filepath: string,
  content: string,
  encoding: BufferEncoding = 'utf8',
): string | undefined {
  let safeFilepath = filepath.trim()
  // 先校验路径是否合法
  if (!safeFilepath || safeFilepath === '.' || safeFilepath === '..') {
    throw new Error('非法文件路径：路径为空或为特殊目录')
  }
  if (path.isAbsolute(safeFilepath) || safeFilepath.includes('..')) {
    throw new Error('非法文件路径：禁止绝对路径或路径穿越')
  }
  // 校验通过后再替换非法字符
  safeFilepath = safeFilepath.replace(/[<>:"/\\|?*]/g, '_')
  const targetPath = path.join(cwd, safeFilepath)
  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
    fs.writeFileSync(targetPath, content, { encoding })
    return targetPath
  } catch {
    return void 0
  }
}

/**
 * 获取文件内容，支持 data URL 和文件路径
 * @param input 输入内容（data URL 或文件路径）
 * @param cwd 当前工作目录
 * @returns 解析后的内容
 */
export function getContent(input: string, cwd: string = processModule.cwd()): string {
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
  return fs.readFileSync(path.resolve(cwd, input), 'utf-8')
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
    fs.mkdirSync(rulesDir, { recursive: true })

    // 写入文件
    const filePath = path.resolve(rulesDir, `${fileName}.mdc`)
    fs.writeFileSync(filePath, content, 'utf-8')
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
    fs.rmSync(rulesDir, { recursive: true, force: true })
    fs.mkdirSync(rulesDir, { recursive: true })
  } catch (error) {
    console.error('清理规则目录失败', error)
    throw error
  }
}
