import { asSchema } from '@xyo-network/payload-model'

export const payloadData = {
  assets: {
    ada: {
      value: {
        btc: '0.00002192', eth: '0.00031141', eur: '0.491867', usd: '0.502045',
      },
    },
    btc: {
      value: {
        btc: '1', eth: '14.213346', eur: '22450', usd: '22914',
      },
    },
    busd: {
      value: {
        btc: '0.00004369', eth: '0.00062074', eur: '0.980451', usd: '1.001',
      },
    },
    dai: { value: { usdc: '1.00004', xyo: '114.394' } },
    doge: {
      value: {
        btc: '0.00000293', eth: '0.00004157', eur: '0.065655', usd: '0.067013',
      },
    },
    dot: {
      value: {
        btc: '0.00035508', eth: '0.00504454', eur: '7.97', usd: '8.13',
      },
    },
    eth: {
      value: {
        btc: '0.0703878', eth: '1', eur: '1579.47', usd: '1612.16',
      },
    },
    frax: { value: { usdc: '0.999738' } },
    link: { value: { xyo: '837.731' } },
    sol: {
      value: {
        btc: '0.00169369', eth: '0.02406215', eur: '38.01', usd: '38.79',
      },
    },
    usdc: {
      value: {
        btc: '0.0000436965', dai: '0.999963', eth: '0.0006204464999999999', eur: '0.979419', frax: '1.00026', usd: '0.999732',
      },
    },
    usdt: {
      value: {
        btc: '0.00004367', eth: '0.0006204', eur: '0.979881', usd: '1.001', usdc: '1.00022', xyo: '113.28',
      },
    },
    wbtc: {
      value: {
        btc: '0.99903669', eth: '14.2015745', eur: '22418', usd: '22882', usdc: '22860.8', xyo: '2617950',
      },
    },
    weth: {
      value: {
        btc: '0.0703735', usdc: '1610.82', xyo: '186652',
      },
    },
    xyo: {
      value: {
        btc: '3.79226e-7', dai: '0.00874169', eth: '0.000005353785', eur: '0.00844792', link: '0.0011937', usd: '0.00872519',
      },
    },
  },
  schema: asSchema('network.xyo.crypto.asset', true),
  timestamp: 1_659_625_815_232,
}
