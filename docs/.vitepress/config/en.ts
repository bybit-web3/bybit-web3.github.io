import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/': { base: '/', items: sidebarGuide() },
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
      text: 'Getting Started',
      link: 'getting-started'
    },
    {
      text: 'Logo Material',
      link: 'material'
    },
    {
      text: 'Release Notes',
      link: 'release-notes'
    },
    {
      text: 'How to Update the Plugin Wallet',
      link: 'update-wallet'
    },
    {
      text: 'Dapp Integration Guide',
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
