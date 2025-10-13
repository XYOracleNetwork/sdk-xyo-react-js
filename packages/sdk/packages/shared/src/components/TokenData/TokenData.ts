import * as tokenImages from './img/index.ts'

export interface TokenData {
  coinmarketcapLink: string
  etherscanLink: string
  icon: string
  readableName: string
  tokenSymbol: string
  uniqueTokenId: string
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
    tokenSymbol: 'eth',
    uniqueTokenId: 'ethereum',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/bitcoin/',
    etherscanLink: 'n/a',
    icon: tokenImages.btc,
    readableName: 'Bitcoin',
    tokenSymbol: 'btc',
    uniqueTokenId: 'btc',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/xl1/',
    etherscanLink: 'https://etherscan.io/token/0xf72ae3e0da743033abd7a407557d684c1ae66aed',
    icon: tokenImages.xl1,
    readableName: 'XL1',
    tokenSymbol: 'xl1',
    uniqueTokenId: 'xl1',
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
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/cardano/',
    etherscanLink: 'https://etherscan.io/token/0xc14777c94229582e5758c5a79b83dde876b9be98',
    icon: tokenImages.ada,
    readableName: 'Cardano',
    tokenSymbol: 'ada',
    uniqueTokenId: 'ada',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/binance-usd/',
    etherscanLink: 'https://etherscan.io/token/0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    icon: tokenImages.busd,
    readableName: 'Binance USD',
    tokenSymbol: 'busd',
    uniqueTokenId: 'busd',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/dogecoin/',
    etherscanLink: 'https://etherscan.io/token/0x7618b5024a6349f9aef10ddfd33e3428c734551e',
    icon: tokenImages.dogecoin,
    readableName: 'Dogecoin',
    tokenSymbol: 'doge',
    uniqueTokenId: 'doge',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/polkadot-new/',
    etherscanLink: 'https://etherscan.io/token/0x2d4fb6dd969992c881d8e534c747cc925d5ba221',
    icon: tokenImages.dot,
    readableName: 'Polkadot',
    tokenSymbol: 'dot',
    uniqueTokenId: 'dot',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/chainlink/',
    etherscanLink: 'https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca',
    icon: tokenImages.link,
    readableName: 'ChainLink',
    tokenSymbol: 'link',
    uniqueTokenId: 'link',
  },
  {
    coinmarketcapLink: 'https://coinmarketcap.com/currencies/solana/',
    etherscanLink: 'https://etherscan.io/token/0x1f54638b7737193ffd86c19ec51907a7c41755d8',
    icon: tokenImages.sol,
    readableName: 'Solana',
    tokenSymbol: 'sol',
    uniqueTokenId: 'sol',
  },
]
