# Release Notes

## 3.12.0 (2024-08-23)

### Features
 - Added support for TON chain
 - Gas Station now supports Solana

## 3.10.0 (2024-08-16)

### Features

 - Added transaction entry on currency details page

### Bug Fixes
 - Occasional black screen issue

## 3.9.0 (2024-08-02)

### Features

 - Optimized asset management search
 - Added support for security components
 - Pre-execution (Phase One)
 - Added support for Aptos chain
 - Plugin now supports referralCode
 - Optimized risk control web3 interface call
 - Plugin now integrates Bybit unified full point

## 3.8.2 (2024-07-20)

### Bug Fixes

 - Blinks style injection affecting web issues
 - Cloud wallet security component auto refresh issue

## 3.8.1 (2024-07-19)

### Bug Fixes

 - Issue with total assets and web3Uid assets showing as NaN in wallet list with multiple wallets

## 3.8.0 (2024-07-18)

### Features

 - Blinks
 - Log function
 - Cloud wallet initialization with bound web3Uid reduces one walletList request, improving UI response speed
 - Switching web3Uid no longer defaults to selecting a wallet (affects dapp connection prompt)
 - Copy and risk reminder popup on mnemonic phrase/private key page now has a maximum height of 560px, with content area scrolling when exceeded

### Bug Fixes

 - Issue with homepage flashing after unlocking
 - Wallet information error when dapp authorizes a wallet that is not the currently selected wallet
 - Web3Uid not displaying assets during first import
 - No EVM chain icon when importing a new wallet with a private key
 - Issue with being unable to set a default address for BTC

## 3.7.0 (2024-07-09)

### Features

- web3 UID;
- Gas station;
- Historical order redesign;
- Asset refresh;
- Homepage top UI adjustment;

### Bug Fixes

- Wallet and Bybit site interaction issues;
- Authorization page current wallet UI abnormality;
- Compatibility with STX staking, support for Dapp to pass tx hex data for signing and on-chain submission;

## 3.6.0 (2024-06-28)

### Features
- Support for SUI chain
- Adjustable icon size in settings page (Feedback UX)
- Close popup by clicking on blank area in the homepage for more tools
- Real-time validation for importing mnemonic phrases/private keys

### Bug Fixes
- Issue with Bybit fetching authorized account information returning the current account
- Inconsistency between total assets and currency assets for mnemonic phrase wallets on the BTC chain

## 3.5.1 (2024-06-22)

### Bug Fixes
- Issue with not updating wallet cache data after deletion;
- Dirty data causing abnormal wallet connection;
- Switching mnemonic phrase multiple accounts DAPP address not synchronized;
- Possible abnormality in getting address for dapp confirmation transactions;

## 3.5.0 (2024-06-20)

### Features
- Enhanced interaction for managing currencies;
- Adjusted setCurrentWallet logic to reduce wallet switching time and occasional failures;
- Reduced unnecessary setCurrentChain calls to optimize chain switching time;
- Added loading when importing cloud wallets in the wallet list page;

### Bug Fixes
- Issue with connecting to oooo.money;
- Cloud wallets blocking SUI chain assets;
- Image not updating when switching wallets;
- Sending tokens without filtering unbacked wallets;
- Assets not updating when switching wallets;
- After selecting a chain, the display of sending token conversion to USD shows as 0;
- BTC authorization page exceeding and unable to scroll issue;

## 3.4.0 (2024-06-13)

### Features
- Satisfaction NPS survey launched;

## 3.3.1 (2024-06-12)

### Bug Fixes
- Emergency fix: When switching to a heterogeneous chain, selecting an EVM chain's receiving address changes to a heterogeneous chain address;

## 3.3.0 (2024-06-12)

### Features
- Asset inclusion;
- Chain switching optimization;
- Bug Fixes
- Display issue when connecting a private key wallet;
- Wallet list page showing NaN for assets;

## 3.2.1 (2024-06-10)

### Bug Fixes
- Emergency fix for precision issue when staking more than 1000 units of native currency in mnemonic phrase wallets;

## 3.2.0 (2024-06-04)

### Features
- Support for Solana chain in mnemonic phrase wallets;
- Support for connecting specified type wallets;
- Mandatory strong backup before interacting with mnemonic wallets;
- Added 6 new EVM public chains, optimized interactions;
- For EVM chain transactions, return txHash directly to Dapp without waiting for the transaction to be confirmed on-chain;

### Bug Fixes
- Optimized the calculation method for UTXO on the BTC chain;

## 3.1.1 (2024-05-29)

### Features
- Added support for Stacks chain;
- Bug Fixes
- Temporarily took down the risky Dapp identification feature;

## 3.1.0 (2024-05-21)

### Features
- Redesigned UI for transfers and receipts;
- Support for quick wallet addresses and adding new contact wallet addresses;
- Added the ability to view wallet authorization status and revoke authorizations;
- Wallet plugin access to risk control security, added the ability to identify risky wallet addresses and risky Dapps;

### Bug Fixes
- Fixed the issue with online multilingual support: Unsupported language regions default to English;