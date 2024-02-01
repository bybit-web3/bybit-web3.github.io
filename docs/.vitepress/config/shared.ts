import { defineConfig } from 'vitepress'

export const shared = defineConfig({
    title: "Bybit Web3",
    description: "Bybit Wallet Integration Guide",
    lastUpdated: true,
    cleanUrls: true,

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
        { text: 'Home', link: '/' },
        ],
    },
})