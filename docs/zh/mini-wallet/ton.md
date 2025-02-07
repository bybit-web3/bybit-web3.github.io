# Ton

## 特别说明

由于Bybit Wallet提交给Ton Network的Wallet list的Pull Request还没有被合并，如果您的Dapp需要接入Bybit Telegram Mini Wallet，请参考以下步骤手动加入Bybit Telegram Wallet。

## 使用链接[@tonconnect/ui-react](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react)(推荐)

如果您的Dapp使用React开发，可以使用[@tonconnect/ui-react](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react)来接入Bybit Telegram Mini Wallet。

```typescript
import { TonConnectUIProvider} from "@tonconnect/ui-react";

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          walletsListConfiguration={{
            includeWallets: [
              // 请把Bybit Mini Wallet加入到includeWallets中
              {
                appName: "bybitMiniWallet",
                name: "Bybit Mini Wallet",
                imageUrl: "https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png",
                aboutUrl: "https://www.bybit.com/web3",
                universalLink: "https://t.me/Bybit_Web3_wallet_bot?attach=wallet",
                bridgeUrl: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              // ...其他钱包信息
            ]
          }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
          }}
      >
        <div className="app">
            {/* 您的Dapp内容 */}
        </div>
      </TonConnectUIProvider>
  )
}

export default App
```

只需要加入上面的代码，并把Bybit Mini Wallet加入到includeWallets中，即可完成接入。

## 使用链接[@tonconnect/ui](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react)(不推荐)

如果您的Dapp使用React以外的UI框架，可以使用[@tonconnect/ui](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react)来接入Bybit Telegram Mini Wallet。
传递自定义钱包数组以扩展钱包列表。传递的钱包将被添加到原始钱包列表的末尾。

```html
<script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
<script>
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://<YOUR_APP_URL>/tonconnect-manifest.json',
        buttonRootId: '<YOUR_CONNECT_BUTTON_ANCHOR_ID>',
        // 请把Bybit Mini Wallet加入到includeWallets中
        uiOptions:   walletsListConfiguration: {
          includeWallets: [{
            appName: "bybitMiniWallet",
            name: 'Bybit Mini Wallet',
            imageUrl: 'https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png',
            aboutUrl: 'https://www.bybit.com/web3',
            bridgeUrl: 'https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge',
            universalLink: 'https://t.me/Bybit_Web3_wallet_bot?attach=wallet',
            platforms: ['ios', 'android', 'macos', 'windows', 'linux']
          }]
      }
    });
</script>
```

