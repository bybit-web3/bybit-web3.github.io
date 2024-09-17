# Ton

## Special Instructions

Bybit Wallet's TON API fully complies with the specifications of the [Ton Connect Protocol](https://docs.ton.org/develop/dapps/ton-connect/protocol/).

We strongly recommend that Dapps use the [TON Connect SDK](https://docs.ton.org/develop/dapps/ton-connect/developers) for easier integration with Bybit Wallet.

# Get the Injected Object (JS Bridge)

Bybit Wallet injects the following properties into the Dapp according to the specifications of the TON Connect Protocol:

```javascript
window.bybitTonWallet.tonconnect
```

The data structure of the object it points to is as follows:

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

Used to obtain device information, the data structure is as follows:

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

- `platform`: Device platform
- `appName`: Wallet name
- `appVersion`: Wallet version
- `maxProtocolVersion`: Maximum supported protocol version, currently only supports 2
- `features`: Wallet features supported, currently only supports SendTransaction, where maxMessages is the maximum number of messages supported by this feature

## walletInfo

Used to obtain wallet information, the data structure is as follows:

```javascript
{
  name: 'BybitTonWallet',
  app_name: 'BybitTonWallet',
  image: 'https://static.bymj.io/bhop/image/Q3Kmzw7qczSZF5eqfo6pW8QuT1MDMmqC80lWxFBhiE0.png',
  about_url: 'https://www.bybit.com/web3/home',
  platforms: ['chrome', 'android', 'ios'],
}
```

- `name`: Wallet name
- `app_name`: Wallet application unique identifier
- `image`: Wallet icon
- `about_url`: Wallet introduction page
- `platforms`: Platforms supported by the wallet

## protocolVersion

Protocol version number, currently only supports 2

## connect

Method to connect to the wallet, connecting to the wallet can also perform signature verification.

```javascript
connect(protocolVersion: number, message: ConnectRequest): Promise<ConnectEvent>;
```

### Parameters

- `protocolVersion`: Protocol version number, currently only supports 2, passing an unsupported version number will result in connection failure
- `message`: Request information for connecting to the wallet
  
  - message parameters:
  
  ```javascript
  type ConnectRequest = {
    manifestUrl: string;
    items: ConnectItem[], // Data items shared with the application
  }

  type ConnectItem = TonAddressItem | TonProofItem

  type TonAddressItem = {
    name: "ton_addr";
  }

  type TonProofItem = {
    name: "ton_proof";
    payload: string; // Arbitrary payload, such as nonce + expiration timestamp.
  }
  ```
  - `manifestUrl`: URL of the Dapp's manifest.json file, which contains the metadata of the Dapp, the data structure is as follows: 
  - `items`: Data items shared with the application, currently only supports ton_addr and ton_proof:
  - `ton_addr` is used to obtain the user's TON address, public key, and other information, similar to `eth_requestAccounts` in Ethereum;
  - `ton_proof` is used to verify the user's signature, please refer to [TON Proof](https://docs.ton.org/develop/dapps/ton-connect/sign) for specific verification methods;

### Return Value

Returns a Promise object, where the result of the Promise object is ConnectEvent, the data structure is as follows: 
```javascript
type ConnectEvent = ConnectEventSuccess | ConnectEventError;

type ConnectEventSuccess = {
  event: "connect";
  id: number; // Incremental event counter
  payload: {
    items: ConnectItemReply[];
    device: DeviceInfo;
  }
}

type ConnectEventError = {
  event: "connect_error",
  id: number; // Incremental event counter
  payload: {
    code: number;
    message: string;
  }
}

// Same as deviceInfo on the window.bybitTonWallet.tonconnect object
type DeviceInfo = {
  platform: "iphone" | "ipad" | "android" | "windows" | "mac" | "linux";
  appName: string;
  appVersion: string;
  maxProtocolVersion: number;
  features: Feature[];
}

type Feature = { name: 'SendTransaction', maxMessages: number } // `maxMessages` is the maximum number of messages in a single `SendTransaction` supported by the wallet

type ConnectItemReply = TonAddressItemReply | TonProofItemReply;

// Untrusted data returned by the wallet.
// If you need to ensure that the user owns this address and public key, you need to request ton_proof additionally.
type TonAddressItemReply = {
  name: "ton_addr";
  address: string; // TON address in raw format (`0:<hex>`)
  network: NETWORK; // Network global_id
  publicKey: string; // HEX string without 0x
  walletStateInit: string; // Base64 (unsafe URL) encoded stateinit cell of the wallet contract
}

type TonProofItemReply = {
  name: "ton_proof";
  proof: {
  timestamp: string; // 64-bit unix epoch time (seconds) of the signing operation
  domain: {
    lengthBytes: number; // AppDomain length
    value: string;  // Application domain (as url part, unencoded)
  };
  signature: string; // base64 encoded signature
  payload: string; // payload in the request
  }
}

// Currently only supports mainnet -239
enum NETWORK {
  MAINNET = '-239',
  TESTNET = '-3'
}
```

### Examples

Only get the user's address, public key, and other information: 
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

Get the user's address, public key, and other information, and verify the user's signature: 
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

Method to restore the connection, similar to Ethereum's `eth_accounts` method, it will only return the result of the ton_addr instruction. If it is unable to connect to the wallet, an error will be returned.

```javascript
restoreConnection(): Promise<ConnectEvent>;
```

### Example

```javascript
const result = await window.bybitTonWallet.tonconnect.restoreConnection();

if (result.event === 'connect') {
  console.log(result.payload.items[0].address);
} else {
  console.log(result.payload.message);
}
```

## send

Method to send messages, used for sending transactions, calling contracts, and other operations: 

```javascript
send(message: AppRequest): Promise<WalletResponse>;
```

### Parameters

- `message`: The message to be sent, the data structure is as follows: 
  message parameters: 
  ```javascript
  interface AppRequest {
  method: string;
  params: string[];
  id: string;
  }
  ```
  - `method`: Method name, currently only supports `SendTransaction` and `disconnect`;
  - `id`: Unique identifier of the message, used to identify the uniqueness of the message;
  - `params`: Method parameters, currently only supports the params parameter of the SendTransaction method, disconnect does not have any parameters to pass, the data structure is as follows: 

## SendTransaction message

```javascript
interface SendTransactionRequest {
  method: 'sendTransaction';
  params: [<transaction-payload>];
  id: string;
}
```

Where `<transaction-payload>` is a JSON with the following properties: 
- `valid_until (integer, optional)`: Unix timestamp. The transaction will be invalid after this time. The set expiration time cannot exceed 5 minutes. If it is more than 5 minutes from now, it will be reset to the current time plus 5 minutes.
- `network (NETWORK, optional)`: Currently only supports the mainnet
- `from (string in wc:hex format, optional)`: The sender address from which the DApp intends to send the transaction.
- `messages (array of messages)`: 1-4 output messages from the wallet contract to other accounts. All messages are sent in order, but the wallet cannot guarantee that the messages will be delivered and executed in the same order. 
  - Structure of `message`: 
    - `address (string)`: Destination of the message
    - `amount (decimal string)`: The amount of nanocoins to be sent.
    - `payload (base64 encoded string, optional)`: The original cell BoC encoded in Base64.
    - `stateInit (base64 encoded string, optional)`: The original cell BoC of the wallet contract encoded in Base64.       

### Example: 

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

### Return Value: 

Returns a Promise object, where the result of the Promise object is WalletResponse, and the result is the signed signature string, the data structure is as follows: 
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

## disconnect message

Used to disconnect from the wallet.

### Parameters

```javascript
interface DisconnectRequest {
  method: 'disconnect';
  params: [];
  id: string;
}
```

### Return Value

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
}

## listen

Method to listen for wallet events, used to listen for wallet events such as connection, disconnection, etc.

```javascript
listen(callback: (event: WalletEvent) => void): () => void;
```

### Parameters

- `callback`: Callback function for event listening, when a wallet event occurs, the callback function will be called, and the parameter of the callback function is WalletEvent, the data structure is as follows: 

```javascript
interface WalletEvent {
  event: WalletEventName;
  id: number; // Incremental event counter
  payload: <event-payload>; // Payload specific to each event
}

type WalletEventName = 'connect' | 'connect_error' | 'disconnect';
```

### Return Value

Returns a function to cancel the listening.