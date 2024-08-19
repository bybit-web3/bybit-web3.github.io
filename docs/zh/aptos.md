# Aptos网络

Aptos 是一个新兴的区块链平台，旨在提供高性能和安全的去中心化应用（DApp）开发环境。它的设计目标是通过创新的共识机制和智能合约语言，解决现有区块链系统中的性能瓶颈和安全问题。Aptos 的主要特点包括高吞吐量、低延迟和强大的安全性，使其成为开发者和用户的理想选择。

# 什么是 Injected provider API？

Injected providers API 是一个 JavaScript API，Bybit Wallet将其注入用户访问的网站。您的 DApp 可以使用此 API 请求用户帐户，从用户连接的区块链读取数据，帮助用户签署消息和交易。

# AIP-62

[AIP-62](https://aptos.dev/en/build/sdks/wallet-adapter/wallets) 是 Aptos 改进提案（Aptos Improvement Proposal）中的一项，旨在标准化钱包与 dApp 之间的交互接口。这个提案的主要目标是为 Aptos 生态系统中的钱包和 dApp 开发者提供一个统一的标准，以便更好地集成和交互。

AIP-62 的主要特点包括：

1. 标准化接口：定义了一套标准的方法和事件，使钱包和 dApp 之间的通信更加一致和可预测。

2. 改善用户体验：通过统一的接口，用户在不同的 dApp 中使用钱包时可以获得更一致的体验。

3. 简化开发：为开发者提供了清晰的指南，减少了实现钱包集成时的复杂性。

4. 增强互操作性：使不同的钱包和 dApp 能够更容易地相互兼容和集成。

5. 安全性考虑：在设计过程中考虑了安全性，以保护用户的资产和隐私。

通过实施 AIP-62，Aptos 生态系统中的钱包和 dApp 开发者可以更轻松地创建兼容的产品，从而促进整个生态系统的发展和用户采用。


# 获取 wallet 对象

和Sui，Solana相似，Aptos钱包使用的是 wallet standard，相比其他异构链有些不同，可以通过事件通知的方式获取 wallet 对象：

```js
const GlobalWallet = {
    walletList: [],
      register: (wallet) => {
          GlobalWallet.walletList.push(wallet)
      }
  }
  const event = new CustomEvent('wallet-standard:app-ready', { detail: GlobalWallet });
  window.dispatchEvent(event);

const aptosWallet = GlobalWallet.walletList.find(wallet => wallet.name === 'Bybit Wallet' && wallet.chains.includes('aptos:mainnet'));

```

# 通过Aptos官方的Dapp SDK连接钱包(强烈建议)

开发者也可以通过`Aptos`官方的Dapp SDK来连接钱包，SDK的使用方法如下：
https://aptos.dev/en/build/sdks/wallet-adapter

# 连接账户

使用的方法：`window.bybitWallet.aptos.connect()`

连接到Bybit Wallet可以通过调用 `window.bybitWallet.aptos.connect()`。
`connect` 调用将返回一个 `Pr对象： `Promise`  `resolve`，并在用户拒绝请求或关闭弹出窗口时 `reject`。有关Bybit Wallet可能发生错误的详细信息，请参考 错误码。 当用户接受连接请求时，`connect`事件会被触发。

```js
const res = await window.bybitWallet.aptos.connect();

// res 结构:
{
    status: 'Approved',
    args: {
        address: AccountInstance,
        publicKey: PublicKeyInstance
    }
}
```

# 获取当前账户信息(不会拉起弹窗)

使用的方法：`window.bybitWallet.aptos.account()`

返回的数据和上面connect方法返回的数据结构一致，只是不会拉起弹窗。

```js
const account = await window.bybitWallet.aptos.account();
```

# 获取当前连接的网络

使用的方法：`window.bybitWallet.aptos.network()`

调用 `window.bybitWallet.aptos.network()`，将会获取当前 Dapp 链接的网络信息，将会返回链接的网络名称。目前Bybit Wallet只支持`mainnet`。

```js
const network = await window.bybitWallet.aptos.network();
console.log('network', network); // 返回值为 'mainnet'
```

# 交易签名

## 签名并发送交易

使用的方法：`window.bybitWallet.aptos.signAndExecuteTransactionBlock(transaction)`

通过调用 window.bybitWallet.aptos.signAndSubmitTransaction(transaction) 方法来发起一笔 Aptos 链上交易，这个方法将会返回一个交易Hash，这个交易Hash可以用来查询交易状态。

```js
const transaction = {
  arguments: [address, '717'],
  function: '0x1::coin::transfer',
  type: 'entry_function_payload',
  type_arguments: ['0x1::aptos_coin::AptosCoin'],
};

try {
  const pendingTransaction = await window.bybitWallet.aptos.signAndSubmitTransaction(transaction);

  const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/');
  const txn = await client.waitForTransactionWithResult(
      pendingTransaction.hash,
  );
} catch (error) {
  // see "Errors"
}
```

## 仅签名交易，不广播

使用的方法：`window.bybitWallet.aptos.signTransactionBlock(transaction)`

仅仅是签名交易，而不发起上链操作，此方法将返回一个签名的Buffer对象。

```js
const transaction = {
  arguments: [address, '717'],
  function: '0x1::coin::transfer',
  type: 'entry_function_payload',
  type_arguments: ['0x1::aptos_coin::AptosCoin'],
};

const signedTransaction = await window.bybitWallet.aptos.signTransactionBlock(transaction);
```

# 对信息签名

使用的方法：`window.bybitWallet.aptos.signMessage(message)`


通过调用 `window.bybitWallet.aptos.signMessage(message)` 方法来对信息进行签名，将返回签名成功的信息、签名信息、入参和返回信息。结构如下：

入参：

```typescript
type AptosSignMessageInput = {
    address?: boolean;
    application?: boolean;
    chainId?: boolean;
    message: string;
    nonce: string;
};
```

返回：
```typescript
type AptosSignMessageOutput = {
    address?: string;
    application?: string;
    chainId?: number;
    fullMessage: string;
    message: string;
    nonce: string;
    prefix: 'APTOS';
    signature: Signature;
};
```

# 签名消息验证

例子:
```js
import nacl from 'tweetnacl';

const message = 'hello';
const nonce = 'random_string';

try {
    const response = await window.bybitWallet.aptos.signMessage({
        message,
        nonce,
    });
    const { publicKey } = await window.bybitWallet.aptos.account();
    // Remove the 0x prefix
    const key = publicKey!.slice(2, 66);
    const verified = nacl.sign.detached.verify(
        Buffer.from(response.fullMessage),
        Buffer.from(response.signature, 'hex'),
        Buffer.from(key, 'hex'),
);
    console.log(verified);
} catch (error) {
    console.error(error);
}
```


# 事件

## 成功连接

当钱包连接的时候, 并不会有`connect`事件触发，不过可以通过`accountChanged`事件来监听账户变更。如果`accountChanged`事件触发后，account为`['xxxxxxx']`，则表示钱包连接成功。

### 用法

```js  
window.bybitWallet.aptos.onAccountChange((newAccount) => {
  if (newAccount.length > 0) {
    console.log("connected!");
  }
});
```

## 断开连接

当钱包断开连接的时候, 并不会有`disconnect`事件触发，不过可以通过`accountChanged`事件来监听账户变更。如果`accountChanged`事件触发后，account为`[]`，则表示钱包断开连接。

示例：

```js
window.bybitWallet.aptos.onAccountChange((newAccount) => {
  if (newAccount.length === 0) {
    console.log("disconnected!");
  }
});
```

### 用法

```js
suiWallet.features['standard:events'].on("disconnect", () => {
  console.log("disconnected!")
});
```

## 账户变更

当用户在切换账户的时候，需要监听钱包切换事件：`onAccountChange`。

示例：

```js
let currentAccount = await window.bybitWallet.aptos.account();

// event listener for disconnecting
window.bybitWallet.aptos.onAccountChange((newAccount) => {
  // If the new account has already connected to your app then the newAccount will be returned
  if (newAccount) {
    currentAccount = newAccount;
  } else {
    // Otherwise you will need to ask to connect to the new account
    currentAccount = window.bybitWallet.aptos.connect();
  }
});
```