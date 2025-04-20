import * as fs from 'node:fs'
import os from 'node:os'
import * as path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { removeDirFromCwd } from '../files'

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'remove-test-'))
}

describe('removeDirFromCwd', () => {
  let tempCwd: string
  let targetDir: string

  beforeEach(() => {
    tempCwd = makeTempDir()
    targetDir = path.join(tempCwd, 'todelete')
    fs.mkdirSync(targetDir)
    fs.writeFileSync(path.join(targetDir, 'file.txt'), 'hello')
  })

  afterEach(() => {
    // 尝试清理临时目录
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true })
    }
    if (fs.existsSync(tempCwd)) {
      fs.rmSync(tempCwd, { recursive: true, force: true })
    }
  })

  it('能删除指定目录', () => {
    expect(fs.existsSync(targetDir)).toBe(true)
    removeDirFromCwd('todelete', tempCwd)
    expect(fs.existsSync(targetDir)).toBe(false)
  })

  it('目录不存在时不抛异常', () => {
    removeDirFromCwd('not-exist', tempCwd)
    expect(fs.existsSync(path.join(tempCwd, 'not-exist'))).toBe(false)
  })
})
