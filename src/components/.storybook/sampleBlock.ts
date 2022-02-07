import { XyoBoundWitnessBuilder } from '@xyo-network/sdk-xyo-client-js'
export const sampleBlock = new XyoBoundWitnessBuilder().payload({ schema: 'test.xyo.network' }).build()