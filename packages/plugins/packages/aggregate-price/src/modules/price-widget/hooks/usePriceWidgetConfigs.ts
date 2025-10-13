import {
  XL1PriceWidgetConfig, XyLabsPriceWidgetConfig, XyoPriceWidgetConfig,
} from '../lib/index.ts'
import { useParsePriceWidgetConfig } from './useParsePriceWidgetConfig.ts'

export const useXyoPriceWidget = () => {
  return useParsePriceWidgetConfig(XyoPriceWidgetConfig)
}

export const useXL1PriceWidget = () => {
  return useParsePriceWidgetConfig(XL1PriceWidgetConfig)
}

export const useXLBPriceWidget = () => {
  return useParsePriceWidgetConfig(XyLabsPriceWidgetConfig)
}
