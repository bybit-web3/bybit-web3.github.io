# Tron

## What is Tron

Tron was initially created as a token based on Ethereum and eventually migrated to its own network in 2018. According to the design of this process, investors exchanged Ethereum tokens for Tron's TRX cryptocurrency. (The Ethereum tokens were subsequently destroyed.)

## Get Wallet Address

Wallet account addresses are used in various scenarios, including as identifiers and for signing transactions. The interaction between Dapp and Bybit Wallet is achieved through the `window.bybitWallet.tronLink` object. In the `window.bybitWallet.tronLink` object, a tronweb object is exposed, and developers can call Tron's API through the tronweb object.

### Connect Wallet

First, we strongly recommend developers to connect the wallet through Tron's official SDK to ensure the security of the connection. Please refer to [tronwallet-adapters](https://www.npmjs.com/package/@tronweb3/tronwallet-adapters).

Additionally, developers can connect the wallet using the following code:

```javascript
const address = await window.bybitWallet.tronLink.request({ method: 'tron_requestAccounts'});
console.log('address:', address);
```
Or connect the wallet using the following code:

```javascript
const address = await window.bybitWallet.tronLink.connect();
console.log('address:', address);
```

## Sign Transactions

Initiating a transfer on the TRON network requires 3 steps:

1. Create a transfer transaction
2. Sign the transaction
3. Broadcast the signed transaction

In this process, step 2 requires TronLink, while steps 1 and 3 occur on tronWeb.

### Step 1: Create Transfer Transaction

#### sendTRX

Create an unsigned TRX transfer transaction

```Typescript
window.bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx(to, amount, from, options);
```

##### Parameters
- to: string - Recipient address
- amount: number - Transfer amount, unit is SUN
- from: string - Sender address
- options: number - Optional, additional parameters for the transaction, such as permission Id

##### Example

```Typescript
window.bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx("TVDGpn4hCSzJ5nkHPLetk8KQBtwaTppnkr", 100, "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
```

### Step 2: Sign Transaction

`sign` signs the transaction

```Typescript
// sign a transaction
const res = await window.bybitWallet.tronLink.sign(transaction);
console.log('sign result:', res);
```

##### Parameters
- transaction: JSON - Transaction object

##### Example

```Typescript
const tradeobj = await bybitWallet.tronLink.tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100, "TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR", 1);
const signedtxn = await bybitWallet.tronLink.sign(tradeobj);
console.log(signedtxn);
```

### Step 3: Broadcast Signed Transaction

`sendRawTransaction` broadcasts the signed transaction to the network.

```Typescript
// sign a transaction
window.bybitWallet.tronLink.tronWeb.trx.sendRawTransaction(signedTransaction);
```

##### Parameters
- signedTransaction: JSON - Signed transaction object

##### Example

```Typescript
const tronWeb = window.bybitWallet.tronLink.tronWeb;
const tradeobj = await tronWeb.transactionBuilder.sendTrx("TNo9e8MWQpGVqdyySxLSTw3gjgFQWE3vfg", 100, "TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR", 1);
const signedtxn = await window.bybitWallet.tronLink.sign(tradeobj);
const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
console.log(receipt);
```

## Sign Message

```Typescript
window.bybitWallet.tronLink.signMessage(message);
```

DApp requests the user to sign a message to verify the user's identity.

##### Parameters
- message: string - The message to be signed, which is just a regular string

##### Example

```Typescript
const message = "hello world";
const signature = await window.bybitWallet.tronLink.signMessage(message);
console.log('signature:', signature);
```

## Verify Signed Message

```Typescript
window.bybitWallet.tronLink.verifyMessage(message, signature, address);
```

DApp verifies the user's signed message.

##### Parameters
- message: string - The message to be verified
- signature: string - The signature
- address: string - The address that signed the message

##### Example

```Typescript
const message = "hello world";
const signature = "0x7f..."; // signature from signMessage
const address = "TNo9e8MW..."; // address from signMessage
const isValid = await window.bybitWallet.tronLink.verifyMessage(message, signature, address);
console.log('isValid:', isValid);
```

## Events

### Successful Connection

#### Trigger Scenario
DApp requests connection, and the user confirms the connection in the popup.

```typescript
window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action == "connect") {
        // handler logic
        console.log('got connect event', e.data);
    }
});
```

### Disconnect

#### Trigger Scenario
The user actively disconnects.

```typescript
window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action == "disconnect") {
        // handler logic
        console.log('got disconnect event', e.data);
    }
});
```

### Account Address Change

#### Trigger Scenario
- User connects wallet
- User switches account
- User locks account
- Wallet automatically locks after timeout

```typescript
window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action === "accountsChanged") {
        // handler logic
        console.log('got accountsChanged event', e.data);
    }
});
```
