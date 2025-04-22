export type LanguageType = 'kotlin+spring-boot' | 'typescript+vue'

export interface CommandSelectedOptions {
  /**
   * 当前项目使用的编程语言类型
   */
  usedLanguages: LanguageType
}
