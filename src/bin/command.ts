#!/usr/bin/env node
import type { CommandSelectedOptions } from '@/types'
import { resolve } from 'node:path'

import process from 'node:process'
import chalk from 'chalk'
import { Command } from 'commander'
import inquirer from 'inquirer'
import { cursorKtPrompts, cursorRelativeFolderPath, cursorSharedPrompts, cursorVuePrompts } from './cursorSharedPrompts'
import { camelToKebab, cleanRulesDir, writeRuleFile } from './utils'

const program = new Command()

program
  .name('prompt-craft')
  .description('一个用于管理和更新项目提示词的 CLI 工具')
  .version('0.1.0')

program
  .command('update-prompt')
  .description('更新项目内部的提示词')
  .action(async () => {
    console.log(chalk.cyan('欢迎使用提示词更新工具 ✨'))
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'promptName',
        message: '请输入要更新的提示词名称：',
      },
      {
        type: 'input',
        name: 'promptContent',
        message: '请输入新的提示词内容：',
      },
    ])
    // 这里可以添加实际的更新逻辑
    console.log(chalk.green(`提示词 "${answers.promptName}" 已更新！`))
  })

/**
 * 写入规则文件
 * @param options 选项
 * @param rulesDir 规则文件目录
 */
function writeRules(options: CommandSelectedOptions, rulesDir: string = resolve(process.cwd(), cursorRelativeFolderPath)): void {
  // 清理旧文件
  cleanRulesDir(rulesDir)

  // 写入共享规则
  Object.entries(cursorSharedPrompts).forEach(([name, content]) => {
    writeRuleFile(rulesDir, camelToKebab(name), content)
  })

  // 根据语言类型写入特定规则
  if (options.usedLanguages === 'kotlin+spring-boot') {
    Object.entries(cursorKtPrompts).forEach(([name, content]) => {
      writeRuleFile(rulesDir, camelToKebab(name), content)
    })
  } else if (options.usedLanguages === 'typescript+vue') {
    Object.entries(cursorVuePrompts).forEach(([name, content]) => {
      writeRuleFile(rulesDir, camelToKebab(name), content)
    })
  }
}

export async function runCli(): Promise<void> {
  try {
    interface LanguagePrompt {
      usedLanguages: 'typescript+vue' | 'kotlin+spring-boot'
    }

    const { usedLanguages } = await inquirer.prompt<LanguagePrompt>([
      {
        type: 'list',
        name: 'usedLanguages',
        message: '请选择项目使用的技术栈：',
        choices: [
          { name: 'TypeScript + Vue', value: 'typescript+vue' as const },
          { name: 'Kotlin + Spring Boot', value: 'kotlin+spring-boot' as const },
        ],
      },
    ])

    const options: CommandSelectedOptions = {
      usedLanguages,
    }

    writeRules(options)
    console.log(chalk.green('✨ 规则文件写入成功！'))
  } catch (error) {
    console.error(chalk.red('❌ 执行失败：'), error)
    process.exit(1)
  }
}
