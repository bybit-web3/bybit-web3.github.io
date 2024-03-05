
# 当前钱包运行环境检测

## 检测Bybit Wallet是否已安装并正常运行

首先，我们需要检测Bybit Wallet是否已安装并正常运行。
```js
if (typeof window.bybitWallet !== 'undefined') {
  console.log('bybitWallet is installed!');
}
```

## 检测当前版本是否已经支持Bitcoin链
```js
if (typeof window.bybitWallet.bitcoin !== 'undefined') {
  console.log('Bitcoin chain is supported!');
}
```

---

# Provider API

## 什么是 Injected provider API？

Injected provider API 是一种标准的 JavaScript API，用于与 Bybit Wallet 进行交互。它允许 DApp 与 Bybit Wallet 进行交互，以便于用户进行授权、签名、发送交易等操作。

## 连接账户 - Connect

`window.bybitWallet.solana.connect()`

### 功能
连接钱包

### 参数
无

### 返回值

```ts
Promise<{
    address: string,
    publicKey: string
}>
```
### 示例
```ts
const result = await window.bybitWallet.bitcoin.connect()
// example
{
  address: 'bc1pwqye6x35g2n6xpwalywhpsvsu39k3l6086cvdgqazlw9mz2meansz9knaq',
  publicKey: '4a627f388196639041ce226c0229560127ef9a5a39d4885123cd82dc82d8b497'
 }
```

## 请求连接 - requestAccounts
`window.bybitWallet.bitcoin.requestAccounts()`

### 描述
请求连接当前账户，如果用户没有授权过，会弹出连接弹窗，用户同意后，才会返回账户

### 参数
无

### 返回值

```ts
Promise<string[]>
```
### 示例
```ts
try {
    let accounts = await window.bybitWallet.bitcoin.requestAccounts();
    console.log('connect success', accounts);
} catch (e) {
    console.log('connect failed');
}

// example
['tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'];
```

## 获取账号 - getAccounts
`window.bybitWallet.bitcoin.getAccounts()`

### 描述
获取当前账户地址，该方法不会触发连接弹窗，如果Dapp没有连接钱包，返回空数组。

### 参数
无

### 返回值

```ts
Promise<string[]>
```

### 示例
```ts
try {
    let accounts = await window.bybitWallet.bitcoin.getAccounts();
    console.log('success', accounts);
} catch (e) {
    console.log(e);
}

// example
['tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'];
```

## 获取网络 - getNetwork
`window.bybitWallet.bitcoin.getNetwork()`

### 描述
获取当前网络，返回字符串，livenet或者testnet，目前Bybit Wallet只支持这livenet，所以永远会返回livenet

### 参数
无

### 返回值

```ts
Promise<string> // 网络
```

### 示例
```ts
try {
  let res = await window.bybitWallet.bitcoin.getNetwork();
  console.log(res);
} catch (e) {
  console.log(e);
}
// example
livenet;
```

## 获取公钥 - getPublicKey
`window.bybitWallet.bitcoin.getPublicKey()`

### 描述
获取当前账户的公钥

### 参数
无

### 返回值

```ts
Promise<string> // 公钥
```

### 示例
```ts
try {
    let publicKey = await window.bybitWallet.bitcoin.getPublicKey();
    console.log('success', publicKey);
} catch (e) {
    console.log(e);
}

// example
['tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'];
```

## 获取余额 - getBalance
`window.bybitWallet.bitcoin.getBalance()`

### 描述
获取当前账户的余额

### 参数
无

### 返回值

```ts
Promise<{
    confirmed: number; // 已确认的sat数量
    unconfirmed: number; // 未经确认的聪的数量
    total: number; // total amount of sat
}>
```

### 示例
```ts
try {
    let res = await window.bybitWallet.bitcoin.getBalance();
    console.log(res);
} catch (e) {
    console.log(e);
}

// example
{
    "confirmed":0,
    "unconfirmed":100000,
    "total":100000
}
```

## 获取账户的铭文列表 - getInscriptions
`window.bybitWallet.bitcoin.getInscriptions([cursor, size])`

### 描述
获取当前账户的铭文列表

### 参数
```ts
cursor?: number; // 偏移量, start from 0, default 0
size?: number; // 每页的数量， default 20
```

### 返回值

```ts
Promise<{
    total: number; // 总数
    list: Array<{
        inscriptionId: string; // 铭文ID
        inscriptionNumber: string; // 铭文编号
        address: string; // 铭文地址
        outputValue: string; // 铭文的输出值
        contentLength: string; // 铭文的内容长度
        contentType: string; // 铭文的内容类型
        timestamp: string; // 铭文的区块时间
        offset: number; // 铭文的偏移量
        output: string; // 当前铭文所在 UTXO 的标识
        genesisTransaction: string; // 创世交易的交易 ID
        location: string; // 当前位置的 txid 和 vout
    }>
}>
```

### 示例
```ts
try {
    let res = await window.bybitWallet.bitcoin.getInscriptions(0, 20);
    console.log(res)
} catch (e) {
    console.log(e);
}
// example
{
    "total":10,
    "list":[{
          inscriptionId: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
          inscriptionNumber: 55878989,
          address: 'bc1q8h8s4zd9y0lkrx334aqnj4ykqs220ss735a3gh',
          outputValue: 546,
          contentLength: 53,
          contentType: 'text/plain',
          timestamp: 1705406294,
          location: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0:0',
          output: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0',
          offset: 0,
          genesisTransaction: '02c9eae52923fdb21fe16ee9eb873c7d66fe412a61b75147451d8a47d089def4'}
     ]
}
```

## 发送比特币 - sendBitcoin
`window.bybitWallet.bitcoin.sendBitcoin(toAddress, satoshis, options)`

### 描述
发送比特币, 该方法会弹出发送弹窗，用户确认后，会发送交易

### 参数
```ts
toAddress: string; // 发送地址
satoshis: number; // 发送的sat数量
options?: {
    feeRate: number; // network fee rate
} 
```

### 返回值

```ts
Promise<string> // 交易hash
```

### 示例
```ts
try {
  let txid = await window.bybitWallet.bitcoin.sendBitcoin(
    'tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz',
    1000
  );
  console.log(txid);
} catch (e) {
  console.log(e);
}
```

## 发送铭文 - sendInscription
`window.bybitWallet.bitcoin.sendInscription(address, inscriptionId, option)`

### 描述
发送铭文，该方法会弹出发送弹窗，用户确认后，会发送交易

### 参数
```ts
address: string; // 接收者地址
inscriptionId: string; // 铭文 ID
option?: {
    feeRate: number; // 自定义费率
}
```

### 返回值

```ts
Promise<string> // 交易hash
```

### 示例
```ts
try {
  let txid = await window.bybitWallet.bitcoin.sendInscription(
    'tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny',
    'e9b86a063d78cc8a1ed17d291703bcc95bcd521e087ab0c7f1621c9c607def1ai0',
    { feeRate: 15 }
  );
  console.log(
    'send Inscription 204 to tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny',
    { txid }
  );
} catch (e) {
  console.log(e);
}
```

## 铭刻可转移的 BRC-20 - inscribeTransfer
`window.bybitWallet.bitcoin.inscribeTransfer(ticker, amount)`

### 描述
铭刻可转移的 BRC-20，该方法会弹出发送弹窗，用户确认后，会发送交易

### 参数
```ts
ticker: string; // BRC-20 token的标识
amount: number; // 铭刻的数量
```

### 返回值

```ts
Promise<string> // 交易hash
```

## 签名消息 - signMessage
`window.bybitWallet.bitcoin.signMessage(msg[, type])`

### 描述
签名消息

### 参数
```ts
msg: string; // 消息
type?: 'hex' | 'utf8'; // "ecdsa" | "bip322-simple". default is "ecdsa"
```

### 返回值

```ts
Promise<string> // 签名
```

### 示例
```ts
const msg = 'need sign string';
const result = await window.bybitWallet.bitcoin.signMessage(msg, 'ecdsa')
// example
INg2ZeG8b6GsiYLiWeQQpvmfFHqCt3zC6ocdlN9ZRQLhSFZdGhgYWF8ipar1wqJtYufxzSYiZm5kdlAcnxgZWQU=
```

## 广播交易 - pushTx
`window.bybitWallet.bitcoin.pushTx(rawTx)`

### 描述
广播交易

### 参数
```ts
rawTx: string; // 交易的原始数据
```

### 返回值

```ts
Promise<string> // 交易hash
```

### 示例
```ts
try {
  let txid = await window.bybitWallet.bitcoin.pushTx('0200000000010135bd7d...');
  console.log(txid);
} catch (e) {
  console.log(e);
}
```

## 签名Psbt - signPsbt
`window.bybitWallet.bitcoin.signPsbt(psbtHex[, options])`

### 描述
签名Psbt，该方法会弹出签名弹窗，用户确认后，会签名交易

### 参数
```ts
psbtHex: string; // 要签名的 psbt 的十六进制字符串
options?: {
    autoFinalized: boolean; 
    toSignInputs: Array<{
        index: number; // 要签名的输入
        address: string; // (至少指定地址或公钥) 用于签名的相应私钥
        publicKey: string; //  (至少指定地址或公钥) 用于签名的相应私钥
        sighashTypes: number[]; // sighashTypes
        disableTweakSigner: boolean; // (可选) 签名和解锁 Taproot 地址时， 默认使用 tweakSigner 来生成签名，启用此选项允许使用原始私钥进行签名
    }>
}
```

### 返回值

```ts
Promise<string> // 签名后的 psbt 的十六进制字符串
```

### 示例
```ts
try {
  let res = await window.bybitWallet.bitcoin.signPsbt('70736274ff01007d....', {
    autoFinalized: false,
    toSignInputs: [
      {
        index: 0,
        address: 'tb1q8h8....mjxzny',
      },
      {
        index: 1,
        publicKey: 'tb1q8h8....mjxzny',
        sighashTypes: [1],
      },
      {
        index: 2,
        publicKey: '02062...8779693f',
      },
    ],
  });
  console.log(res);
} catch (e) {
  console.log(e);
}

window.bybitWallet.bitcoin.signPsbt('xxxxxxxx', {
  toSignInputs: [{ index: 0, publicKey: 'xxxxxx', disableTweakSigner: true }],
  autoFinalized: false,
});
```

## 广播PSBT交易 - pushPsbt
`window.bybitWallet.bitcoin.pushPsbt(psbtHex)`

### 描述
广播PSBT交易

### 参数
```ts
psbtHex: string; // 要推送的 psbt 的十六进制字符串
```

### 返回值

```ts
Promise<string> // 交易hash
```

### 示例
```ts
try {
  let res = await window.bybitWallet.bitcoin.pushPsbt('70736274ff01007d....');
  console.log(res);
} catch (e) {
  console.log(e);
}
```


# 事件

## accountsChanged

### 描述
每当用户暴露的账户地址发生变化时，就会发出该消息

### 示例
```ts
window.bybitWallet.bitcoin.on('accountsChanged', (accounts) => {
  console.log(accounts)[
    // example
    'tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'
  ];
});
```
