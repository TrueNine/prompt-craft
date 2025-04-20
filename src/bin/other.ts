import a from '@/templates/cursor/shared/all.md'
import { getContent } from './utils'

export function other(): void {
  console.log('other module')
  const content = getContent(a)
  console.log(content)
}
