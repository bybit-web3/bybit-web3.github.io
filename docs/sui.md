# SUI
Sui, also known as Sui Network, is the first Layer 1 blockchain designed from scratch to provide a brand new experience for billions of Web3 new users. Sui is horizontally scalable, supporting diverse DApp development at high speed and low cost. It pioneers the concept of a universal blockchain, offering high throughput, ultra-fast settlement speed, rich on-chain assets, and user-friendly Web3 experience. Sui represents a significant leap forward in blockchain technology, designed from the ground up to meet the needs of all stakeholders in the cryptocurrency ecosystem.

# What is the Injected provider API?

The Injected provider API is a JavaScript API that Bybit Wallet injects into the websites users access. Your DApp can use this API to request user accounts, read data from the connected blockchain, assist users in signing messages and transactions.

# Obtaining the wallet object
Sui Wallet uses the wallet standard, which is slightly different from other heterogeneous chains. You can obtain the wallet object through event notification:

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

# Connecting to the wallet using Sui's official Dapp SDK (strongly recommended)

Developers can also connect to the wallet using Sui's official Dapp SDK. The usage of the SDK is as follows:
https://sdk.mystenlabs.com/dapp-kit/

# Connecting to an account

The method used is: `suiWallet.features['standard:connect'].connect()`

To connect to Bybit Wallet, you can call `suiWallet.features['standard:connect'].connect()`.
The `connect` call will return a `Promise` that `resolve`s when the user accepts the connection request or `reject`s when the user declines the request or closes the popup window. When the user accepts the connection request, the `suiWallet.features['standard:events']` will also trigger a connection event.

```js
const suiAccounts = await suiWallet.features['standard:connect'].connect();

// Structure of suiAccounts:
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

# Transaction signing

## Signing and executing a transaction

The method used is: `suiWallet.features['sui:signAndExecuteTransactionBlock'].signAndExecuteTransactionBlock`

With the obtained `suiWallet` object, you can sign transactions:

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

console.log('result', result); // Get the transaction status through result?.effects?.status?.status, 'success' for success, 'failure' for failure
```

## Splitting coins

When sending a transaction, if the object that needs to be sent itself is used to pay for gas fees, you need to split the coin.

```js
const handleTransaction = async () => {
    const tx = new TransactionBlock()

    const value = '300000000'  // The target value to be split
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
    // Get the transaction status through result?.effects?.status?.status, 'success' for success, 'failure' for failure
}
```

## Signing a transaction (without broadcasting)

You can sign a transaction block (a collection of multiple transactions) using the `signTransactionBlock` method on the `provider`.

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

# Signing a message

After creating a transaction, a web application may ask the user's Bybit Wallet to sign the transaction without submitting it to the network. Calling the `signMessage` method will return a `Promise` for the signed transaction.

```js
import { ethers } from 'ethers';
// Here we use the ethers library to help us handle the message and convert it to Uint8Array type
// Of course, you can use other methods to convert the message to Uint8Array type

const message = ethers.utils.toUtf8Bytes('hello, bybit');
const { signature, messageBytes } = await suiWallet.features['sui:signMessage'].signMessage({ message });
console.log('signature', signature);
console.log('messageBytes', messageBytes);
```

# Events

## Successful connection
You can connect to Bybit Wallet by calling `suiWallet.features['standard:events'].on`. When the user accepts the connection request, the connection event will be triggered.

### Usage

```js  
suiWallet.features['standard:events'].on("connect", () => console.log("connected!"));
```

## Disconnection
Disconnection works the same way as connection. However, the wallet may also initiate disconnection instead of the application itself.

### Usage

```js
suiWallet.features['standard:events'].on("disconnect", () => {
  console.log("disconnected!")
});
```

## Account change
Bybit Wallet allows users to seamlessly manage multiple accounts from a single extension or mobile application. Whenever a user switches accounts, Bybit Wallet emits an `accountChanged` event.

If the user changes accounts while connected to the application and the new account has whitelisted the application, the user will remain connected and Bybit Wallet will pass the public key of the new account:

### Usage

```js
suiWallet.features['standard:events'].on('accountChanged', (publicKey) => {
  if (publicKey) {
      console.log(`Switched to account ${publicKey.toBase58()}`);
  }
});
```
