import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bybit Web3",
  description: "Bybit Wallet Integration Guide",
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Integration Guide',
        items: [
          { text: 'Solana(English)', link: '/solana-en' },
          { text: 'Solana(中文简体)', link: '/solana-cn' },
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
