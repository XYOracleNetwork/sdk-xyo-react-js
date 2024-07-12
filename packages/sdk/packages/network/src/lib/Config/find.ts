import { defaultNetworkConfigs } from './default.js'

export const findNetworkConfig = (slug: string, configs = defaultNetworkConfigs) => {
  return configs.find((item) => {
    return item.slug === slug
  })
}

/** @deprecated use findNetworkConfig instead */
export const findNetworkPreset = findNetworkConfig
