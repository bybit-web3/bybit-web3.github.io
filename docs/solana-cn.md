
# 当前钱包运行环境检测

## 检测Bybit Wallet是否已安装并正常运行

首先，我们需要检测Bybit Wallet是否已安装并正常运行。
```js
if (typeof window.bybitWallet !== 'undefined') {
  console.log('bybitWallet is installed!');
}
```

## 检测当前版本是否已经支持Solana链
```js
if (typeof window.bybitWallet.solana !== 'undefined') {
  console.log('Solana chain is supported!');
}
```

---

# Solana Overview

Solana 是一种高性能的区块链平台，致力于为去中心化应用和加密货币提供快速、安全和可扩展的解决方案。该平台采用了创新的共识算法——Proof of History (PoH)，可以处理高达数万笔交易每秒 (TPS)，同时保持了去中心化和安全性。总的来说，Solana 的目标是通过其独特的技术优势，实现区块链的大规模采用，服务于各种复杂的去中心化应用和全球金融系统。

# Provider API

## 什么是 Injected provider API？

Injected provider API 是一种标准的 JavaScript API，用于与 Bybit Wallet 进行交互。它允许 DApp 与 Bybit Wallet 进行交互，以便于用户进行授权、签名、发送交易等操作。

## 连接账户

`window.bybitWallet.solana.connect()` 方法用于连接 Bybit Wallet 中的账户。该方法返回一个 Promise 对象，当用户完成授权后，Promise 对象会返回一个 `PublicKey` 对象，该对象包含了用户的 Solana 地址。当用户拒绝授权时，Promise 对象会返回一个错误。

```js
window.bybitWallet.solana.connect().then((publicKey) => {
  console.log('Connected to Bybit Wallet!');
  console.log('Your Solana address is: ', publicKey.toBase58());
}).catch((err) => {
  console.log('Failed to connect to Bybit Wallet: ', err);
});
```
当用户成功连接时，会触发 `connect` 事件。我们可以通过监听该事件来执行一些操作，例如更新页面状态。

```js
window.bybitWallet.solana.on('connect', () => {
  console.log('Connected to Bybit Wallet!');
});
```
一旦Dapp连接到Bybit Wallet，就可以通过`window.bybitWallet.solana.publicKey`来获取用户的Solana地址。还可以通过`window.bybitWallet.solana.isConnected`来判断当前Dapp的连接状态。

```js
console.log('Your Solana address is: ', window.bybitWallet.solana.publicKey.toBase58());
console.log('Is connected to Bybit Wallet: ', window.bybitWallet.solana.isConnected);
```

## 签名交易

### 签名并发送交易

`window.bybitWallet.solana.signAndSendTransaction()` 方法用于签名并发送交易。该方法接受一个 `Transaction` 对象作为参数，返回一个 Promise 对象。当用户完成签名后，Promise 对象会返回一个 `TransactionSignature` 对象，该对象包含了交易的签名。当用户拒绝签名时，Promise 对象会返回一个错误。

```js
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: window.bybitWallet.solana.publicKey,
    toPubkey: new PublicKey(''),
    lamports: 1000000000,
  })
);

window.bybitWallet.solana.signAndSendTransaction(transaction).then((signature) => {
  console.log('Transaction sent: ', signature);
}).catch((err) => {
  console.log('Failed to sign and send transaction: ', err);
});
```

### 签名交易(不发送)

`window.bybitWallet.solana.signTransaction()` 方法用于签名交易，但不发送交易。该方法接受一个 `Transaction` 对象作为参数，返回一个 Promise 对象。当用户完成签名后，Promise 对象会返回一个 `Transaction` 对象，该对象包含了交易的签名。当用户拒绝签名时，Promise 对象会返回一个错误。

```js
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: window.bybitWallet.solana.publicKey,
    toPubkey: new PublicKey(''),
    lamports: 1000000000,
  })
);

window.bybitWallet.solana.signTransaction(transaction).then((signedTransaction) => {
  console.log('Transaction signed: ', signedTransaction);
}).catch((err) => {
  console.log('Failed to sign transaction: ', err);
});
```

### 批量签名交易

`window.bybitWallet.solana.signAllTransactions()` 方法用于批量签名交易。该方法接受一个 `Transaction[]` 对象作为参数，返回一个 Promise 对象。当用户完成签名后，Promise 对象会返回一个 `Transaction[]` 对象，该对象包含了交易的签名。当用户拒绝签名时，Promise 对象会返回一个错误。

```js
const transaction1 = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: window.bybitWallet.solana.publicKey,
    toPubkey: new PublicKey(''),
    lamports: 1000000000,
  })
);

const transaction2 = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: window.bybitWallet.solana.publicKey,
    toPubkey: new PublicKey(''),
    lamports: 1000000000,
  })
);

window.bybitWallet.solana.signAllTransactions([transaction1, transaction2]).then((signedTransactions) => {
  console.log('Transactions signed: ', signedTransactions);
}).catch((err) => {
  console.log('Failed to sign transactions: ', err);
});
```

## 签名消息

`window.bybitWallet.solana.signMessage()` 方法用于签名消息。该方法接受一个 `Uint8Array` 对象作为参数，返回一个 Promise 对象。当用户完成签名后，Promise 对象会返回一个 `Uint8Array` 对象，该对象包含了消息的签名。当用户拒绝签名时，Promise 对象会返回一个错误。

当Dapp连接 Bybit Wallet 时，它还可以请求用户签署任意消息。Dapp可以自由设定需要签名的信息，这些信息将在Bybit Wallet中显示给用户。用户可以选择签名或拒绝签名。消息清明并不会消耗Gas Fee，是Dapp验证用户身份的一种方式，或者说是Dapp验证用户钱包地址的所有权的一种便捷方式。

需要注意的是，Dapp必须提供一个16进制或UTF-8编码字符串作为Uint8Array。例如，如果Dapp想要签名一个字符串，它必须先将字符串转换为Uint8Array对象，然后再传递给Bybit Wallet。

```js
const message = new Uint8Array([1, 2, 3, 4, 5]);

window.bybitWallet.solana.signMessage(message).then((signature) => {
  console.log('Message signed: ', signature);
}).catch((err) => {
  console.log('Failed to sign message: ', err);
});
```

## 事件

### 连接事件

当用户连接或断开Bybit Wallet时，会触发 `connect` 事件。我们可以通过监听该事件来执行一些操作，例如更新页面状态。

```js
window.bybitWallet.solana.on('connect', () => {
  console.log('Connected to Bybit Wallet!');
});
```

### 断开事件

当用户连接或断开Bybit Wallet时，会触发 `disconnect` 事件。我们可以通过监听该事件来执行一些操作，例如更新页面状态。需要注意的是，钱包也有可能发起断开连接，而不是Dapp自己断开连接。

```js
window.bybitWallet.solana.on('disconnect', () => {
  console.log('Disconnected from Bybit Wallet!');
});
```

### 账户变更事件

当用户在Bybit Wallet中切换账户时，会触发 `accountChanged` 事件。我们可以通过监听该事件来执行一些操作，例如更新页面状态。

```js
window.bybitWallet.solana.on('accountChanged', (publicKey) => {
  console.log('Your Solana address is: ', publicKey.toBase58());
});
```
