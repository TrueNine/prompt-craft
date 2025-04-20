#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

console.log('\u2728 欢迎使用 Prompt Craft 项目初始化脚本！')

// 简单参数解析
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log('用法: npx @compose/prompt-craft [项目名]')
  process.exit(0)
}

const projectName = args[0] || 'my-prompt-craft-app'
const targetDir = resolve(process.cwd(), projectName)

if (existsSync(targetDir)) {
  console.error(`\u274C 目录已存在: ${targetDir}`)
  process.exit(1)
}

console.log(`\uD83D\uDCC1 即将创建项目: ${projectName}`)
// 这里可以扩展：调用 vite 或自定义模板逻辑
// ...
