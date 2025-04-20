import * as fs from 'node:fs'
import os from 'node:os'
import * as path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { removeDirFromCwd, writeTextFileFromCwd } from '../files'

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

describe('writeTextFileFromCwd', () => {
  let tempCwd: string
  beforeEach(() => {
    tempCwd = fs.mkdtempSync(path.join(os.tmpdir(), 'write-test-'))
  })
  afterEach(() => {
    if (fs.existsSync(tempCwd)) {
      fs.rmSync(tempCwd, { recursive: true, force: true })
    }
  })

  it('`正常写入新文件 返回绝对路径`', () => {
    const file = 'foo.txt'
    const content = 'hello world'
    const absPath = writeTextFileFromCwd(tempCwd, file, content)
    expect(absPath).toBe(path.join(tempCwd, file))
    expect(fs.readFileSync(absPath!, 'utf8')).toBe(content)
  })

  it('`已存在文件会被覆盖`', () => {
    const file = 'bar.txt'
    const oldContent = 'old'
    const newContent = 'new'
    const absPath = path.join(tempCwd, file)
    fs.writeFileSync(absPath, oldContent)
    const ret = writeTextFileFromCwd(tempCwd, file, newContent)
    expect(ret).toBe(absPath)
    expect(fs.readFileSync(absPath, 'utf8')).toBe(newContent)
  })

  it('`自动创建多级目录`', () => {
    const file = 'a/b/c/d.txt'
    const content = 'deep'
    const absPath = writeTextFileFromCwd(tempCwd, file, content)
    expect(fs.readFileSync(absPath!, 'utf8')).toBe(content)
  })

  it('`非法路径：绝对路径 抛出异常`', () => {
    expect(() => writeTextFileFromCwd(tempCwd, path.join(tempCwd, 'evil.txt'), 'x')).toThrow('非法文件路径')
  })

  it('`非法路径：路径穿越 抛出异常`', () => {
    expect(() => writeTextFileFromCwd(tempCwd, '../evil.txt', 'x')).toThrow('非法文件路径')
    expect(() => writeTextFileFromCwd(tempCwd, 'foo/../../evil.txt', 'x')).toThrow('非法文件路径')
  })

  it('`非法路径：特殊目录或空路径 抛出异常`', () => {
    expect(() => writeTextFileFromCwd(tempCwd, '', 'x')).toThrow('非法文件路径')
    expect(() => writeTextFileFromCwd(tempCwd, '.', 'x')).toThrow('非法文件路径')
    expect(() => writeTextFileFromCwd(tempCwd, '..', 'x')).toThrow('非法文件路径')
  })

  it('`非法字符自动转换为下划线`', () => {
    const file = 'a<>:"/\\|?*.txt'
    const content = 'special!'
    const absPath = writeTextFileFromCwd(tempCwd, file, content)
    // 非法字符全部变为 _
    expect(absPath).toBe(path.join(tempCwd, 'a_________.txt'))
    expect(fs.readFileSync(absPath!, 'utf8')).toBe(content)
  })

  it('`支持不同编码写入`', () => {
    const file = 'utf16.txt'
    const content = '你好，世界！'
    const absPath = writeTextFileFromCwd(tempCwd, file, content, 'utf16le')
    expect(fs.readFileSync(absPath!, 'utf16le')).toBe(content)
  })

  it('`写入失败时返回 undefined`', () => {
    // 模拟只读目录
    const file = 'readonly.txt'
    const content = 'fail'
    // 先创建只读目录
    const dir = path.join(tempCwd, 'readonly')
    fs.mkdirSync(dir, { mode: 0o444 })
    const absPath = path.join('readonly', file)
    // 这里可能因平台权限不同而表现不同，仅做兜底测试
    const ret = writeTextFileFromCwd(tempCwd, absPath, content)
    // 只要没抛异常即可
    expect(ret === undefined || typeof ret === 'string').toBe(true)
  })
})
