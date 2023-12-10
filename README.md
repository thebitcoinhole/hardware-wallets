# The Bitcoin Hole - Hardware Wallets

## Introduction

Hardware wallets are an essential tool for those who want to keep their bitcoin secure. These devices allow you to store your private keys offline, so they can’t be accessed by hackers or other online threats. But with so many hardware wallets on the market, it can be challenging to choose the right one for your needs.

This project goal is to have the more complete database of Hardware Wallets features, so they can be compared, helping users to choose wisely. The database is open-source, meaning anyone can collaborate to improve and correct any wrong data or add new wallets.

## Collaboration

Inside the `items` directory, there is a JSON file for each wallet, with all the data about it. To collaborate (adding missing data, fixing wrong data or adding a new wallet), just fork the repository and send a pull request with the changes.

## JSON format

The following is a sample of the JSON format:

```json
{
    "id": "wallet-id",
    "name": "Wallet Name",
    "purchasable": true,
    "pre-order": false,
    "category-name": {
      "feature-name-1": {
        "value": "YES", 
        "flag": "positive",
        "supported": true,
        "texts": [
          "Optional contextual text describing the feature"
        ],
        "links": [
          {
            "title": "Optional contextual link referencing official documentation",
            "url": "url"
          }
        ]
      },
      "feature-name-2": {
        "value": "Experimental",
        "flag": "neutral",
        "supported": true
      },
      "feature-name-3": {
        "value": "NO",
        "flag": "negative",
        "supported": false
      }
    }
}
```

JSON fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | true | The wallet id. It matches with the JSON file name. |
| name | string | true | The wallet name. |
| purchasable | boolean | true | If the wallet can be purchased in the official website |
| pre-order | boolean | false | If the wallet is not released yet and can be reserved/pre-ordered |
| category-name.feature-name-1.value | string | yes | The visible feature value. For example: `"YES"`, `"NO"`, `"Experimental"`, etc |
| category-name.feature-name-1.flag | string | no | The flag of the wallet feature. Possible values: `"positive"`, `"neutral"` or `"negative"` |
| category-name.feature-name-1.supported | boolean | no | If the feature is supported by the wallet. This is used to filter by this feature |
| category-name.feature-name-1.texts | array of strings | no | Official Texts with info about the feature |
| category-name.feature-name-1.links | array of objects | no | Official links with info about the feature |
| category-name.feature-name-1.links.title | string | yes | The title of the link |
| category-name.feature-name-1.links.url | string | yes | The url of the link |

On each pull request, the JSON files are verified to be sure they are valid and well-formatted. You can run the following command inside the `scripts` directory to format the JSON before sending a pull request:

```
node json-format.js
```

All the features supported:

| Category | Category Id | Feature | Feature Id |
| --- | --- | --- | --- |
| Basic Information | basic-information | Price | price |
| Basic Information | basic-information | Discounts | discounts |
| Basic Information | basic-information | Amazon Official Store | amazon |
| Basic Information | basic-information | Launch Year | year |
| Company | company | Brand | brand |
| Company | company | Headquarters | headquarters |
| Company | company | Website | website |
| Company | company | Blog | blog |
| Company | company | X (Twitter) | twitter |
| Company | company | Nostr | nostr |
| Company | company | YouTube | youtube |
| Company | company | GitHub | github |
| Communities | communities | Telegram | telegram |
| Communities | communities | Reddit | reddit |
| Payment Methods to buy the device | payment-methods | BTC On Chain | btc-on-chain |
| Payment Methods to buy the device | payment-methods | BTC Lightning | btc-lightning |
| Payment Methods to buy the device | payment-methods | Alt Coins | alt-coins |
| Payment Methods to buy the device | payment-methods | Credit/Debit Card | credit-debit-card |
| Size & Materials | size-materials | DIY | diy |
| Size & Materials | size-materials | Warranty | warranty |
| Size & Materials | size-materials | Weight | weight |
| Size & Materials | size-materials | Dimensions | dimensions |
| Size & Materials | size-materials | Materials | materials |
| Size & Materials | size-materials | Available in colors | available-in-colors |
| Size & Materials | size-materials | Waterproof | waterproof |
| Display | display | Screen | screen |
| Display | display | Screen Type | screen-type |
| Display | display | Color Screen | color-screen |
| Display | display | Touch Screen | touch-screen |
| Display | display | Screen Size | screen-size |
| Display | display | Screen Resolution | screen-resolution |
| Power | power | Battery | battery |
| Power | power | Removable Battery | removable-battery |
| Power | power | Battery Size | battery-size |
| Power | power | USB charging | usb-charging |
| Power | power | Wireless charging | wireless-charging |
| Connectivity | connectivity | USB Data | usb-data |
| Connectivity | connectivity | Bluetooth | bluetooth |
| Connectivity | connectivity | NFC | nfc |
| Connectivity | connectivity | microSD card | microsd-card |
| Connectivity | connectivity | QR scanner | qr-scanner |
| Connectivity | connectivity | 100% Air-gapped | air-gapped |
| Security | security | Secure Element | secure-element |
| Security | security | Supply Chain & Physical Attacks Protection | supply-chain-physical-attacks |
| Security | security | Anti-Klepto / Anti-Exfil protocol | anti-klepto |
| Networks | networks | Bitcoin Mainnet | btc-mainnet |
| Networks | networks | Bitcoin Testnet | btc-testnet |
| Networks | networks | Liquid | liquid |
| Networks | networks | Alt Coins | alt-coins |
| Firmware | firmware | Bitcoin-only firmware | bitcoin-only-firmware |
| Firmware | firmware | Upgrade | upgrade |
| Firmware | firmware | Latest Version | latest-version |
| Firmware | firmware | Lastes Release Date | latest-release-date |
| Firmware | firmware | Release Notes | release-notes |
| Firmware | firmware | Source-available | source-available |
| Firmware | firmware | Open Source | open-source |
| Firmware | firmware | License | license |
| Firmware | firmware | Reproducible Builds | reproducible-builds |
| Device Lock | device-lock | PIN entry | pin-entry |
| Device Lock | device-lock | Dummy Wallet PIN | dummy-wallet-pin |
| Device Lock | device-lock | Dynamic Keypad | dynamic-keypad |
| Device Lock | device-lock | Countdown to Brick/Reset PIN | countdown-brick-reset-pin |
| Device Lock | device-lock | Brick/Reset me PIN | brick-reset-pin |
| Device Lock | device-lock | Login Countdown | login-countdown |
| Device Lock | device-lock | Anti-phishing words | anti-phishing-words |
| Device Lock | device-lock | Alphanumeric PIN | alphanumeric-pin |
| Device Lock | device-lock | Pattern Lock | pattern-lock |
| Device Lock | device-lock | Fingerprint Lock | fingerprint-lock |
| Private Keys | private-keys | Stateless | stateless |
| Private Keys | private-keys | User Added Entropy | user-added-entropy |
| Private Keys | private-keys | Multiple Seed Phrases | multiple-seed-phrases |
| Private Keys | private-keys | Passphrases support | passphrase-support |
| Private Keys | private-keys | Passphrase entry | passphrase-entry |
| Private Keys | private-keys | Master Key Fingerprint | master-key-fingerprint |
| Private Keys | private-keys | Deterministic Entropy (BIP-85) | bip85 |
| Private Keys | private-keys | Shamir Backup (SLIP39) | shamir-backup |
| Private Keys | private-keys | Seed XOR | seed-xor |
| Private Keys | private-keys | Backup / recovery on microSD card | backup-recovery-microsd |
| Private Keys | private-keys | Backup / recovery with seed phrase | backup-recovery-seedphrase |
| Private Keys | private-keys | 12 Words BIP39 Seed Creation | create-12-words |
| Private Keys | private-keys | 24 Words BIP39 Seed Creation | create-24-words |
| Private Keys | private-keys | 12 Words BIP39 Seed Import | import-12-words |
| Private Keys | private-keys | 24 Words BIP39 Seed Import | import-24-words |
| Private Keys | private-keys | SeedQR | seed-qr |
| Fees | fees | Fee Control | fee-control |
| Fees | fees | Replace-by-fee (RBF) | replace-by-fee |
| Fees | fees | Child-pays-for-parent (CPFP) | child-pays-for-parent |
| Privacy | privacy | Coin Control | coin-control |
| Privacy | privacy | Custom Node | custom-node |
| Privacy | privacy | Tor | tor |
| Other Features | other-features | Multi-sig (PSBTs) | multi-sig |
| Other Features | other-features | Miniscript | miniscript |
| Other Features | other-features | Virtual Disk Mode | virtual-disk-mode |
| Other Features | other-features | Password Manager | password-manager |
| Other Features | other-features | U2F authentication | u2f-authentication |
| Other Features | other-features | FIDO authentication | fido-authentication |
| Other Features | other-features | Hardware-based SSH/GPG | hardware-based-ssh-gpg |
| Official Apps | official-apps | Windows App | windows-app |
| Official Apps | official-apps | MacOS App | macos-app |
| Official Apps | official-apps | Linux App | linux-app |
| Official Apps | official-apps | Chrome Extension | chrome-extension |
| Official Apps | official-apps | Firefox Extension | firefox-extension |
| Official Apps | official-apps | Edge Extension | edge-extension |
| Official Apps | official-apps | Android App | android-app |
| Official Apps | official-apps | iOS App | ios-app |
| Third-Party Apps | third-party-apps | Nunchuk | nunchuk |
| Third-Party Apps | third-party-apps | Electrum | electrum |
| Third-Party Apps | third-party-apps | Sparrow | sparrow |
| Third-Party Apps | third-party-apps | Specter Desktop | specter-desktop |
| Third-Party Apps | third-party-apps | Blockstream Green | blockstream-green |
| Third-Party Apps | third-party-apps | BlueWallet | bluewallet |
| Third-Party Apps | third-party-apps | Bitcoin Keeper | bitcoin-keeper |
| Third-Party Apps | third-party-apps | Casa | casa |
| Third-Party Apps | third-party-apps | Unchained | unchained |

## Website

The [thebitcoinhole.com](https://thebitcoinhole.com/) website offers a Hardware Wallet Comparison using this database. This website is the most comprehensive resource for comparing the features of top hardware wallets. It provides an in-depth analysis of each wallet’s security features, privacy, usability, compatibility, and more.

## Sponsor this project
Sponsor this project to help us get the funding we need to continue working on it.

* [Donate with Bitcoin Lightning](https://getalby.com/p/thebitcoinhole) ⚡️ [thebitcoinhole@getalby.com](https://getalby.com/p/thebitcoinhole)
* [Donate with PayPal or a credit card using Ko-fi](https://ko-fi.com/thebitcoinhole)
* [Donate on Patreon](https://www.patreon.com/TheBitcoinHole)

## Follow us
* [Twitter](http://twitter.com/thebitcoinhole)
* [Nostr](https://snort.social/p/npub1mtd7s63xd85ykv09p7y8wvg754jpsfpplxknh5xr0pu938zf86fqygqxas)
* [Medium](https://blog.thebitcoinhole.com/)
* [GitHub](https://github.com/thebitcoinhole)
