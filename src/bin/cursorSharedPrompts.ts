// 获取 templates 目录下所有一级目录名
import ktSpringBoot from '@/templates/cursor/kt/spring-boot.md'
import ktTest from '@/templates/cursor/kt/test.md'
import allRole from '@/templates/cursor/shared/all-role.md'
import all from '@/templates/cursor/shared/all.md'
import devEnv from '@/templates/cursor/shared/dev-env.md'
import optimizationSkills from '@/templates/cursor/shared/optimization-skills.md'
import productionEnv from '@/templates/cursor/shared/production-env.md'
import vueFixTest from '@/templates/cursor/vue/fix-test.md'
import vueStyle from '@/templates/cursor/vue/style.md'
import vueTest from '@/templates/cursor/vue/test.md'
import vueTs from '@/templates/cursor/vue/ts.md'
import vueVue from '@/templates/cursor/vue/vue.md'
import { getContent } from './utils'

export const templateDirNames = ['cursor', 'lingma', 'copilot', 'trae']

export const cursorSharedPrompts = {
  all: getContent(all),
  allRole: getContent(allRole),
  optimizationSkills: getContent(optimizationSkills),
  devEnv: getContent(devEnv),
  productionEnv: getContent(productionEnv),
}

export const cursorKtPrompts = {
  test: getContent(ktTest),
  springBoot: getContent(ktSpringBoot),
}

export const cursorVuePrompts = {
  ts: getContent(vueTs),
  test: getContent(vueTest),
  style: getContent(vueStyle),
  vue: getContent(vueVue),
  fixTest: getContent(vueFixTest),
}

export const cursorRelativeFolderPath = '.cursor/rules'
