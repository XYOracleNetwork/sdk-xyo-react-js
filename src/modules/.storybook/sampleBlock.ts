import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

export const sampleBlock = {
  _archive: 'temp',
  _client: 'js',
  _hash: 'd9f26b6a04a66f3e3e2744fcc0d6cacb68e5e9b6374c91d6aac3312230e23f53',
  _signatures: [
    '3046022100f55dbe72f844784756779db13fcdf986dee408873ff0ae51798de0a2d09f0109022100e4b60f328286a8f2313a8504cf93b810b73f11891a30c113a85399f5dfddce09',
  ],
  _timestamp: 1645845910361,
  addresses: ['9316fcf7ef5bdcfb3030711b2c89da1d90ed9ce1'],
  payload_hashes: [
    '60942fbcf8538cc967e8f16e9ce7fd17f6bc14a80de87a672a46217d85feac73',
    'e3b846587bd20f28f1b46fb9eab64f3cf60b83cf13a8d4ceaf20564f627010a8',
    'beed27dcacd8dca28bfae24c119cdc8391eedb7a5007078b1ffa366fd43a0a49',
  ],
  payload_schemas: ['network.xyo.id', 'network.xyo.location', 'network.xyo.system.info.browser'],
  previous_hashes: ['e8924ffda579a0410cd7927e12a06b2f8120e509d7817f945cb1f5b4fc82f329'],
  schema: 'network.xyo.boundwitness',
}

export const sampleBlockWithPayloads: XyoBoundWitness = {
  _archive: 'temp',
  _client: 'js',
  _hash: '2b5de274c24ccca79f5f00bb75b2f5093b472325863603f4ee6618cd797f48d7',
  _payloads: [],
  _signatures: [
    '3046022100be1be14d11d4e6d261f46feb8bec687ca8f71bdf43151659990a196259c6fced022100a69ac717d728582a2844b91076bb1ad33122bda101181684d831332f7aec1298',
  ],
  _timestamp: 1647967579159,
  addresses: ['5740d63a2d6105530d14a08fd83ca877e8a8b838'],
  payload_hashes: [],
  payload_schemas: [],
  previous_hashes: [null],
  schema: 'network.xyo.boundwitness',
}
