# Aptos/Movement
Aptos is a Layer 1 blockchain project aimed at building scalable, upgradeable, and secure Web3 infrastructure. Initially created by the team behind Facebook's stablecoin project Libra (later renamed Diem), Aptos is now independently developed by some of the original team members. Aptos uses the Move smart contract language, and common Aptos-compatible networks include Movement and others.

# What is the Injected Provider API?

The Injected Provider API is a JavaScript API that Bybit Wallet injects into websites visited by users. Your DApp can use this API to request user accounts, read data from the blockchain connected by the user, and help users sign messages and transactions.

# AIP-62

[AIP-62](https://aptos.dev/en/build/sdks/wallet-adapter/wallets) is an Aptos Improvement Proposal aimed at standardizing the interaction interface between wallets and dApps. The main goal of this proposal is to provide a unified standard for wallet and dApp developers in the Aptos ecosystem, enabling better integration and interaction.

Key features of AIP-62 include:

1. Standardized Interface: Defines a set of standard methods and events, making communication between wallets and dApps more consistent and predictable.

2. Improved User Experience: Through a unified interface, users can have a more consistent experience when using wallets across different dApps.

3. Simplified Development: Provides clear guidelines for developers, reducing the complexity of implementing wallet integration.

4. Enhanced Interoperability: Makes it easier for different wallets and dApps to be compatible and integrate with each other.

5. Security Considerations: Security has been considered in the design process to protect users' assets and privacy.

By implementing AIP-62, wallet and dApp developers in the Aptos ecosystem can more easily create compatible products, thereby promoting the development and user adoption of the entire ecosystem.

# Obtaining the Wallet Object

Similar to Sui and Solana, Aptos wallets use the wallet standard, which differs from other heterogeneous chains. The wallet object can be obtained through event notification:

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

# Connecting to Wallet Using Aptos Official Dapp SDK (Highly Recommended)

Developers can also connect to the wallet using the official `Aptos` Dapp SDK. The usage of the SDK is as follows:
https://aptos.dev/en/build/sdks/wallet-adapter

# Connecting an Account

Method used: `window.bybitWallet.aptos.connect()`

Connecting to Bybit Wallet can be done by calling `window.bybitWallet.aptos.connect()`.
The `connect` call will return a `Promise` object that `resolves` when the user accepts the connection request and `rejects` when the user denies the request or closes the popup. For detailed information about possible errors with Bybit Wallet, please refer to the error codes. When the user accepts the connection request, the `connect` event will be triggered.

```js
const res = await window.bybitWallet.aptos.connect();

// res structure:
{
    status: 'Approved',
    args: {
        address: AccountInstance,
        publicKey: PublicKeyInstance
    }
}
```

# Get Current Account Information (Without Popup)

Method used: `window.bybitWallet.aptos.account()`

The returned data structure is consistent with the data returned by the connect method above, but it does not trigger a popup.

```js
const account = await window.bybitWallet.aptos.account();
```

# Get the Current Connected Network

Method used: `window.bybitWallet.aptos.network()`

Calling `window.bybitWallet.aptos.network()` will get the network information of the current Dapp connection and return the name of the connected network. Currently, Bybit Wallet only supports `Mainnet` | `Movement Testnet`.

```js
const network = await window.bybitWallet.aptos.network();
console.log('network', network); // Returns 'Mainnet'
```

# Transaction Signing

## Signing and Sending Transactions

Method used: `window.bybitWallet.aptos.signAndExecuteTransactionBlock(transaction)`

By calling the `window.bybitWallet.aptos.signAndSubmitTransaction(transaction)` method, you can initiate a transaction on the Aptos chain, and this method will return a transaction Hash, which can be used to query the transaction status.

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
## Signing Transactions Only, Without Broadcasting

Method used: `window.bybitWallet.aptos.signTransactionBlock(transaction)`

This method only signs the transaction without initiating a blockchain operation, and it returns a signed Buffer object.

```js
const transaction = {
  arguments: [address, '717'],
  function: '0x1::coin::transfer',
  type: 'entry_function_payload',
  type_arguments: ['0x1::aptos_coin::AptosCoin'],
};

const signedTransaction = await window.bybitWallet.aptos.signTransactionBlock(transaction);
```

# Signing Messages

Method used: `window.bybitWallet.aptos.signMessage(message)`

By calling the `window.bybitWallet.aptos.signMessage(message)` method, you can sign a message, which will return the signed message, signature information, input, and output information. The structure is as follows:

Input:

```typescript
type AptosSignMessageInput = {
    address?: boolean;
    application?: boolean;
    chainId?: boolean;
    message: string;
    nonce: string;
};
```

Returns:
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

# Message Signature Verification

Example:
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

# Events

## Successful Connection

When the wallet is connected, the `connect` event will not be triggered, but you can listen for account changes through the `accountChanged` event. If the `accountChanged` event is triggered and the account is `['xxxxxxx']`, it indicates that the wallet is successfully connected.

### Usage

```js
window.bybitWallet.aptos.onAccountChange((newAccount) => {
  if (newAccount.length > 0) {
    console.log("connected!");
  }
});
```

## Disconnection

When the wallet is disconnected, the `disconnect` event will not be triggered, but you can listen for account changes through the `accountChanged` event. If the `accountChanged` event is triggered and the account is `[]`, it indicates that the wallet is disconnected.

Example:

```js
window.bybitWallet.aptos.onAccountChange((newAccount) => {
  if (newAccount.length === 0) {
    console.log("disconnected!");
  }
});
```
### Usage

```js
suiWallet.features['standard:events'].on("disconnect", () => {
  console.log("disconnected!")
});
```

## Account Change

When the user switches accounts, you need to listen for the wallet switch event: `onAccountChange`.

Example:

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