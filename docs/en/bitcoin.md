# Current Wallet Runtime Environment Detection

## Check if Bybit Wallet is Installed and Running Properly

First, we need to check if Bybit Wallet is installed and running properly.
```js
if (typeof window.bybitWallet !== 'undefined') {
  console.log('bybitWallet is installed!');
}
```

## Check if the current version supports the Bitcoin chain
```js
if (typeof window.bybitWallet.bitcoin !== 'undefined') {
  console.log('Bitcoin chain is supported!');
}
```

---

# Provider API

## What is the Injected provider API?

The Injected provider API is a standard JavaScript API used to interact with Bybit Wallet. It allows DApps to interact with Bybit Wallet for operations such as authorization, signing, and sending transactions.

## Connect to an Account

`window.bybitWallet.solana.connect()`

### Function
Connects to the wallet.

### Parameters
None

### Return Value

```ts
Promise<{
    address: string,
    publicKey: string
}>
```
### Example
```ts
const result = await window.bybitWallet.bitcoin.connect()
// example
{
  address: 'bc1pwqye6x35g2n6xpwalywhpsvsu39k3l6086cvdgqazlw9mz2meansz9knaq',
  publicKey: '4a627f388196639041ce226c0229560127ef9a5a39d4885123cd82dc82d8b497'
 }
```

## Request Connection - requestAccounts
`window.bybitWallet.bitcoin.requestAccounts()`

### Description
Requests connection to the current account. If the user has not authorized it before, a connection popup will appear. After the user agrees, the account will be returned.

### Parameters
None

### Return Value

```ts
Promise<string[]>
```
### Example
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

## Get Accounts - getAccounts
`window.bybitWallet.bitcoin.getAccounts()`

### Description
Get the current account addresses. This method does not trigger a connection popup. If the DApp is not connected to the wallet, an empty array will be returned.

### Parameters
None

### Return Value

```ts
Promise<string[]>
```

### Example
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

## Get Network - getNetwork
`window.bybitWallet.bitcoin.getNetwork()`

### Description
Get the current network, returns a string, either "livenet" or "testnet". Currently, Bybit Wallet only supports "livenet", so it will always return "livenet".

### Parameters
None

### Return Value

```ts
Promise<string> // network
```

### Example
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

## Get Public Key - getPublicKey
`window.bybitWallet.bitcoin.getPublicKey()`

### Description
Get the public key of the current account

### Parameters
None

### Return Value

```ts
Promise<string> // public key
```

### Example
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

## Get Balance - getBalance
`window.bybitWallet.bitcoin.getBalance()`

### Description
Get the balance of the current account

### Parameters
None

### Return Value

```ts
}>
```

### Example
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

## Get Inscriptions of Account - getInscriptions
`window.bybitWallet.bitcoin.getInscriptions([cursor, size])`

### Description
Get the list of inscriptions for the current account

### Parameters
```ts
cursor?: number; // Offset, start from 0, default 0
size?: number; // Number of items per page, default 20
```

### Return Value

```ts
Promise<{
    total: number; // Total count
    list: Array<{
      inscriptionId: string; // Inscription ID
      inscriptionNumber: string; // Inscription number
      address: string; // Inscription address
      outputValue: string; // Inscription output value
      contentLength: string; // Inscription content length
      contentType: string; // Inscription content type
      timestamp: string; // Inscription block timestamp
      offset: number; // Inscription offset
      output: string; // Identifier of the UTXO where the current inscription is located
      genesisTransaction: string; // Transaction ID of the genesis transaction
      location: string; // txid and vout of the current location
    }>
}>
```

### Example
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

## Send Bitcoin - sendBitcoin
`window.bybitWallet.bitcoin.sendBitcoin(toAddress, satoshis, options)`

### Description
Send Bitcoin. This method will display a send dialog, and once the user confirms, the transaction will be sent.

### Parameters
```ts
toAddress: string; // Address to send to
satoshis: number; // Amount of satoshis to send
options?: {
  feeRate: number; // Network fee rate
} 
```

### Return Value

```ts
Promise<string> // Transaction hash
```

### Example
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

## Send Inscription - sendInscription
`window.bybitWallet.bitcoin.sendInscription(address, inscriptionId, option)`

### Description
Send an inscription. This method will display a send dialog, and once the user confirms, the transaction will be sent.

### Parameters
```ts
address: string; // Recipient address
inscriptionId: string; // Inscription ID
option?: {
  feeRate: number; // Custom fee rate
}
```

### Return Value

```ts
Promise<string> // Transaction hash
```

### Example
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

## Inscribe Transfer - inscribeTransfer
`window.bybitWallet.bitcoin.inscribeTransfer(ticker, amount)`

### Description
Inscribe transferable BRC-20 tokens. This method will display a send dialog, and once the user confirms, the transaction will be sent.

### Parameters
```ts
ticker: string; // Identifier of the BRC-20 token
amount: number; // Amount to be inscribed
```

### Return Value

```ts
Promise<string> // Transaction hash
```

## Sign Message - signMessage
`window.bybitWallet.bitcoin.signMessage(msg[, type])`

### Description
Signs a message

### Parameters
```ts
msg: string; // message to sign
type?: 'hex' | 'utf8'; // "ecdsa" | "bip322-simple". default is "ecdsa"
```

### Return Value

```ts
Promise<string> // signature
```

### Example
```ts
const msg = 'need sign string';
const result = await window.bybitWallet.bitcoin.signMessage(msg, 'ecdsa')
// example
INg2ZeG8b6GsiYLiWeQQpvmfFHqCt3zC6ocdlN9ZRQLhSFZdGhgYWF8ipar1wqJtYufxzSYiZm5kdlAcnxgZWQU=
```

## Broadcast Transaction - pushTx
`window.bybitWallet.bitcoin.pushTx(rawTx)`

### Description
Broadcasts a transaction

### Parameters
```ts
rawTx: string; // Raw data of the transaction
```

### Return Value

```ts
Promise<string> // Transaction hash
```

### Example
```ts
try {
  let txid = await window.bybitWallet.bitcoin.pushTx('0200000000010135bd7d...');
  console.log(txid);
} catch (e) {
  console.log(e);
}
```

## Sign Psbt - signPsbt
`window.bybitWallet.bitcoin.signPsbt(psbtHex[, options])`

### Description
Signs a Psbt. This method will display a signature dialog, and once the user confirms, the transaction will be signed.

### Parameters
```ts
psbtHex: string; // Hexadecimal string of the PSBT to be signed
options?: {
  autoFinalized: boolean; // Whether to automatically finalize the PSBT after signing
  toSignInputs: Array<{
    index: number; // Index of the input to be signed
    address: string; // (Specify address or publicKey) Corresponding private key used for signing
    publicKey: string; // (Specify address or publicKey) Corresponding private key used for signing
    sighashTypes: number[]; // sighashTypes
    disableTweakSigner: boolean; // (Optional) When signing and unlocking Taproot addresses, the tweakSigner is used by default to generate signatures. Enabling this option allows signing with the original private key.
  }>
}
```

### Return Value

```ts
Promise<string> // Signature
```

### Example
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

## Broadcast PSBT Transaction - pushPsbt
`window.bybitWallet.bitcoin.pushPsbt(psbtHex)`

### Description
Broadcasts a PSBT transaction.

### Parameters
```ts
psbtHex: string; // Hexadecimal string of the PSBT to be pushed
```

### Return Value

```ts
Promise<string> // Transaction hash
```

### Example
```ts
try {
  let res = await window.bybitWallet.bitcoin.pushPsbt('70736274ff01007d....');
  console.log(res);
} catch (e) {
  console.log(e);
}
```


# Events

## accountsChanged

### Description
This message is emitted whenever there is a change in the exposed account addresses of the user.

### Example
```ts
window.bybitWallet.bitcoin.on('accountsChanged', (accounts) => {
  console.log(accounts)[
    // example
    'tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz'
  ];
});
```
