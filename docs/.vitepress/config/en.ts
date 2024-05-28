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
      text: 'Dapp Integration Guide',
      collapsed: false,
      items: [
        { text: 'EVM', link: 'evm' },
        { text: 'Solana', link: 'solana' },
        { text: 'Bitcoin', link: 'bitcoin' },
        { text: 'Stacks', link: 'stacks' },
      ]
    },
  ]
}
