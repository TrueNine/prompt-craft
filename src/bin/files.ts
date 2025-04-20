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
