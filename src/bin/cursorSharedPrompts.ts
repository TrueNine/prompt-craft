import all from '@/templates/cursor/shared/all.md'
import allRole from '@/templates/cursor/shared/all-role.md'
import optimizationSkills from '@/templates/cursor/shared/optimization-skills.md'
import devEnv from '@/templates/cursor/shared/dev-env.md'
import productionEnv from '@/templates/cursor/shared/production-env.md'

import { getContent } from './utils'

export const cursorSharedPrompts = {
  all: getContent(all),
  allRole: getContent(allRole),
  optimizationSkills: getContent(optimizationSkills),
  devEnv: getContent(devEnv),
  productionEnv: getContent(productionEnv),
}
