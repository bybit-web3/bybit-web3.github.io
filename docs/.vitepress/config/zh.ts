import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const zh = defineConfig({
  lang: 'zh',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/': { base: '/zh/', items: sidebarGuide() },
    },
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      link: 'getting-started',
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '起步',
      link: 'getting-started'
    },
    {
      text: 'Logo物料',
      link: 'material'
    },
    {
      text: '更新日志',
      link: 'release-notes'
    },
    {
      text: '如何手动更新插件钱包',
      link: 'update-wallet'
    },
    {
      text: 'Dapp接入指南',
      collapsed: false,
      items: [
        { text: 'EVM', link: 'evm' },
        { text: 'Solana/Sonic', link: 'solana' },
        { text: 'Bitcoin', link: 'bitcoin' },
        { text: 'Stacks', link: 'stacks' },
        { text: 'Sui', link: 'sui' },
        { text: 'Aptos/Movement', link: 'aptos' },
        { text: 'Ton', link: 'ton' },
        { text: 'Tron', link: 'tron' },
      ]
    },
  ]
}
