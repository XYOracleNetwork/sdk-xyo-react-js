import { XyoPayloadBuilder } from '@xyo-network/sdk-xyo-client-js'

export const samplePayloadFromBuilder = {
  ...new XyoPayloadBuilder({ schema: 'network.xyo.temp' }).fields({ test: 'hello' }).build(),
  _archive: 'temp',
}

export const samplePayload = {
  _archive: 'temp',
  _client: 'js',
  _hash: 'a98a39e11205ceacc0cf271db4dd74dd7841fa25f26585f6cd7f2fc3f03c7d55',
  _id: '62199875bcb044877bd6ddf3',
  _observeDuration: 13,
  _timestamp: 1645844597478,
  salt: '81b2372a-b4f0-4ab5-8642-c4e6de46a1cf',
  schema: 'network.xyo.id',
}
