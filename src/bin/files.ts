import * as fs from 'node:fs'
import * as path from 'node:path'

import processModule from 'node:process'

/**
 * 删除指定目录（基于当前命令行执行的根路径）
 * @param dir 相对根路径的目录名
 * @param cwd 当前命令行执行的根路径
 */
export function removeDirFromCwd(dir: string, cwd: string = processModule.cwd() ): void {
  const targetPath = path.join(cwd, dir)
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
}
