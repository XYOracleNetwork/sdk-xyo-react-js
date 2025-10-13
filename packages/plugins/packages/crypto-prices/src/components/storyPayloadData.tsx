import type { CoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { CoingeckoCryptoMarketSchema } from '@xyo-network/coingecko-crypto-market-payload-plugin'

export const payloadData: CoingeckoCryptoMarketPayload = {
  assets: {
    ada: {
      btc: 0.000_021_92, eth: 0.000_311_41, eur: 0.491_867, usd: 0.502_045,
    },
    btc: {
      btc: 1, eth: 14.213_346, eur: 22_450, usd: 22_914,
    },
    busd: {
      btc: 0.000_043_69, eth: 0.000_620_74, eur: 0.980_451, usd: 1.001,
    },
    dai: { usdc: 1.000_04, xyo: 114.394 },
    doge: {
      btc: 0.000_002_93, eth: 0.000_041_57, eur: 0.065_655, usd: 0.067_013,
    },
    dot: {
      btc: 0.000_355_08, eth: 0.005_044_54, eur: 7.97, usd: 8.13,
    },
    eth: {
      btc: 0.070_387_8, eth: 1, eur: 1579.47, usd: 1612.16,
    },
    frax: { usdc: 0.999_738 },
    link: { xyo: 837.731 },
    sol: {
      btc: 0.001_693_69, eth: 0.024_062_15, eur: 38.01, usd: 38.79,
    },
    usdc: {
      btc: 0.000_043_696_5, dai: 0.999_963, eth: 0.000_620_446_499_999_999_9, eur: 0.979_419, frax: 1.000_26, usd: 0.999_732,
    },
    usdt: {
      btc: 0.000_043_67, eth: 0.000_620_4, eur: 0.979_881, usd: 1.001, usdc: 1.000_22, xyo: 113.28,
    },
    wbtc: {
      btc: 0.999_036_69, eth: 14.201_574_5, eur: 22_418, usd: 22_882, usdc: 22_860.8, xyo: 2_617_950,
    },
    weth: {
      btc: 0.070_373_5, usdc: 1610.82, xyo: 186_652,
    },
    xyo: {
      btc: 3.792_26e-7, dai: 0.008_741_69, eth: 0.000_005_353_785, eur: 0.008_447_92, link: 0.001_193_7, usd: 0.008_725_19,
    },
    xl1: {
      btc: 3.792_26e-7, dai: 0.008_741_69, eth: 0.000_005_353_785, eur: 0.008_447_92, link: 0.001_193_7, usd: 0.008_725_19,
    },
  },
  schema: CoingeckoCryptoMarketSchema,
  timestamp: 1_659_625_815_232,
}

export const payloadDataMissingAssets = {
  assets: {},
  schema: 'network.xyo.crypto.market.coingecko',
  timestamp: 1_659_071_465_718,
}
