import { globSync } from 'node:fs'
import { join, sep } from 'node:path'
import { cwd } from 'node:process'

export interface GlobOptions {
  /**
   * 是否缓存 glob 结果
   * @default false
   */
  cache?: boolean
  /**
   * 是否包含点文件
   * @default true
   */
  dot?: boolean
  /**
   * 是否只返回文件（不包含目录）
   * @default true
   */
  onlyFiles?: boolean
  /**
   * 排除的文件/目录模式
   */
  ignore?: string[]
}

const globCache = new Map<string, string[]>()

/**
 * 标准化路径分隔符为正斜杠
 */
function normalizePath(path: string): string {
  return path.split(sep).join('/')
}

/**
 * 执行 glob 匹配并返回相对路径的文件路径数组
 * @param patterns - glob 匹配模式，可以是字符串或字符串数组
 * @param options - glob 配置选项
 * @param root - 搜索的根目录，默认为 process.cwd()
 * @returns 返回相对于根目录的文件路径数组
 */
export function glob(
  patterns: string | string[],
  options: GlobOptions = {},
  root: string = cwd(),
): string[] {
  // 验证输入
  if (patterns === '' || (Array.isArray(patterns) && patterns.length === 0)) {
    return []
  }

  // 验证 glob 模式格式
  const validatePattern = (pattern: string): void => {
    if (pattern.includes('[') && !pattern.includes(']')) {
      throw new Error(`Invalid glob pattern: ${pattern}`)
    }
  }

  // 验证选项
  if (typeof options !== 'object' || options === null) {
    throw new Error('Invalid glob options: options must be an object')
  }

  // 检查是否有未知选项
  const validOptionKeys = ['cache', 'dot', 'onlyFiles', 'ignore']
  const unknownOptions = Object.keys(options).filter((key) => !validOptionKeys.includes(key))
  if (unknownOptions.length > 0) {
    throw new Error(`Invalid glob options: unknown options ${unknownOptions.join(', ')}`)
  }

  if (options.dot !== undefined && typeof options.dot !== 'boolean') {
    throw new Error('Invalid glob options: dot must be a boolean')
  }
  if (options.onlyFiles !== undefined && typeof options.onlyFiles !== 'boolean') {
    throw new Error('Invalid glob options: onlyFiles must be a boolean')
  }
  if (options.cache !== undefined && typeof options.cache !== 'boolean') {
    throw new Error('Invalid glob options: cache must be a boolean')
  }
  if (options.ignore !== undefined && !Array.isArray(options.ignore)) {
    throw new Error('Invalid glob options: ignore must be an array')
  }

  const {
    cache = false,
    dot = true,
    onlyFiles = true,
    ignore = [],
  } = options

  const normalizedPatterns = Array.isArray(patterns) ? patterns : [patterns]
  normalizedPatterns.forEach(validatePattern)
  const cacheKey = `${JSON.stringify(patterns)}:${JSON.stringify(options)}:${root}`

  if (cache && globCache.has(cacheKey)) {
    return globCache.get(cacheKey)!
  }

  const nodeGlobOptions = {
    cwd: root,
    dot,
    nodir: onlyFiles,
    ignore: ignore.map((pattern) => normalizePath(pattern)),
    absolute: false,
    nocase: false, // 区分大小写
  }

  let results = globSync(normalizedPatterns, nodeGlobOptions)
    .map((path) => normalizePath(path))

  // 手动过滤点文件
  if (!dot) {
    results = results.filter((path) => !path.startsWith('.') && !path.includes('/.'))
  }

  // 手动过滤忽略的文件
  if (ignore.length > 0) {
    const normalizedIgnorePatterns = ignore.map((pattern) => normalizePath(pattern))
    results = results.filter((path) => !normalizedIgnorePatterns.includes(path))
  }

  if (cache) {
    globCache.set(cacheKey, results)
  }

  return results
}

/**
 * 从指定目录执行 glob 匹配
 */
export function globFromDir(
  patterns: string | string[],
  fromDir: string,
  options: GlobOptions = {},
  root: string = cwd(),
): string[] {
  const normalizedPatterns = Array.isArray(patterns) ? patterns : [patterns]
  const prefixedPatterns = normalizedPatterns.map(
    (pattern) => normalizePath(join(fromDir, pattern)),
  )
  const results = glob(prefixedPatterns, options, root)

  // 移除前缀目录
  const prefix = normalizePath(fromDir)
  return results.map((path) => {
    if (path.startsWith(`${prefix}/`)) {
      return path.slice(prefix.length + 1)
    }
    return path
  })
}

/**
 * 清除 glob 缓存
 */
export function clearGlobCache(): void {
  globCache.clear()
}
