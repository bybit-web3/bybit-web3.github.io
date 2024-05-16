::: warning
Bybit Wallet's current online version does not yet support the Stacks chain. Our mnemonic wallet will soon release a version that supports the Stacks chain. Please stay tuned for our official announcement.

This technical documentation is for developer reference only and does not represent the functionality of the final product.
:::

# Stacks
Stacks is a Layer-1 blockchain that allows for the development of dApps in the DeFi, NFT, and smart contract space on top of Bitcoin. This enables Stacks to leverage the security and stability of Bitcoin while allowing developers to build native dApps on Layer 1.

# Provider API
Bybit Wallet provides two simple Provider APIs that allow you to interact with the Stacks blockchain. These are the JWT API and the General API. We will provide detailed explanations of these two APIs and how to use them below. We recommend using the General API for Dapps as it is more flexible and supports more features.


## General API
The general API is a simple API that allows you to interact with the Bybit Wallet through a simple JSON object. You can use this API to request user signatures, verify user signatures, and get user addresses.

### Connect
`window.bybitWallet.stacks.connect()`

#### Description
Connect to Bybit Wallet and request user authorization.

When you successfully call `window.bybitWallet.stacks.connect()`, the Bybit Wallet connection wallet page will be invoked, and the user can decide whether to connect to the current DApp. If the user agrees, the address (address) and public key (public key) will be returned.

#### Return
```json
{
  "address": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // Stacks address
  "publicKey": "03a9c4..." // Stacks public key
}
```

#### Example
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

### Sign Message
`window.bybitWallet.stacks.signMessage(data)`

#### Description
Request the user to sign a specific message.

#### Parameters
```json
{
  "message": "Hello, World!",
    }
```

#### Return
```json
{
  "signature": "0x...",
  "publicKey": "0x..."
}
```

#### Example
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

### Transfer STX
`window.bybitWallet.stacks.signTransaction(data)`

#### Description
Request the user to sign a STX token transfer transaction.

#### Parameters
```json
{
    "stxAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X", // User's own Stacks address
    "recipient": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // Recipient's Stacks address
    "txType": "token_transfer", // Transaction type, must be token_transfer
    "amount": "1000000", // Unit is uSTX, 1 STX = 1e6 uSTX
    "memo": "Hello, World!", // Optional, transaction memo
    "anchorMode": 3, // Optional, transaction mode, default is 3, 1: transaction must be received by anchored block, 2: transaction must be received by microblock, 3: either can be received
}
```

#### Return
```json
{
  "txHash": "0x...", // Transaction hash
  "signature": "0x..." // Signed transaction data
}
```

#### Example
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

### Sign Contract Call
`window.bybitWallet.stacks.signTransaction(data)`

#### Description
Request the user to sign a contract call transaction, which is a transfer of non-STX tokens and is also a contract call.

#### Parameters
```json
{
    "stxAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6X", // User's own Stacks address
    "txType": "contract_call", // Transaction type, must be contract_call
    "contractAddress": "SP1JY9VZV6GQG2QYJ6F2VQY2Y9WZ6Y9WZ6Y9WZ6Y", // Contract address
    "contractName": "contract_name", // Contract name
    "functionName": "function_name", // Contract method
    "functionArgs": ["arg1", "arg2"], // Contract method parameters
    "postConditionMode": 1, // Optional, contract call post-condition mode, default is 1, 1: contract call post-condition must be met, 2: contract call post-condition can be ignored
    "postConditions": [], // Optional, type is string[], contract call post-conditions, an empty array means no post-conditions, for example: ["STX.balance > 1000"]
    "anchorMode": 3, // Optional, transaction mode, default is 3, 1: transaction must be received by anchored block, 2: transaction must be received by microblock, 3: either can be received
}
```

#### Return
```json
{
  "txHash": "0x...", // Transaction hash
  "signature": "0x..." // Signed transaction data
}
```

#### Example
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
The JWT API is a simple API that allows you to interact with Bybit Wallet using a JWT token. You can use this API to request user signatures, verify user signatures, and get user addresses.
Please note that due to technical limitations, the JWT API only supports mnemonic wallets and does not currently support private key wallets connecting to DApps.

To use the JWT API, it is generally recommended to use the official `@stacks/connect` JavaScript SDK component. For more information, please refer to the [@stacks/connect](https://connect.stacks.js.org/modules/_stacks_connect) documentation.

The JWT API is suitable for more complex scenarios. If your DApp only requires simple message signing and transaction sending functionality, we recommend using the General API instead. For more information about the JWT API, please refer to the [Stacks Connect](https://connect.stacks.js.org/) documentation.

### Demo

You can use the official `Starter kit` to quickly build a Stacks Dapp. For more information, please refer to: [Stacks React Starter](https://github.com/hirosystems/stacks.js-starters).

### Request Authorization (Similar to Connect Account)
`window.bybitWallet.stacks.authenticationRequest(payload: string)`

#### Description

Request user authorization, users can obtain a JWT Token, which can be used for subsequent signature requests. Using the jsontokens JavaScript library, the user's address and public key can be parsed out.


### Example
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

### Sign Message
`window.bybitWallet.stacks.signatureRequest(payload: string)`

#### Example
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

### Transaction Request(Transfer STX / Contract Call)
`window.bybitWallet.stacks.transactionRequest(payload: string)`

#### Description
Request the user to sign a STX token transfer transaction or a contract call transaction.

#### Example

##### (In a React component) STX Transfer
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

##### (In a React component) Contract Call
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