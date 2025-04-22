#!/usr/bin/env node
import process from 'node:process'
import { runCli } from './command'

console.log('\u2728 欢迎使用 Prompt Craft 项目初始化脚本！')

// 简单参数解析
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log('用法: npx @compose/prompt-craft [项目名]')
  process.exit(0)
}

// 执行主程序
void runCli()
