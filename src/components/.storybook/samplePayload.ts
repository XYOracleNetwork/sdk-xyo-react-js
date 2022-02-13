import { XyoPayloadBuilder } from "@xyo-network/sdk-xyo-client-js";

export const samplePayload = {...(new XyoPayloadBuilder({ schema: 'network.xyo.temp' }).fields({test: 'hello'}).build()), _archive: 'temp'}