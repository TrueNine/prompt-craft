import commonTest from '@/templates/cursor/common/test.common.md'
import ktSpringBoot from '@/templates/cursor/kt/spring-boot.md'
import ktTest from '@/templates/cursor/kt/test.md'
import promptMd from '@/templates/cursor/prompt/md.md'
import sharedAllRole from '@/templates/cursor/shared/all-role.md'
import sharedAll from '@/templates/cursor/shared/all.md'
import sharedDevEnv from '@/templates/cursor/shared/dev-env.md'
import sharedDevStandard from '@/templates/cursor/shared/dev-standard.md'
import sharedProdEnv from '@/templates/cursor/shared/prod-env.md'
import vueStyle from '@/templates/cursor/vue/style.md'
import vueTestFix from '@/templates/cursor/vue/test-fix.md'
import vueTest from '@/templates/cursor/vue/test.md'
import vueTs from '@/templates/cursor/vue/ts.md'
import vueVue from '@/templates/cursor/vue/vue.md'

import { getContent } from './utils'

export const templateDirNames = ['cursor', 'lingma', 'copilot', 'trae']

export const cursorSharedPrompts = {
  sharedAll: getContent(sharedAll),
  sharedDevStandard: getContent(sharedDevStandard),
  sharedDevEnv: getContent(sharedDevEnv),
  sharedProdEnv: getContent(sharedProdEnv),
  sharedAllRole: getContent(sharedAllRole),
}

export const cursorCommonPrompts = {
  test: getContent(commonTest),
}

/**
 * 读取提示词内容，并注入对应的 conversation 内容
 * @param path 提示词文件路径
 * @param name 提示词文件名称
 */
export function injectConversation(path: string, name: string): string {
  const content = getContent(path).trim()

  // 解析文件头部配置
  const configMatch = content.match(/^---([\s\S]*?)---\n([\s\S]*)$/)
  if (!configMatch) {
    return content
  }

  const [, configYaml, remainingContent] = configMatch

  // 获取对应的 conversation 内容
  let conversationContent = ''
  if (name in cursorCommonPrompts) {
    conversationContent = cursorCommonPrompts[name as keyof typeof cursorCommonPrompts]
  }

  // YAML 头和正文之间两个换行，conversationContent 和 remainingContent 之间一个换行
  let result = `---\n${configYaml.trim()}\n---\n\n`
  if (conversationContent) {
    result += `${conversationContent}\n`
  }
  if (remainingContent.trim()) {
    result += `${remainingContent.trim()}`
  }
  return result
}

export const cursorKtPrompts = {
  test: injectConversation(ktTest, 'test'),
  springBoot: injectConversation(ktSpringBoot, 'springBoot'),
}

export const cursorVuePrompts = {
  ts: injectConversation(vueTs, 'ts'),
  test: injectConversation(vueTest, 'test'),
  style: injectConversation(vueStyle, 'style'),
  vue: injectConversation(vueVue, 'vue'),
  testFix: injectConversation(vueTestFix, 'testFix'),
}

export const cursorPromptPrompts = {
  md: injectConversation(promptMd, 'md'),
  ...cursorVuePrompts,
}

export const cursorRelativeFolderPath = '.cursor/rules'
