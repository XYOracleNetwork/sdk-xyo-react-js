import { delay } from '@xyo-network/sdk-xyo-js'

class Ttq {
  public static instance: Ttq
  public static init(pixelId: string) {
    try {
      Ttq.instance = new Ttq()
      this.getTtq().load(pixelId)
      Ttq.page()
    } catch (ex) {
      console.log(ex)
    }
  }

  public static getTtq() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const global = window as any
    return global.ttq
  }

  public static async page() {
    try {
      Ttq.getTtq().page()
      await delay(0)
    } catch (ex) {
      console.error(ex)
    }
  }

  public async track(event: string, data?: Record<string, unknown>) {
    try {
      Ttq.getTtq().track(event, {
        ...data,
      })
      await delay(0)
    } catch (ex) {
      console.error(ex)
    }
  }
}

export default Ttq
