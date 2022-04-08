import { XyoArchivistPreset, XyoDivinerPreset } from '../../../general'

export interface XyoNetworkConfig {
  slug: string
  name: string
  archivists: XyoArchivistPreset[]
  diviners: XyoDivinerPreset[]
}
/** @deprecated use XyoNetworkConfig instead */
export type XyoNetworkPreset = XyoNetworkConfig
