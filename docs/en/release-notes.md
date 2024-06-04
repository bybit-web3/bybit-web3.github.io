# Release Notes

## 3.2.0 (2024-06-04)

### Features
- Added support for Solana chain in mnemonic wallets;
- Added support for specifying wallet types in wallet connections;
- Interaction with mnemonic wallets requires strong backup before proceeding;
- Added 6 new EVM public chains and optimized related interactions;
- After transactions on EVM chains, the txHash is returned directly to the Dapp instead of waiting for the transaction to be confirmed on-chain.

### Bug Fixes

- Optimized UTXO calculation method for the BTC chain;

## 3.1.1 (2024-05-29)

### Features

- Added support for Stacks chain;

### Bug Fixes

- Temporarily disabled risky Dapp identification feature;

## 3.1.0 (2024-05-28)

### Features

- Added support for Stacks chain;
- Redesigned UI for transfers and receipts;
- Added support for quick wallet addresses and adding new contact wallet addresses;
- Added functionality to view wallet authorization status and revoke authorization;
- Enhanced security for plugin wallet integration, with the ability to identify risky wallet addresses and risky Dapps.

### Bug Fixes
- Fixed the issue with multilingual support in production: unsupported language regions now default to English;


