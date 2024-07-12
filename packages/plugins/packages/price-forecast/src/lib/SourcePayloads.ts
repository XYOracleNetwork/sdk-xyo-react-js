import { Payload } from '@xyo-network/payload-model'
import { Point } from 'chart.js'

import { MockSourcePayloads } from './MockSourcePayloads.js'

export class SourcePayloads {
  sourcePrices: Point[] = []

  constructor(public sourcePayloads: Payload[]) {}

  get payloads() {
    return this.sourcePayloads
  }

  static async build(jsonPath: string) {
    const sourcePayloads = await this.fetchSourcePayloads()
    const instance = new this(sourcePayloads)

    const paths = jsonPath.split('.')
    instance.sourcePrices = sourcePayloads.map((payload) => {
      return { x: payload.timestamp, y: instance.jsonPathTraverser(payload, paths) }
    })
    return instance
  }

  // TODO - fetch from archivist
  static async fetchSourcePayloads() {
    const payloads = await Promise.resolve(MockSourcePayloads())
    return payloads
  }

  jsonPathTraverser(obj: Payload, path: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = obj
    for (const key of path) {
      if (key in result) {
        const foundKey = key as keyof typeof result
        result = result[foundKey]
      } else {
        result = undefined
        break
      }
    }

    return result
  }
}
