import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const CURSOR_DIR = resolve(__dirname, '..')

interface FileInfo {
  _path: string
  content: string
}

function getAllMarkdownFiles(
  dir: string,
  excludeDirs: string[] = [],
  excludeFiles: string[] = [],
): FileInfo[] {
  const files: FileInfo[] = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      files.push(...getAllMarkdownFiles(fullPath, excludeDirs, excludeFiles))
    } else if (
      entry.isFile()
      && entry.name.endsWith('.md')
      && !excludeFiles.includes(entry.name)
    ) {
      const content = readFileSync(fullPath, 'utf-8')
      files.push({ _path: fullPath, content })
    }
  }

  return files
}

function hasValidHeaderStructure(content: string): boolean {
  const contentLines = content.split('\n')

  // 检查文件是否以 --- 开始
  if (!contentLines[0]?.trim().startsWith('---')) {
    return false
  }

  // 查找第二个 --- 的位置
  const endHeaderIndex = contentLines.findIndex((line, index) => index > 0 && line.trim() === '---')
  if (endHeaderIndex === -1) {
    return false
  }

  const headerContent = contentLines.slice(0, endHeaderIndex + 1).join('\n')

  // 检查必需的字段是否存在
  return ['description:', 'globs:', 'alwaysApply:'].every((field) =>
    headerContent.includes(field),
  )
}

describe('cursor Template Markdown Files', () => {
  const excludeDirs = ['common', '__tests__']
  const excludeFiles = ['README.md']
  const mdFiles = getAllMarkdownFiles(CURSOR_DIR, excludeDirs, excludeFiles)

  it(`应该能找到至少一个 markdown 文件`, () => {
    expect(mdFiles.length).toBeGreaterThan(0)
  })

  it.each(mdFiles)('文件 $_path 应该包含必要的头部结构', ({ content, _path }) => {
    const isValid = hasValidHeaderStructure(content)
    expect(isValid, `文件 ${_path} 的头部结构无效，请检查是否包含必要的字段：description、globs、alwaysApply`).toBe(true)
  })

  it.each(mdFiles)('文件 $_path 的内容不应该为空', ({ content }) => {
    expect(content.trim()).not.toBe('')
    expect(content.length).toBeGreaterThan(0)
  })

  it.each(mdFiles)('文件 $_path 应该有合理的内容长度', ({ content }) => {
    // 假设一个合理的 markdown 文件至少应该有 50 个字符
    expect(content.length).toBeGreaterThan(50)
  })

  it('不应该包含被排除的目录或文件', () => {
    const paths = mdFiles.map((f) => f._path)

    // 检查排除目录
    for (const excludeDir of excludeDirs) {
      paths.forEach((path) => {
        expect(path).not.toContain(`/${excludeDir}/`)
      })
    }

    // 检查排除文件
    for (const excludeFile of excludeFiles) {
      paths.forEach((path) => {
        expect(path).not.toContain(`/${excludeFile}`)
      })
    }
  })
})
