import type { GlobOptions } from '../glob'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { clearGlobCache, glob, globFromDir } from '../glob'

describe('glob 模块', () => {
  let testDir: string

  beforeEach(() => {
    testDir = join(tmpdir(), `glob-test-${Date.now()}`)
    mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
    clearGlobCache()
  })

  const createTestFile = (relativePath: string, content = ''): void => {
    const fullPath = join(testDir, relativePath)
    mkdirSync(join(fullPath, '..'), { recursive: true })
    writeFileSync(fullPath, content)
  }

  describe('glob 函数', () => {
    it('输入单个文件模式 返回匹配的文件路径', () => {
      createTestFile('test.txt')
      const results = glob('*.txt', {}, testDir)
      expect(results).toEqual(['test.txt'])
    })

    it('输入通配符模式 返回所有匹配的文件路径', () => {
      createTestFile('test1.txt')
      createTestFile('test2.txt')
      createTestFile('other.js')
      const results = glob('*.txt', {}, testDir)
      expect(results).toHaveLength(2)
      expect(results).toContain('test1.txt')
      expect(results).toContain('test2.txt')
    })

    it('输入多个模式 返回所有匹配的文件路径', () => {
      createTestFile('test.txt')
      createTestFile('test.js')
      const results = glob(['*.txt', '*.js'], {}, testDir)
      expect(results).toHaveLength(2)
      expect(results).toContain('test.txt')
      expect(results).toContain('test.js')
    })

    it('输入点文件模式 根据配置正确处理', () => {
      createTestFile('.hidden')
      const withDot = glob('.*', { dot: true }, testDir)
      expect(withDot).toContain('.hidden')

      const withoutDot = glob('.*', { dot: false }, testDir)
      expect(withoutDot).toHaveLength(0)
    })

    it('输入递归模式 返回所有层级的匹配文件', () => {
      createTestFile('dir1/test.txt')
      createTestFile('dir1/dir2/test.txt')
      const results = glob('**/*.txt', {}, testDir)
      expect(results).toHaveLength(2)
      expect(results).toContain('dir1/test.txt')
      expect(results).toContain('dir1/dir2/test.txt')
    })

    it('启用缓存时 返回缓存的结果', () => {
      createTestFile('test.txt')
      const firstResults = glob('*.txt', { cache: true }, testDir)
      createTestFile('test2.txt')
      const secondResults = glob('*.txt', { cache: true }, testDir)
      expect(secondResults).toEqual(firstResults)

      clearGlobCache()
      const freshResults = glob('*.txt', { cache: true }, testDir)
      expect(freshResults).toHaveLength(2)
    })

    it('设置忽略模式 排除匹配的文件', () => {
      createTestFile('test.txt')
      createTestFile('ignore.txt')
      const results = glob('*.txt', { ignore: ['ignore.txt'] }, testDir)
      expect(results).toEqual(['test.txt'])
    })

    it('边界条件：输入空目录 返回空数组', () => {
      const results = glob('*.txt', {}, testDir)
      expect(results).toEqual([])
    })

    it('边界条件：输入不存在的目录 返回空数组', () => {
      const results = glob('*.txt', {}, join(testDir, 'non-existent'))
      expect(results).toEqual([])
    })

    it('边界条件：输入空模式 返回空数组', () => {
      createTestFile('test.txt')
      const results = glob('', {}, testDir)
      expect(results).toEqual([])
    })
  })

  describe('globFromDir 函数', () => {
    it('输入子目录路径 从指定目录开始匹配', () => {
      createTestFile('subdir/test.txt')
      createTestFile('test.txt')
      const results = globFromDir('*.txt', 'subdir', {}, testDir)
      expect(results).toEqual(['test.txt'])
    })

    it('输入相对路径 正确解析并匹配', () => {
      createTestFile('dir1/dir2/test.txt')
      const results = globFromDir('**/*.txt', 'dir1', {}, testDir)
      expect(results).toContain('dir2/test.txt')
    })

    it('边界条件：输入不存在的子目录 返回空数组', () => {
      const results = globFromDir('*.txt', 'non-existent', {}, testDir)
      expect(results).toEqual([])
    })

    it('边界条件：输入根目录 等同于glob函数', () => {
      createTestFile('test.txt')
      const globResults = glob('*.txt', {}, testDir)
      const fromDirResults = globFromDir('*.txt', '.', {}, testDir)
      expect(fromDirResults).toEqual(globResults)
    })
  })

  describe('clearGlobCache 函数', () => {
    it('调用后清除缓存 后续查询返回最新结果', () => {
      createTestFile('test.txt')
      glob('*.txt', { cache: true }, testDir)
      clearGlobCache()
      createTestFile('test2.txt')
      const results = glob('*.txt', { cache: true }, testDir)
      expect(results).toHaveLength(2)
    })

    it('边界条件：重复调用 不产生错误', () => {
      expect(() => {
        clearGlobCache()
        clearGlobCache()
      }).not.toThrow()
    })
  })

  describe('性能与错误处理测试', () => {
    it('大量文件场景下性能测试', () => {
      const fileCount = 1000
      for (let i = 0; i < fileCount; i++) {
        createTestFile(`perf/file${i}.txt`)
      }
      const startTime = performance.now()
      const results = glob('perf/*.txt', {}, testDir)
      const endTime = performance.now()

      expect(results).toHaveLength(fileCount)
      expect(endTime - startTime).toBeLessThan(1000) // 确保在1秒内完成
    })

    it('输入无效模式时抛出错误', () => {
      expect(() => glob('[invalid', {}, testDir)).toThrow()
    })

    it('输入无效选项时抛出错误', () => {
      const invalidOptions = { invalidOption: true } as unknown as GlobOptions
      expect(() => glob('*.txt', invalidOptions, testDir)).toThrow()
    })
  })
})
