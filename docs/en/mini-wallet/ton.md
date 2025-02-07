# Ton

## Special Note

Since Bybit Wallet's Pull Request to Ton Network's Wallet list hasn't been merged yet, if your Dapp needs to integrate with Bybit Telegram Mini Wallet, please follow these steps to manually add Bybit Telegram Wallet.

## Using [@tonconnect/ui-react](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react) (Recommended)

If your Dapp is developed with React, you can use [@tonconnect/ui-react](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react) to integrate with Bybit Telegram Mini Wallet.

```typescript
import { TonConnectUIProvider} from "@tonconnect/ui-react";

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          walletsListConfiguration={{
            includeWallets: [
              // Please add Bybit Mini Wallet to includeWallets
              {
                appName: "bybitMiniWallet",
                name: "Bybit Mini Wallet",
                imageUrl: "https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png",
                aboutUrl: "https://www.bybit.com/web3",
                universalLink: "https://t.me/Bybit_Web3_wallet_bot?attach=wallet",
                bridgeUrl: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              // ...other wallet information
            ]
          }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
          }}
      >
        <div className="app">
            {/* Your Dapp content */}
        </div>
      </TonConnectUIProvider>
  )
}

export default App
```

Simply add the code above and include Bybit Mini Wallet in includeWallets to complete the integration.

## Using [@tonconnect/ui](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react) (Not Recommended)

If your Dapp uses a UI framework other than React, you can use [@tonconnect/ui](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers#ton-connect-ui-react) to integrate with Bybit Telegram Mini Wallet.
Pass a custom wallet array to extend the wallet list. The passed wallets will be added to the end of the original wallet list.

```html
<script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
<script>
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://<YOUR_APP_URL>/tonconnect-manifest.json',
        buttonRootId: '<YOUR_CONNECT_BUTTON_ANCHOR_ID>',
        // Please add Bybit Mini Wallet to includeWallets
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

