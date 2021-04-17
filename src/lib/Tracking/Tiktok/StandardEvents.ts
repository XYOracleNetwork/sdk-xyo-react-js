import Ttq from './Ttq'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TiktokStandardEvents<T> {
  public pageView() {
    return Ttq.instance.page()
  }
}
