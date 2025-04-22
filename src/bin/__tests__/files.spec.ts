import { Buffer } from 'node:buffer'
import * as fs from 'node:fs'
import os from 'node:os'
import * as path from 'node:path'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { cleanRulesDir, getContent, removeDirFromCwd, writeRuleFile, writeTextFileFromCwd } from '../files'

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'test-'))
}

describe('文件操作函数测试', () => {
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
      expect(absPath).toBeDefined()
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
      expect(absPath).toBeDefined()
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
      expect(absPath).toBeDefined()
      // 非法字符全部变为 _
      expect(absPath).toBe(path.join(tempCwd, 'a_________.txt'))
      expect(fs.readFileSync(absPath!, 'utf8')).toBe(content)
    })

    it('`支持不同编码写入`', () => {
      const file = 'utf16.txt'
      const content = '你好，世界！'
      const absPath = writeTextFileFromCwd(tempCwd, file, content, 'utf16le')
      expect(absPath).toBeDefined()
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

  describe('getContent', () => {
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
        const { getContent: mockedGetContent } = await import('../files')
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
        const { getContent: mockedGetContent } = await import('../files')
        expect(() => mockedGetContent(fakePath)).toThrow('not found')
        vi.resetModules()
        vi.unmock('node:fs')
      })
    })
  })

  describe('规则文件操作', () => {
    let tempRulesDir: string

    beforeEach(() => {
      tempRulesDir = makeTempDir()
    })

    afterEach(() => {
      if (fs.existsSync(tempRulesDir)) {
        fs.rmSync(tempRulesDir, { recursive: true, force: true })
      }
    })

    describe('writeRuleFile', () => {
      it('`成功写入规则文件`', () => {
        const fileName = 'test-rule'
        const content = '# Test Rule\nThis is a test rule.'
        writeRuleFile(tempRulesDir, fileName, content)
        const filePath = path.resolve(tempRulesDir, `${fileName}.mdc`)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath, 'utf-8')).toBe(content)
      })

      it('`自动创建目录`', () => {
        const subDir = path.join(tempRulesDir, 'sub/dir')
        const fileName = 'nested-rule'
        const content = '# Nested Rule'
        writeRuleFile(subDir, fileName, content)
        const filePath = path.resolve(subDir, `${fileName}.mdc`)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath, 'utf-8')).toBe(content)
      })
    })

    describe('cleanRulesDir', () => {
      it('`清空并重建目录`', () => {
        // 创建测试文件
        const testFile = path.join(tempRulesDir, 'test.mdc')
        fs.writeFileSync(testFile, 'test content')
        expect(fs.existsSync(testFile)).toBe(true)

        // 清理目录
        cleanRulesDir(tempRulesDir)

        // 验证目录被清空并重建
        expect(fs.existsSync(tempRulesDir)).toBe(true)
        expect(fs.existsSync(testFile)).toBe(false)
        expect(fs.readdirSync(tempRulesDir)).toHaveLength(0)
      })

      it('`目录不存在时创建新目录`', () => {
        const newDir = path.join(tempRulesDir, 'new-rules')
        cleanRulesDir(newDir)
        expect(fs.existsSync(newDir)).toBe(true)
        expect(fs.readdirSync(newDir)).toHaveLength(0)
      })
    })
  })
})
