import { asSchema } from '@xyo-network/payload-model'

export const sampleCoinGeckoPayload = {
  assets: {
    ada: {
      btc: 0.000_021_21,
      eth: 0.000_286_02,
      eur: 0.455_045,
      usd: 0.451_912,
    },
    btc: {
      btc: 1,
      eth: 13.480_925,
      eur: 21_444,
      usd: 21_297,
    },
    busd: {
      btc: 0.000_046_91,
      eth: 0.000_632_54,
      eur: 1.006,
      usd: 0.999_271,
    },
    doge: {
      btc: 0.000_003_15,
      eth: 0.000_042_51,
      eur: 0.067_639,
      usd: 0.067_173,
    },
    dot: {
      btc: 0.000_339_57,
      eth: 0.004_579_09,
      eur: 7.28,
      usd: 7.23,
    },
    eth: {
      btc: 0.074_168_36,
      eth: 1,
      eur: 1590.95,
      usd: 1580,
    },
    sol: {
      btc: 0.001_623_96,
      eth: 0.021_898_73,
      eur: 34.83,
      usd: 34.59,
    },
    usdc: {
      btc: 0.000_046_91,
      eth: 0.000_632_59,
      eur: 1.006,
      usd: 0.999_341,
    },
    usdt: {
      btc: 0.000_046_97,
      eth: 0.000_633_28,
      eur: 1.008,
      usd: 1.001,
    },
    wbtc: {
      btc: 0.999_857_08,
      eth: 13.482_839,
      eur: 21_447,
      usd: 21_300,
    },
    xyo: {
      btc: 4.063_47e-7,
      eth: 0.000_005_48,
      eur: 0.008_716_42,
      usd: 0.008_656_4,
    },
  },
  schema: asSchema('network.xyo.crypto.market.coingecko', true),
  timestamp: 1_661_188_759_757,
}
