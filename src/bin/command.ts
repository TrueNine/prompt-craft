#!/usr/bin/env node
import process from 'node:process'
import chalk from 'chalk'
import { Command } from 'commander'
import inquirer from 'inquirer'

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

export function runCli(argv: string[] = process.argv): void {
  program.parse(argv)
}
