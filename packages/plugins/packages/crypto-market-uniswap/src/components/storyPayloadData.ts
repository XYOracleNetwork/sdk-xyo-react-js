import { asSchema } from '@xyo-network/payload-model'

export const payloadData = {
  pairs: [
    {
      tokens: [
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 0.000_006_889_28,
        },
        {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'weth',
          value: 145_153,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 0.011_976_6,
        },
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          symbol: 'usdt',
          value: 83.496,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 0.011_981_5,
        },
        {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'dai',
          value: 83.4619,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          symbol: 'wbtc',
          value: 1_985_210,
        },
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 5.037_25e-7,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
          symbol: 'link',
          value: 632.648,
        },
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'xyo',
          value: 0.001_580_66,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          symbol: 'wbtc',
          value: 13.8399,
        },
        {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'weth',
          value: 0.072_255,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'dai',
          value: 1.000_04,
        },
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.999_964,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.000_575_766,
        },
        {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'weth',
          value: 1736.82,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.000_577_657,
        },
        {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'weth',
          value: 1731.13,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'dai',
          value: 1.000_02,
        },
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.999_983,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
          symbol: 'frax',
          value: 0.999_829,
        },
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 1.000_17,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          symbol: 'wbtc',
          value: 23_967.5,
        },
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.000_041_723_2,
        },
      ],
    },
    {
      tokens: [
        {
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'usdc',
          value: 0.999_756,
        },
        {
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          symbol: 'usdt',
          value: 1.000_24,
        },
      ],
    },
  ],
  schema: asSchema('network.xyo.crypto.market.uniswap', true),
  timestamp: 1_659_071_465_718,
}

export const payloadDataMissingSymbol = {
  pairs: [
    {
      tokens: [
        {
          address: '0x55296f69f40Ea6d20E478533C15A6B08B654E758',
          symbol: 'FOO',
          value: 0.000_006_889_28,
        },
        {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'BAR',
          value: 145_153,
        },
      ],
    },
  ],
  schema: asSchema('network.xyo.crypto.market.uniswap', true),
  timestamp: 1_659_071_465_718,
}

export const payloadDataMissingPairs = {
  pairs: [],
  schema: asSchema('network.xyo.crypto.market.uniswap', true),
  timestamp: 1_659_071_465_718,
}
