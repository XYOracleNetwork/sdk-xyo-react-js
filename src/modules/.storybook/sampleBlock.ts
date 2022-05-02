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
  "_archive": "temp",
  "_client": "js",
  "_hash": "b31230e7f3386a63acc64cb5f89e5353d5f9379b3bd3ae7385c47b2e600fcbb2",
  "_payloads": [{
    "_id": "627035a3487cdd487ae490c8",
    "_client": "js",
    "_hash": "ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349",
    "_observeDuration": 48,
    "_timestamp": 1651520931057,
    "definition": {
      "$id": "'network.xyo.payload'",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "schema": {
          "type": "'string'"
        }
      },
      "required": [
        "'schema'"
      ],
      "type": "'object'"
    },
    "schema": "network.xyo.payload",
    "_archive": "temp"
  },{
    "_id": "627035a3487cdd487ae490c9",
    "_client": "js",
    "_hash": "930443bfebbdd0c9d14d8787def961ab41838fe9681f64acdad82c84e8803b59",
    "_observeDuration": 47,
    "_timestamp": 1651520931057,
    "salt": "117243fd-ee33-45af-b82c-d2cfeb1f85c9",
    "schema": "network.xyo.id",
    "_archive": "temp"
  }],
  "_signatures": [
    "0c742ec946ae28759e997dab4a7d3ca2fa1315e76b6a60c985bd6508b1f870f0ce914a927e15af6ed84f113be4b14ee1a432a896fc1294fc33fa1bb557f1ad6a"
  ],
  "_timestamp": 1651520931051,

  "addresses": [
    "9e828f8ba1e8e212398b0fb8ef2a6167e91db24c"
  ],
  "payload_schemas": [
    "network.xyo.payload",
    "network.xyo.id"
  ],
  "previous_hashes": [
    null
  ],
  "payload_hashes": [
    "ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349",
    "930443bfebbdd0c9d14d8787def961ab41838fe9681f64acdad82c84e8803b59"
  ],
  "schema": "network.xyo.boundwitness"
}
