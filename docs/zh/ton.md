# Ton

## 特别说明

Bybit Wallet 的 TON API 完全符合 [Ton Connect 协议](https://docs.ton.org/mandarin/develop/dapps/ton-connect/protocol/) 的规范。

我们强烈建议Dapp可以使用 [TON Connect SDK](https://docs.ton.org/mandarin/develop/dapps/ton-connect/developers) 来更方便地接入 Bybit Wallet。

# 获取注入的对象（JS Bridge）

Bybit Wallet 按照 TON Connect 协议的规范向 Dapp 中注入如下属性: 

```javascript
window.bybitTonWallet.tonconnect
```

其指向的对象的数据结构如下: 

```javascript
interface TonConnectBridge {
    deviceInfo: DeviceInfo;
    walletInfo?: WalletInfo;
    protocolVersion: number;
    connect(protocolVersion: number, message: ConnectRequest): Promise<ConnectEvent>;
    restoreConnection(): Promise<ConnectEvent>;
    send(message: AppRequest): Promise<WalletResponse>;
    listen(callback: (event: WalletEvent) => void): () => void;
}
```

## deviceInfo

用于获取设备信息，数据结构如下: 

```javascript
{
    platform: 'chrome',
    appName: 'Bybit Wallet',
    appVersion: '3.14.0',
    maxProtocolVersion: 2,
    features: [
      'SendTransaction',
      {
        name: 'SendTransaction',
        maxMessages: 4,
      },
    ],
}
```

- `platform`: 设备平台
- `appName`: 钱包名称
- `appVersion`: 钱包版本
- `maxProtocolVersion`: 支持的最大协议版本, 目前只支持 2
- `features`: 钱包支持的特性，目前只支持 SendTransaction，其中 maxMessages 为该特性支持的最大消息数

## walletInfo

用于获取钱包信息，数据结构如下: 

```javascript
{
    name: 'BybitTonWallet',
    app_name: 'BybitTonWallet',
    image: 'https://static.bymj.io/bhop/image/Q3Kmzw7qczSZF5eqfo6pW8QuT1MDMmqC80lWxFBhiE0.png',
    about_url: 'https://www.bybit.com/web3/home',
    platforms: ['chrome', 'android', 'ios'],
}
```

- `name`: 钱包名称
- `app_name`: 钱包应用唯一标识
- `image`: 钱包图标
- `about_url`: 钱包介绍页面
- `platforms`: 钱包支持的平台

## protocolVersion

协议版本号，目前只支持 2

## connect

连接钱包的方法，连接钱包时，也可以对钱包进行签名验证。

```javascript
connect(protocolVersion: number, message: ConnectRequest): Promise<ConnectEvent>;
```

### 入参

- `protocolVersion`: 协议版本号, 目前只支持 2, 传入不支持的版本号会导致连接失败
- `message`: 连接钱包的请求信息
  
  - message 入参:
    
    ```javascript
    type ConnectRequest = {
        manifestUrl: string;
        items: ConnectItem[], // 与应用共享的数据项
    }

    type ConnectItem = TonAddressItem | TonProofItem

    type TonAddressItem = {
        name: "ton_addr";
    }

    type TonProofItem = {
        name: "ton_proof";
        payload: string; // 任意载荷，例如 nonce + 过期时间戳。
    }
    ```
  - `manifestUrl`: Dapp 的 manifest.json 文件的 URL，该文件中包含 Dapp 的元信息，数据结构如下: 
  - `items`: 与应用共享的数据项，目前只支持 ton_addr 和 ton_proof 两种数据项:
    - `ton_addr` 用于获取用户的 TON 地址、公钥等信息, 类比Etherum的`eth_requestAccounts`;
    - `ton_proof` 用于验证用户的签名，具体的验证方法请参考 [TON Proof](https://docs.ton.org/mandarin/develop/dapps/ton-connect/sign);

### 返回值

返回一个 Promise 对象，Promise 对象的结果为 ConnectEvent，数据结构如下: 
```javascript
type ConnectEvent = ConnectEventSuccess | ConnectEventError;

type ConnectEventSuccess = {
  event: "connect";
  id: number; // 递增的事件计数器
  payload: {
      items: ConnectItemReply[];
      device: DeviceInfo;
  }
}

type ConnectEventError = {
  event: "connect_error",
  id: number; // 递增的事件计数器
  payload: {
      code: number;
      message: string;
  }
}

// 与 window.bybitTonWallet.tonconnect 对象上的 deviceInfo 完全相同
type DeviceInfo = {
  platform: "iphone" | "ipad" | "android" | "windows" | "mac" | "linux";
  appName: string;
  appVersion: string;
  maxProtocolVersion: number;
  features: Feature[];
}

type Feature = { name: 'SendTransaction', maxMessages: number } // `maxMessages` 是钱包支持的一次 `SendTransaction` 中的最大消息数

type ConnectItemReply = TonAddressItemReply | TonProofItemReply;

// 由钱包返回的不受信任的数据。
// 如果您需要保证用户拥有此地址和公钥，您需要额外请求 ton_proof。
type TonAddressItemReply = {
  name: "ton_addr";
  address: string; // TON 地址原始 (`0:<hex>`)
  network: NETWORK; // 网络 global_id
  publicKey: string; // HEX 字符串，不带 0x
  walletStateInit: string; // Base64（不安全 URL）编码的钱包合约的 stateinit cell
}

type TonProofItemReply = {
  name: "ton_proof";
  proof: {
    timestamp: string; // 签名操作的 64 位 unix epoch 时间（秒）
    domain: {
      lengthBytes: number; // AppDomain 长度
      value: string;  // 应用域名（作为 url 部分，无编码）
    };
    signature: string; // base64 编码的签名
    payload: string; // 请求中的载荷
  }
}

// 目前仅支持主网 -239
enum NETWORK {
  MAINNET = '-239',
  TESTNET = '-3'
}
```

### 示例

只是获取用户的地址、公钥等信息: 
```javascript
const result = await window.bybitTonWallet.tonconnect.connect(2, {
    manifestUrl: 'https://example.com/manifest.json',
    items: [{ name: 'ton_addr' }]
})

if (result.event === 'connect') {
    console.log(result.payload.items[0].address)
} else {
    console.log(result.payload.message)
}
```

获取用户的地址、公钥等信息，并验证用户的签名: 
```javascript
const result = await window.bybitTonWallet.tonconnect.connect(2, {
    manifestUrl: 'https://example.com/manifest.json',
    items: [
        { name: 'ton_addr' },
        { name: 'ton_proof', payload: 'nonce' }
    ]
});

if (result.event === 'connect') {
    console.log(result.payload.items[0].address);
    console.log(result.payload.items[1].proof);
} else {
    console.log(result.payload.message);
}
```

## restoreConnection

恢复连接的方法，类比Ethereum的`eth_accounts`方法，只会返回 ton_addr 指令的结果，如果无法连接钱包，则返回错误。

```javascript
restoreConnection(): Promise<ConnectEvent>;
```

### 示例

```javascript
const result = await window.bybitTonWallet.tonconnect.restoreConnection();

if (result.event === 'connect') {
    console.log(result.payload.items[0].address);
} else {
    console.log(result.payload.message);
}
```

## send

发送消息的方法，用于发送交易、调用合约等操作: 

```javascript
send(message: AppRequest): Promise<WalletResponse>;
```

### 入参

- `message`: 发送的消息，数据结构如下: 
  message 入参: 
  ```javascript
  interface AppRequest {
    method: string;
    params: string[];
    id: string;
  }
  ```
  - `method`: 方法名，目前只支持 `SendTransaction` 和 `disconnect`;
  - `id`: 消息的唯一标识，用于标识消息的唯一性；
  - `params`: 方法的参数，目前只支持 `SendTransaction` 方法的 params 参数，`disconnect` 没有参数可传，数据结构如下: 

## SendTransaction消息

```javascript
interface SendTransactionRequest {
    method: 'sendTransaction';
    params: [<transaction-payload>];
    id: string;
}
```

其中 `<transaction-payload>` 是具有以下属性的 JSON: 
- `valid_until（整数，可选）`: unix 时间戳。该时刻之后交易将无效。设置的失效时间不可以超过5分钟，如果距离现在超过5分钟，会被重置为当前时间+5分钟失效。
- `network（NETWORK，可选）`: 目前仅支持主网
- `from（以 wc:hex 格式的字符串，可选）`: DApp打算从中发送交易的发送者地址。
- `messages（信息数组）`: 1-4 条从钱包合约到其他账户的输出消息。所有消息按顺序发送出去，但钱包无法保证消息会按相同顺序被传递和执行。 
    - `message`的结构: 
      - `address（字符串）`: 消息目的地
      - `amount（小数字符串）`: 要发送的纳币数量。
      - `payload（base64 编码的字符串，可选）`: 以 Base64 编码的原始cell BoC。
      - `stateInit（base64 编码的字符串，可选）`: 以 Base64 编码的原始cell BoC。       

### 示例: 

```javascript
{
  "valid_until": 1658253458,
  "network": "-239",
  "from": "0:348bcf827469c5fc38541c77fdd91d4e347eac200f6f2d9fd62dc08885f0415f",
  "messages": [
    {
      "address": "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
      "amount": "20000000",
      "stateInit": "base64bocblahblahblah==" 
    },{
      "address": "0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3",
      "amount": "60000000",
      "payload": "base64bocblahblahblah=="
    }
  ]
}
```

### 返回值: 

返回一个 Promise 对象，Promise 对象的结果为 WalletResponse，其中 result 是签名后的签名串，数据结构如下: 
```javascript
type SendTransactionResponse = SendTransactionResponseSuccess | SendTransactionResponseError;

interface SendTransactionResponseSuccess {
    result: <boc>;
    id: string;

}

interface SendTransactionResponseError {
   error: { code: number; message: string };
   id: string;
}
```

## disconnect 消息

用于断开钱包连接。

### 入参

```javascript
interface DisconnectRequest {
    method: 'disconnect';
    params: [];
    id: string;
}
```

### 返回值

```javascript
type DisconnectResponse = DisconnectResponseSuccess | DisconnectResponseError;

interface DisconnectResponseSuccess {
    result: {};
    id: string;

}

interface DisconnectResponseError {
   error: { code: number; message: string };
   id: string;
}
```

## listen

监听钱包事件的方法，用于监听钱包的事件，如连接、断开连接等。

```javascript
listen(callback: (event: WalletEvent) => void): () => void;
```

### 入参

- `callback`: 事件监听的回调函数，当钱包发生事件时，会调用该回调函数，回调函数的参数为 WalletEvent，数据结构如下: 

```javascript
interface WalletEvent {
    event: WalletEventName;
    id: number; // 递增的事件计数器
    payload: <event-payload>; // 每个事件特定的载荷
}

type WalletEventName = 'connect' | 'connect_error' | 'disconnect';
```

### 返回值

返回一个函数，用于取消监听。