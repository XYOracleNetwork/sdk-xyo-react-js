import type { Payload } from '@xyo-network/payload-model'

type TestPayload = Payload<
  {
    test: string
  },
  'network.xyo.temp'
>

// needs to be in a function since cjs doesn't support top level awaits
export const samplePayloadFromBuilder = {
  ...({
    schema: 'network.xyo.temp', test: 'hello',
  } as TestPayload),
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
