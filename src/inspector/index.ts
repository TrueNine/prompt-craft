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
 * 合并重复的文件树节点
 * @param fileTrees 文件树数组
 * @returns 合并后的文件树数组
 */
function mergeFileTrees(fileTrees: FileTree[]): FileTree[] {
  if (!fileTrees.length)
    return []

  const pathMap = new Map<string, FileTree>()

  // 首先按路径将节点分组
  fileTrees.forEach((tree) => {
    const key = `${tree.path}:${tree.type}`
    const existingTree = pathMap.get(key)

    if (!existingTree) {
      // 首次遇到的节点直接存储
      pathMap.set(key, { ...tree })
    } else {
      // 合并节点(优先保留有描述的，描述长的优先)
      const existingDesc = typeof existingTree.description === 'string' ? existingTree.description : ''
      const newDesc = typeof tree.description === 'string' ? tree.description : ''

      // 有描述 > 无描述，长描述 > 短描述
      if (newDesc.length > 0 && (existingDesc.length === 0 || newDesc.length > existingDesc.length)) {
        existingTree.description = newDesc
      }

      // 合并子节点（如果存在）
      if (tree.type === 'directory' && tree.children && tree.children.length > 0) {
        if (!existingTree.children) {
          existingTree.children = []
        }
        // 递归合并子节点
        existingTree.children = mergeFileTrees([...existingTree.children, ...tree.children])
      }
    }
  })

  return Array.from(pathMap.values())
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
    // 先合并重复的节点
    const mergedTrees = mergeFileTrees(fileTrees)
    // 再进行排序
    const sortedTrees = [...mergedTrees].sort((a, b) => sortFileTreeNodes(a, b))
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
    // 合并重复子节点后再排序
    const mergedChildren = mergeFileTrees(fileTree.children)
    const sortedChildren = [...mergedChildren].sort((a, b) => sortFileTreeNodes(a, b, hasAsterisk))
    sortedChildren.forEach((child) => {
      const newPrefix = prefix + (level === 0 ? '' : '│') + (level > 0 ? '' : '')
      result += generateFileTreeText(child, level + 1, newPrefix)
    })
  }

  return result
}
