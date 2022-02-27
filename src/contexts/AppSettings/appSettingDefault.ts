import { findNetworkPreset } from '../../lib'
import { AppSettingSlug } from './Slug'

export const appSettingDefault = (): Record<string, unknown> => {
  const defaultNetwork = findNetworkPreset('xyo-kerplunk')
  return {
    [AppSettingSlug.DarkMode]: false,
    [AppSettingSlug.Developer]: false,
    [AppSettingSlug.Network]: defaultNetwork,
    [AppSettingSlug.Archive]: 'temp',
  }
}
