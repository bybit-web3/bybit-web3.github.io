# Stacks
Stacks 是一个 Layer-1 区块链，允许在比特币之上构建 DeFi、NFT 和智能合约领域的 dApps。这使得 Stacks 可以利用比特币的安全性和稳定性，同时允许开发人员在 Layer 1 上构建本地的 dApps。

# Provider API
Bybit Wallet 提供了一个两套简单的 Provider API，允许您与 Stacks 区块链进行交互。分别是JWT API和通用API。我们将在下面详细介绍这两个API，以及如何使用它们。我们更加建议Dapp使用通用API，因为通用API更加灵活，支持更多的功能。


## 通用API
通用API 是一种简单的 API，允许您通过 简单的JSON对象 与 Bybit Wallet 进行交互。您可以使用此 API 来请求用户的签名、验证用户的签名、获取用户的地址等。

### 连接账户
`window.bybitWallet.stacks.connect()`

#### 描述
连接到 Bybit Wallet 并请求用户授权。

当成功调用 `window.bybitWallet.stacks.connect()`，将会唤起 Bybit Wallet 连接钱包页面，用户可以决定是否连接当前 DApp，如果用户同意将会返回地址 (address) 和公钥 (public key)。

#### 返回
```json
{
  "address": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // Stacks 地址
  "publicKey": "03a9c4..." // Stacks 公钥
}
```

#### 示例
```js
try {
    const response = await window.bybitWallet.stacks.connect();
    console.log(response);
    // { address: string, publicKey: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
```

### 消息签名
`window.bybitWallet.stacks.signMessage(data)`

#### 描述
请求用户签名一个特定的消息。

#### 参数
```json
{
  "message": "Hello, World!",
    }
```

#### 返回
```json
{
  "signature": "0x...",
  "publicKey": "0x..."
}
```

#### 示例
```js
try {
    const response = await window.bybitWallet.stacks.signMessage({
        message: "Hello, World!"
    });
    console.log(response);
    // { signature: string, publicKey: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
```

### 转账STX
`window.bybitWallet.stacks.signTransaction(data)`

#### 描述
请求用户签名一个STX token转账交易。

#### 参数
```json
{
    "stxAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X", // 用户自己的Stacks地址
    "recipient": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // 接收者的Stacks地址
    "txType": "token_transfer", // 交易类型, 必须是token_transfer
    "amount": "1000000", // 单位为 uSTX, 1 STX = 1e6 uSTX
    "memo": "Hello, World!", // 可选, 交易备注
    "anchorMode": 3, // 可选, 交易模式, 默认为3, 1: 交易必须被 anchored block 接收, 2: 交易必须被 microblock 接收, 3: 可以任意选择一种接收方式
}
```

#### 返回
```json
{
  "txHash": "0x...", // 交易哈希
  "signature": "0x..." // 签名后的交易数据
}
```

#### 示例
```js
try {
    const response = await window.bybitWallet.stacks.signTransaction({
        stxAddress: "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X",
        recipient: "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y",
        txType: "token_transfer",
        amount: "1000000",
        memo: "Hello, World!",
        anchorMode: 3
    });
    console.log(response);
    // { txHash: string, signature: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
```

### 合约调用
`window.bybitWallet.stacks.signTransaction(data)`

#### 描述
请求用户签名一个合约调用交易，转账非STX token，也属于合约调用。

#### 参数
```json
{
    "stxAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X", // 用户自己的Stacks地址
    "txType": "contract_call", // 交易类型, 必须是contract_call
    "contractAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // 合约地址
    "contractName": "contract_name", // 合约名称
    "functionName": "function_name", // 合约方法
    "functionArgs": ["arg1", "arg2"], // 合约方法参数
    "postConditionMode": 1, // 可选, 合约调用后置条件模式, 默认为1, 1: 合约调用后置条件必须被满足, 2: 合约调用后置条件可以被忽略
    "postConditions": [], // 可选, 类型为string[], 合约调用后置条件, 为空数组表示没有后置条件, 例如: ["STX.balance > 1000"]
    "anchorMode": 3, // 可选, 交易模式, 默认为3, 1: 交易必须被 anchored block 接收, 2: 交易必须被 microblock 接收, 3: 可以任意选择一种接收方式
}
```

#### 返回
```json
{
  "txHash": "0x...", // 交易哈希
  "signature": "0x..." // 签名后的交易数据
}
```

#### 示例
```js
try {
    const response = await window.bybitWallet.stacks.signTransaction({
        stxAddress: "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X",
        txType: "contract_call",
        contractAddress: "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y",
        contractName: "contract_name",
        functionName: "function_name",
        functionArgs: ["arg1", "arg2"],
        postConditionMode: 1,
        postConditions: [],
        anchorMode: 3
    });
    console.log(response);
    // { txHash: string, signature: string }
  } catch (error) {
    console.log(error);
    // { code: 4001, message: "User rejected the request."}
  }
```


## JWT API
JWT API 是一种简单的 API，允许您通过 JWT Token 与 Bybit Wallet 进行交互。您可以使用此 API 来请求用户的签名、验证用户的签名、获取用户的地址等。
需要注意的是，由于技术上的限制，JWT API只支持助记词钱包，私钥钱包暂不支持连接到Dapp。

使用JWT API一般需要搭配官方的js sdk组件使用，具体请看：[@stacks/connect](https://connect.stacks.js.org/modules/_stacks_connect).

JWT API适用于比较复杂的场景，如果您的Dapp只需要简单的消息签名功能和发送交易，我们更加建议您使用通用API。关于JWT API的更多介绍，请参考：[Stacks Connect](https://connect.stacks.js.org/).

### 完整Demo
您可以利用官方的`Starter kit`来快速搭建一个Stacks Dapp，具体请看：[Stacks React Starter](https://github.com/hirosystems/stacks.js-starters).

### 请求授权(类似于连接账户)
`window.bybitWallet.stacks.authenticationRequest(payload: string)`

#### 描述
请求用户授权, 用户可以得到一个JWT Token，用于后续的签名请求，利用`jsontokens`这个js库，可以解析出用户的地址和公钥。

### 示例
```js
import { showConnect } from "@stacks/connect";
import { userSession } from "./user-session";

showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  },
  window.bybitWallet.stacks
);
```

### 消息签名
`window.bybitWallet.stacks.signatureRequest(payload: string)`

#### 示例
```js
showSignMessage({
    appDetails: {
    name: "Stacks React Starter",
    icon: window.location.origin + "/logo512.png",
    },
    onFinish: (data) => {
    console.log('onFinish', data)
    setResult(data)
    },
    message,
    userSession,
},
window.bybitWallet.stacks
);
```

### 转账STX / 合约调用
`window.bybitWallet.stacks.transactionRequest(payload: string)`

#### 描述
请求用户签名一个STX token转账交易或者合约调用交易。

#### 示例

##### （在react组件中）转账STX
```js
import { useConnect } from "@stacks/connect-react";
import { StacksMainnet, PostConditionMode, AnchorMode } from "@stacks/network";
const { doSTXTransfer } = useConnect();
const STX_TO_USTX = 1_000_000;

doSTXTransfer({
      network: new StacksMainnet(),
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      amount: BigInt(parseFloat(amount) * STX_TO_USTX),
      recipient,
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=mainnet`,
            "_blank"
          )
          ?.focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    },
    window.bybitWallet.stacks,
  );
```

##### （在react组件中）合约调用
```js
import { useConnect } from "@stacks/connect-react";
import { StacksMainnet, PostConditionMode, AnchorMode } from "@stacks/network";
const { doContractCall } = useConnect();
doContractCall({
      network: new StacksMainnet(),
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=mainnet`,
            "_blank"
          )
          ?.focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    },
    window.bybitWallet.stacks,
  );
```