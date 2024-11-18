# Tron

## 什么是Tron

Tron，又称“波场”，最初作为基于Ethereum的代币而创建，最终在2018年迁移到自己的网络。 
按照该过程的设计，投资者将Ethereum代币交易为Tron的TRX加密货币，又称“波场币”。（Ethereum代币随后被销毁。）

## 获取钱包地址

钱包账户地址被用于多种场景，包括作为标识符和用于签名交易。
Dapp和Bybit Wallet之间的交互，都是通过`window.bybitWallet.tronLink`对象来实现的。
其中，在`window.bybitWallet.tronLink`对象中，会暴露一个tronweb对象，开发者可以通过tronweb对象来调用Tron的API。


### 连接钱包

首先，我们强烈建议开发者通过Tron官方的SDK来连接钱包，这样可以保证连接的安全性。请参考[tronwallet-adapters](https://www.npmjs.com/package/@tronweb3/tronwallet-adapters)。

此外，开发者也可以通过下面的代码来连接钱包：

```javascript
const address = await window.bybitWallet.tronLink.request({ method: 'tron_requestAccounts'});
console.log('address:', address);
```
或者通过下面的代码来连接钱包：

```javascript
const address = await window.bybitWallet.tronLink.connect();
console.log('address:', address);
```

## 签名交易

在 TRON 网络上发起转账需要 3 个步骤：

1. 创建转账交易
2. 签署交易
2. 广播签署的交易
   
在这个过程中，第 2 步需要 TronLink，而第 1 步和第 3 步都发生在 tronWeb 上。

### 步骤1: 创建转账交易

#### sendTRX

创建一个未签名的TRX转账交易

```Typescript
window.bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx(to,amount,from,options);
```

##### 参数
- to: string - 接收方地址
- amount: number - 转账金额, 单位是SUN
- from: string - 发送方地址
- options: number - 可选，交易的额外参数, 比如permission Id

##### 示例

```Typescript
window.bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
```

### 步骤2: 签署交易

`sign` 为交易签名

```Typescript
// sign a transaction
const res = await window.bybitWallet.tronLink.sign(transaction);
console.log('sign result:', res);
```

##### 参数
- transaction: JSON - 交易对象

##### 示例

```Typescript
const tradeobj = await bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);
const signedtxn = await bybitWallet.tronLink.sign(tradeobj);
console.log(signedtxn)
```

### 步骤3: 广播签署的交易

`sendRawTransaction` 将已签名的交易广播到网络。

```Typescript
// sign a transaction
window.bybitWallet.tronLink.tronWeb.trx.sendRawTransaction(signedTransaction);
```

##### 参数
- signedTransaction: JSON - 签名后的交易对象

##### 示例

```Typescript
const tronWeb = window.bybitWallet.tronLink.tronWeb;
const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100,"TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",1);
const signedtxn = await  window.bybitWallet.tronLink.sign(tradeobj);
const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
console.log(receipt)
```

## 签名信息

```Typescript
window.bybitWallet.tronLink.signMessage(message);
```

DApp 要求用户签署消息, 以验证用户的身份。

##### 参数
- message: string - 要签名的消息, 就是普通的字符串

##### 示例

```Typescript
const message = "hello world";
const signature = await window.bybitWallet.tronLink.signMessage(message);
console.log('signature:', signature);
```

## 验证签名信息

```Typescript
window.bybitWallet.tronLink.verifyMessage(message, signature, address);
```

DApp 验证用户签名的消息。

##### 参数
- message: string - 要验证的消息
- signature: string - 签名
- address: string - 签名的地址

##### 示例

```Typescript
const message = "hello world";
const signature = "0x7f..."; // signature from signMessage
const address = "TNo9e8MW..."; // address from signMessage
const isValid = await window.bybitWallet.tronLink.verifyMessage(message, signature, address);
console.log('isValid:', isValid);
```

## 事件

### 成功连接

#### 触发场景
DApp 请求连接，用户在弹窗中确认连接。

```typescript
window.addEventListener('message', function (e) {
  if (e.data.message && e.data.message.action == "connect") {
    // handler logic
    console.log('got connect event', e.data)
  }
})
```

### 断开连接

#### 触发场景
用户主动断开连接。

```typescript
window.addEventListener('message', function (e) {
  if (e.data.message && e.data.message.action == "disconnect") {
    // handler logic
    console.log('got disconnect event', e.data)
  }
})
```

### 账户地址变化

#### 触发场景
- 用户连接钱包
- 用户切换账户
- 用户锁定账户
- 超时后钱包自动锁定

```typescript
window.addEventListener('message', function (e) {
  if (e.data.message && e.data.message.action === "accountsChanged") {
    // handler logic
    console.log('got accountsChanged event', e.data)
  }
})
```



