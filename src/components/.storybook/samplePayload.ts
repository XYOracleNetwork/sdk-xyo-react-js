import { XyoPayloadBuilder } from "@xyo-network/sdk-xyo-client-js";

export const samplePayloadFromBuilder = {...(new XyoPayloadBuilder({ schema: 'network.xyo.temp' }).fields({test: 'hello'}).build()), _archive: 'temp'}

export const samplePayload = {
  "bowser": {
    "browser": {
      "name": "Chrome",
      "version": "98.0.4758.80"
    },
    "os": {
      "name": "macOS",
      "version": "10.15.7",
      "versionName": "Catalina"
    },
    "platform": {
      "type": "desktop",
      "vendor": "Apple"
    },
    "engine": {
      "name": "Blink"
    }
  },
  "schema": "network.xyo.system.info"
}