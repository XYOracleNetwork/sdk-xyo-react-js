import * as tokenImages from './img'

export interface TokenData {
  uniqueTokenId: string
  tokenSymbol: string
  icon: string
  etherscanLink: string
  coinmarketcapLink: string
  readableName: string
}

export const TokenData: TokenData[] = [
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/multi-collateral-dai/',
    etherscanLink: 'https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f',
    icon: tokenImages.dai,
    readableName: 'Dai',
    tokenSymbol: 'dai',
    uniqueTokenId: 'dai',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/weth/',
    etherscanLink: 'https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    icon: tokenImages.weth,
    readableName: 'Weth',
    tokenSymbol: 'weth',
    uniqueTokenId: 'weth',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/ethereum/',
    etherscanLink: 'n/a',
    icon: tokenImages.ethereum,
    readableName: 'Ethereum',
    tokenSymbol: 'Eth',
    uniqueTokenId: 'ethereum',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/bitcoin/',
    etherscanLink: 'n/a',
    icon: tokenImages.bitcoin,
    readableName: 'Bitcoin',
    tokenSymbol: 'BTC',
    uniqueTokenId: 'bitcoin',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/xyo/',
    etherscanLink: 'https://etherscan.io/token/0x55296f69f40ea6d20e478533c15a6b08b654e758',
    icon: tokenImages.xyo,
    readableName: 'XYO',
    tokenSymbol: 'xyo',
    uniqueTokenId: 'xyo',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/frax/',
    etherscanLink: 'https://etherscan.io/token/0x853d955acef822db058eb8505911ed77f175b99e',
    icon: tokenImages.frax,
    readableName: 'Frax',
    tokenSymbol: 'frax',
    uniqueTokenId: 'frax',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/wrapped-bitcoin/',
    etherscanLink: 'https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    icon: tokenImages.wrappedBtc,
    readableName: 'Wrapped BTC',
    tokenSymbol: 'wbtc',
    uniqueTokenId: 'wbtc',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/usd-coin/',
    etherscanLink: 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    icon: tokenImages.usdCoin,
    readableName: 'USDC',
    tokenSymbol: 'usdc',
    uniqueTokenId: 'usdc',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/tether/',
    etherscanLink: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
    icon: tokenImages.tether,
    readableName: 'Tether',
    tokenSymbol: 'usdt',
    uniqueTokenId: 'usdt',
  },
]
