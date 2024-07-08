# SUI网络
Sui 又称 Sui Network，是第一个从零开始设计，且能够使开发者为十亿 Web3 新用户构建全新体验的 Layer 1 区块链。Sui 可横向扩展，能够高速且低成本地支持多样的 DApp 开发。Sui 开创了通用区块链的先河，为用户带来高吞吐量、超快结算速度、丰富的链上资产、以及用户友好的 Web3 体验。Sui 是区块链技术的一个跨越式的进步，从底层开始设计，以满足加密货币中所有相关方的需求。

# 什么是 Injected provider API？

Injected providers API 是一个 JavaScript API，Bybit Wallet将其注入用户访问的网站。您的 DApp 可以使用此 API 请求用户帐户，从用户连接的区块链读取数据，帮助用户签署消息和交易。

# 获取 wallet 对象
Sui 钱包使用的是 wallet standard，相比其他异构链有些不同，可以通过事件通知的方式获取 wallet 对象：

```js
const GlobalWallet = {
    walletList: [],
      register: (wallet) => {
          GlobalWallet.walletList.push(wallet)
      }
  }
  const event = new CustomEvent('wallet-standard:app-ready', { detail: GlobalWallet });
  window.dispatchEvent(event);

const suiWallet = GlobalWallet.walletList.find(wallet => wallet.name === 'BybitSuiMainnet');

```

# 通过Sui官方的Dapp SDK连接钱包(强烈建议)

开发者也可以通过Sui官方的Dapp SDK来连接钱包，SDK的使用方法如下：
https://sdk.mystenlabs.com/dapp-kit/

# 连接账户

使用的方法：`suiWallet.features['standard:connect'].connect()`

连接到Bybit Wallet可以通过调用 `suiWallet.features['standard:connect'].connect()`。
`connect` 调用将返回一个 `Pr对象： `Promise`  `resolve`，并在用户拒绝请求或关闭弹出窗口时 `reject`。有关Bybit Wallet可能发生错误的详细信息，请参考 错误码。 当用户接受连接请求时，`suiWallet.features['standard:events']` 也会触发连接事件。

```js
const suiAccounts = await suiWallet.features['standard:connect'].connect();

// suiAccounts 结构:
[
  {
      "address": "0x7995ca23961fe06d8cea7da58ca751567ce820d7cba77b4a373249034eecca4a",
      "publicKey": "tUvCYrG22rHKR0c306MxgnhXOSf16Ot6H3GMO7btwDI=",
      "chains": [
          "sui:mainnet"
      ],
      "features": [
          "sui:signAndExecuteTransactionBlock",
          "sui:signTransactionBlock",
          "sui:signMessage"
      ]
  }
]
```

# 交易签名

## 签名并发送交易

使用的方法：`suiWallet.features['sui:signAndExecuteTransactionBlock'].signAndExecuteTransactionBlock`

通过以上获取到的 suiWallet 对象，可以进行交易签名：

```js
const tx = new TransactionBlock()

tx.moveCall({
    target: `${packageId}::${moduleName}::${functionName}`,
    arguments: [
    tx.pure(params1),
    tx.pure(params2),
    ],
    typeArguments: [],
})

const result = await suiWallet.features['sui:signAndExecuteTransactionBlock'].signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: { showEffects: true },
    });

console.log('result', result); // 通过result?.effects?.status?.status获取交易状态，成功为 'success'，失败为'failure'
```

## 拆币

在发交易时，付 gas 费的 objectId，如果这个 object 本身就要被发送，还要用来付 gas 费，这时候就需要用到拆币(split coin)

```js
const handleTransaction = async () => {
    const tx = new TransactionBlock()

    const value = '300000000'  // 这里是想要拆出的目标值
    const [coins] = tx.splitCoins(tx.gas, [
      tx.pure(BigInt(value)),
    ])
    tx.moveCall({
      target: `${packageId}::${moduleName}::${functionName}`,
      arguments: [
        tx.pure('params1'),
        tx.pure('params2'),
        tx.makeMoveVec({ objects: [coins] }),
      ],
      typeArguments: [],
    })
    const result = await suiWallet.features['sui:signAndExecuteTransactionBlock'].signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: { showEffects: true },
    })
    console.log('result', result)
    // 通过result?.effects?.status?.status获取交易状态，成功为 'success'，失败为'failure'
}
```

## 签名交易(不广播)

通过 `provider` 上的 `signTransactionBlock` 方法可以签署一个交易块(多个交易的集合)。

```js
const tx = new TransactionBlock();
tx.moveCall({
  target: 'xxx',
  arguments: [
    tx.pure('bybit'),
    tx.pure('wallet'),
  ],
});
const input = {
  transactionBlockSerialized: tx.serialize(),
  options: {
    showEffects: true,
  }
}l
const transaction = await suiWallet.features['sui:signTransactionBlock'].signTransactionBlock({ transactionBlock: tx })
console.log('transaction', transaction);
```

# 对信息签名

创建交易后，Web 应用程序可能会要求用户的Bybit Wallet签署交易，而无需将其提交到网络。调用 `signMessage` 方法会为已签名的交易返回 `Promise`。

```js
import { ethers } from 'ethers';
// 这里借用 ethers 库来帮我们处理 message，将其转为 Uint8Array 类型
// 当然，您也可以使用其他方法将 message 转为 Uint8Array 类型

const message = ethers.utils.toUtf8Bytes('hello, bybit');
const { signature, messageBytes } = await suiWallet.features['sui:signMessage'].signMessage({ message });
console.log('signature', signature);
console.log('messageBytes', messageBytes);
```


# 事件

## 成功连接
连接到Bybit Wallet可以通过调用 `suiWallet.features['standard:events'].on`。 当用户接受连接请求时，会触发连接事件。

### 用法

```js  
suiWallet.features['standard:events'].on("connect", () => console.log("connected!"));
```

## 断开连接
断开连接与连接过程相同。但是，钱包也有可能发起断开连接，而不是应用程序本身。

### 用法

```js
suiWallet.features['standard:events'].on("disconnect", () => {
  console.log("disconnected!")
});
```

## 账户变更
Bybit Wallet允许用户从单个扩展程序或移动应用程序中无缝管理多个账户。每当用户切换账户时，Bybit Wallet都会发出一个 `accountChanged` 事件。

如果用户在已连接到应用程序时更改账户，并且新账户已经将该应用程序列入白名单，那么用户将保持连接状态并且Bybit Wallet将传递新账户的公钥：

### 用法

```js
suiWallet.features['standard:events'].on('accountChanged', (publicKey) => {
  if (publicKey) {
      console.log(`Switched to account ${publicKey.toBase58()}`);
  }
});
```