import { getContent } from '@/common/utils'
import commonTestFix from '@/templates/cursor/common/test-fix.common.md'
import commonTest from '@/templates/cursor/common/test.common.md'
import instructionCommit from '@/templates/cursor/Instruction/commit.md'
import instructionRefactor from '@/templates/cursor/Instruction/refactor.md'
import ktKt from '@/templates/cursor/kt/kt.md'
import ktSpringBoot from '@/templates/cursor/kt/spring-boot.md'
import ktTestFix from '@/templates/cursor/kt/test-fix.md'
import ktTest from '@/templates/cursor/kt/test.md'
import promptMd from '@/templates/cursor/prompt/md.md'
import sharedAll from '@/templates/cursor/shared/all.md'
import sharedDevEnv from '@/templates/cursor/shared/dev-env.md'
import sharedDevStandard from '@/templates/cursor/shared/dev-standard.md'
import vueStyle from '@/templates/cursor/vue/style.md'
import vueTestFix from '@/templates/cursor/vue/test-fix.md'
import vueTest from '@/templates/cursor/vue/test.md'
import vueTs from '@/templates/cursor/vue/ts.md'

import vueVue from '@/templates/cursor/vue/vue.md'

export const templateDirNames = ['cursor', 'lingma', 'copilot', 'trae']

export const cursorSharedPrompts = {
  // AI 指令
  commit: getContent(instructionCommit),
  refactor: getContent(instructionRefactor),
  // 共享规则
  sharedAll: getContent(sharedAll),
  sharedDevStandard: getContent(sharedDevStandard),
  sharedDevEnv: getContent(sharedDevEnv),
}

export const cursorCommonPrompts = {
  test: getContent(commonTest),
  testFix: getContent(commonTestFix),
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
  kt: injectConversation(ktKt, 'kt'),
  testFix: injectConversation(ktTestFix, 'testFix'),
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
