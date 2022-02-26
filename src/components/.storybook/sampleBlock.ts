import { XyoAddress, XyoBoundWitnessBuilder } from '@xyo-network/sdk-xyo-client-js'
import { samplePayload } from './samplePayload'

export const sampleBlock = {
  "_archive": "temp",
  "_client": "js",
  "_hash": "d9f26b6a04a66f3e3e2744fcc0d6cacb68e5e9b6374c91d6aac3312230e23f53",
  "_signatures": [
    "3046022100f55dbe72f844784756779db13fcdf986dee408873ff0ae51798de0a2d09f0109022100e4b60f328286a8f2313a8504cf93b810b73f11891a30c113a85399f5dfddce09"
  ],
  "_timestamp": 1645845910361,
  "addresses": [
    "9316fcf7ef5bdcfb3030711b2c89da1d90ed9ce1"
  ],
  "payload_schemas": [
    "network.xyo.id",
    "network.xyo.location",
    "network.xyo.system.info.browser"
  ],
  "previous_hashes": [
    "e8924ffda579a0410cd7927e12a06b2f8120e509d7817f945cb1f5b4fc82f329"
  ],
  "payload_hashes": [
    "60942fbcf8538cc967e8f16e9ce7fd17f6bc14a80de87a672a46217d85feac73",
    "e3b846587bd20f28f1b46fb9eab64f3cf60b83cf13a8d4ceaf20564f627010a8",
    "beed27dcacd8dca28bfae24c119cdc8391eedb7a5007078b1ffa366fd43a0a49"
  ]
}

export const sampleBlockWithPayloads = {
  "_archive": "temp",
  "_client": "js",
  "_hash": "d9f26b6a04a66f3e3e2744fcc0d6cacb68e5e9b6374c91d6aac3312230e23f53",
  "_signatures": [
    "3046022100f55dbe72f844784756779db13fcdf986dee408873ff0ae51798de0a2d09f0109022100e4b60f328286a8f2313a8504cf93b810b73f11891a30c113a85399f5dfddce09"
  ],
  "_timestamp": 1645845910361,
  "addresses": [
    "9316fcf7ef5bdcfb3030711b2c89da1d90ed9ce1"
  ],
  "payload_schemas": [
    "network.xyo.id",
    "network.xyo.location",
    "network.xyo.system.info.browser"
  ],
  "previous_hashes": [
    "e8924ffda579a0410cd7927e12a06b2f8120e509d7817f945cb1f5b4fc82f329"
  ],
  "payload_hashes": [
    "60942fbcf8538cc967e8f16e9ce7fd17f6bc14a80de87a672a46217d85feac73",
    "e3b846587bd20f28f1b46fb9eab64f3cf60b83cf13a8d4ceaf20564f627010a8",
    "beed27dcacd8dca28bfae24c119cdc8391eedb7a5007078b1ffa366fd43a0a49"
  ],
  "_payloads": [
    {
      "_id": "62199d91101e30a10f8f63c0",
      "_client": "js",
      "_hash": "60942fbcf8538cc967e8f16e9ce7fd17f6bc14a80de87a672a46217d85feac73",
      "_observeDuration": 13,
      "_timestamp": 1645845905414,
      "salt": "2a84367f-e121-44a5-b492-e59051c7625a",
      "schema": "network.xyo.id",
      "_archive": "temp"
    },
    {
      "_id": "62199d96bcb044877bd6ddf8",
      "_client": "js",
      "_hash": "e3b846587bd20f28f1b46fb9eab64f3cf60b83cf13a8d4ceaf20564f627010a8",
      "_observeDuration": 38,
      "_timestamp": 1645845910367,
      "currentLocation": {
        "coords": {
          "accuracy": 20.062,
          "altitude": null,
          "altitudeAccuracy": null,
          "heading": null,
          "latitude": 32.7136482,
          "longitude": -117.1653984,
          "speed": null
        },
        "timestamp": 1645845910221
      },
      "schema": "network.xyo.location",
      "_archive": "temp"
    },
    {
      "_id": "62193c72d54f1d35f7706839",
      "_client": "js",
      "_hash": "beed27dcacd8dca28bfae24c119cdc8391eedb7a5007078b1ffa366fd43a0a49",
      "_observeDuration": 12,
      "_timestamp": 1645821042878,
      "bowser": {
        "browser": {
          "name": "Chrome",
          "version": "98.0.4758.109"
        },
        "engine": {
          "name": "Blink"
        },
        "os": {
          "name": "macOS",
          "version": "10.15.7",
          "versionName": "Catalina"
        },
        "platform": {
          "type": "desktop",
          "vendor": "Apple"
        }
      },
      "schema": "network.xyo.system.info.browser",
      "_archive": "temp"
    }
  ]
}