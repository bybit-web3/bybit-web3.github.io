::: warning
The current online version of Bybit Wallet does not yet support the Solana chain. We will release a version that supports the Solana chain in the near future. Please stay tuned for our official announcement.

This technical document is for reference purposes only and does not represent the final functionality of the product.
:::


# Current Wallet Runtime Environment Check

## Check if Bybit Wallet is installed and running properly

First, we need to check if Bybit Wallet is installed and running properly.
```js
if (typeof window.bybitWallet !== 'undefined') {
  console.log('bybitWallet is installed!');
}
```

## Check if the current version supports the Solana chain
```js
if (typeof window.bybitWallet.solana !== 'undefined') {
  console.log('Solana chain is supported!');
}
```

# Solana Overview

Solana is a high-performance blockchain platform that aims to provide fast, secure, and scalable solutions for decentralized applications and cryptocurrencies. The platform utilizes an innovative consensus algorithm called Proof of History (PoH), which can process tens of thousands of transactions per second (TPS) while maintaining decentralization and security. Overall, Solana's goal is to achieve widespread adoption of blockchain through its unique technological advantages, serving various complex decentralized applications and global financial systems.

# Provider API

## What is the Injected provider API?

The Injected provider API is a standard JavaScript API used to interact with Bybit Wallet. It allows DApps to interact with Bybit Wallet for operations such as authorization, signing, and sending transactions.

## Connect Account

The `window.bybitWallet.solana.connect()` method is used to connect to the account in the Bybit Wallet. This method returns a Promise object. When the user completes the authorization, the Promise object will return a PublicKey object, which contains the user's Solana address. When the user refuses authorization, the Promise object will return an error.

```js
window.bybitWallet.solana.connect().then((publicKey) => {
  console.log('Connected to Bybit Wallet!');
  console.log('Your Solana address is: ', publicKey.toBase58());
}).catch((err) => {
  console.log('Failed to connect to Bybit Wallet: ', err);
});
```
When the user successfully connects, the `connect` event is triggered. We can listen to this event to perform some operations, such as updating the page status.

```js
window.bybitWallet.solana.on('connect', () => {
  console.log('Connected to Bybit Wallet!');
});
```
Once the DApp is connected to Bybit Wallet, you can use `window.bybitWallet.solana.publicKey` to get the user's Solana address. You can also use `window.bybitWallet.solana.isConnected` to determine the current connection status of the DApp.

```js
console.log('Your Solana address is: ', window.bybitWallet.solana.publicKey.toBase58());
console.log('Is connected to Bybit Wallet: ', window.bybitWallet.solana.isConnected);
```

## Sign Transaction

### Sign and Send Transaction

The `window.bybitWallet.solana.signAndSendTransaction()` method is used to sign and send a transaction. It accepts a `Transaction` object as a parameter and returns a Promise object. When the user completes the signing process, the Promise object will return a `TransactionSignature` object, which contains the signature of the transaction. If the user declines to sign, the Promise object will return an error.

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

### Sign Transaction (Without Sending)

The `window.bybitWallet.solana.signTransaction()` method is used to sign a transaction without sending it. It accepts a `Transaction` object as a parameter and returns a Promise object. When the user completes the signing process, the Promise object will return a `Transaction` object that contains the transaction's signature. If the user declines to sign, the Promise object will return an error.

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

### Batch Sign Transactions

The `window.bybitWallet.solana.signAllTransactions()` method is used to batch sign transactions. It accepts a `Transaction[]` object as a parameter and returns a Promise object. When the user completes the signing process, the Promise object will return a `Transaction[]` object that contains the signatures of the transactions. If the user declines to sign, the Promise object will return an error.

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

## Sign Message

The `window.bybitWallet.solana.signMessage()` method is used to sign a message. It accepts a `Uint8Array` object as a parameter and returns a Promise object. When the user completes the signing process, the Promise object will return a `Uint8Array` object that contains the signature of the message. If the user declines to sign, the Promise object will return an error.

When a Dapp connects to Bybit Wallet, it can also request the user to sign an arbitrary message. The Dapp can freely set the information that needs to be signed, which will be displayed to the user in Bybit Wallet. The user can choose to sign or decline the signature. Message signing does not consume Gas Fee and is a convenient way for the Dapp to verify the user's identity or verify ownership of the user's wallet address.

It is important to note that the Dapp must provide a hexadecimal or UTF-8 encoded string as a Uint8Array. For example, if the Dapp wants to sign a string, it must first convert the string to a Uint8Array object and then pass it to Bybit Wallet.

```js
const message = new Uint8Array([1, 2, 3, 4, 5]);

window.bybitWallet.solana.signMessage(message).then((signature) => {
  console.log('Message signed: ', signature);
}).catch((err) => {
  console.log('Failed to sign message: ', err);
});
```

## Events

### Connect Event

When the user connects or disconnects from Bybit Wallet, the `connect` event is triggered. We can listen to this event to perform certain operations, such as updating the page status.

```js
window.bybitWallet.solana.on('connect', () => {
  console.log('Connected to Bybit Wallet!');
});
```

### Disconnect Event

When the user connects or disconnects from Bybit Wallet, the `disconnect` event is triggered. We can listen to this event to perform certain operations, such as updating the page status. It is important to note that the wallet may also initiate the disconnection, rather than the Dapp disconnecting itself.

```js
window.bybitWallet.solana.on('disconnect', () => {
  console.log('Disconnected from Bybit Wallet!');
});
```

### Account Change Event

When the user switches accounts in Bybit Wallet, the `accountChanged` event is triggered. We can listen to this event to perform certain operations, such as updating the page status.

```js
window.bybitWallet.solana.on('accountChanged', (publicKey) => {
  console.log('Your Solana address is: ', publicKey.toBase58());
});
```
