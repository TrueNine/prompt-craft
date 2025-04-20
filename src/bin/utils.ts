import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function getContent(input: string): string {
  if (input.startsWith('data:')) {
    const match = input.match(/^data:.*?;base64,(.*)$/)
    if (match) {
      return Buffer.from(match[1], 'base64').toString('utf-8')
    } else {
      const idx = input.indexOf(',')
      return decodeURIComponent(input.slice(idx + 1))
    }
  } else {
    return readFileSync(resolve(__dirname, input), 'utf-8')
  }
}
