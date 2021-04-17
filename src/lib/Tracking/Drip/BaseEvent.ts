import { delay } from '@xyo-network/sdk-xyo-js'

type DripEvent<T extends Record<string, any>> = (string | T)[]

class BaseEvent<T> {
  public name: string
  public param?: string
  public dcq: DripEvent<T>[]
  public dcs: any
  constructor(name: string, param?: string) {
    this.name = name
    this.param = param
    this.dcq = this.getDcq()
    this.dcs = this.getDcs()
  }

  public async send(data: T) {
    const payload: (string | T)[] = [this.name]
    if (this.param) {
      payload.push(this.param)
    }
    payload.push(data)
    this.dcq.push(payload)
    await delay(0)
  }

  private getDcq() {
    const global = window as any
    if (!global._dcq) {
      throw Error('DCQ not found')
    }
    return global._dcq as DripEvent<T>[]
  }

  private getDcs() {
    const global = window as any
    if (!global._dcs) {
      throw Error('DCS not found')
    }
    return global._dcs as DripEvent<T>[]
  }
}

export default BaseEvent
