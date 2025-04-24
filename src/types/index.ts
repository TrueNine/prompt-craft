export type LanguageType = 'kotlin+spring-boot' | 'typescript+vue' | 'markdown+cursor-rules'

export interface CommandSelectedOptions {
  /**
   * 当前项目使用的编程语言类型
   */
  usedLanguages: LanguageType
}

export interface FileTree {
  path: string
  description?: string
  type: 'file' | 'directory'
  children?: FileTree[]
}
export type ProjectStructure = {
  [key in LanguageType]: FileTree | FileTree[]
}
