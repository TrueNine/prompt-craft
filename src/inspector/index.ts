import type { FileTree } from '../types'

/**
 * 对文件树节点进行排序
 * @param a 第一个节点
 * @param b 第二个节点
 * @param parentHasAsterisk 父节点是否包含星号
 */
function sortFileTreeNodes(a: FileTree, b: FileTree, parentHasAsterisk = false): number {
  // 处理特殊模式（带星号的路径）
  const aHasAsterisk = a.path.includes('*')
  const bHasAsterisk = b.path.includes('*')

  // 如果父目录是带星号的，特殊文件优先
  if (parentHasAsterisk && aHasAsterisk !== bHasAsterisk) {
    return aHasAsterisk ? -1 : 1
  }

  // 如果父目录不是带星号的
  if (!parentHasAsterisk) {
    // 目录优先于文件
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1
    }

    // 同类型时，带星号的放在后面
    if (aHasAsterisk !== bHasAsterisk) {
      return aHasAsterisk ? 1 : -1
    }
  }

  // 最后按字母顺序排序
  return a.path.localeCompare(b.path)
}

/**
 * 生成一个或多个文件树的文本描述
 * @param fileTrees 单个文件树或文件树数组
 * @param level 当前层级
 * @param prefix 当前行的前缀
 */
export function generateFileTreeText(
  fileTrees: FileTree | FileTree[],
  level = 0,
  prefix = '',
): string {
  // 处理数组输入
  if (Array.isArray(fileTrees)) {
    const sortedTrees = [...fileTrees].sort((a, b) => sortFileTreeNodes(a, b))
    return sortedTrees.map((tree) => generateFileTreeText(tree, level, prefix)).join('')
  }

  let result = ''
  const fileTree = fileTrees

  // 添加当前节点
  result += prefix
  if (level > 0) {
    result += '└─'
  }
  result += fileTree.path
  if (fileTree.type === 'directory' && !fileTree.path.includes('*')) {
    result += '/'
  }
  if (typeof fileTree.description === 'string' && fileTree.description.trim().length > 0) {
    result += ` #${fileTree.description.trim()}`
  }
  result += '\n'

  // 处理子节点（先排序）
  if (fileTree.type === 'directory' && Array.isArray(fileTree.children) && fileTree.children.length > 0) {
    const hasAsterisk = fileTree.path.includes('*')
    const sortedChildren = [...fileTree.children].sort((a, b) => sortFileTreeNodes(a, b, hasAsterisk))
    sortedChildren.forEach((child) => {
      const newPrefix = prefix + (level === 0 ? '' : '│') + (level > 0 ? '' : '')
      result += generateFileTreeText(child, level + 1, newPrefix)
    })
  }

  return result
}
