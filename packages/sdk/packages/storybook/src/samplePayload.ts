import { PayloadBuilder } from '@xyo-network/payload-builder'
import { Payload } from '@xyo-network/payload-model'

export const samplePayloadFromBuilder = {
  ...new PayloadBuilder<Payload<{ schema: 'network.xyo.temp'; test: string }>>({ schema: 'network.xyo.temp' }).fields({ test: 'hello' }).build(),
  _archive: 'temp',
}

export const sampleIdPayload = {
  salt: '81b2372a-b4f0-4ab5-8642-c4e6de46a1cf',
  schema: 'network.xyo.id',
}

export const sampleSystemInfoBrowserPayload = {
  bowser: {
    browser: {
      name: 'Chrome',
      version: '104.0.0.0',
    },
    engine: {
      name: 'Blink',
    },
    os: {
      name: 'Windows',
      version: 'NT 10.0',
      versionName: '10',
    },
    platform: {
      type: 'desktop',
    },
  },
  schema: 'network.xyo.system.info.browser',
}
