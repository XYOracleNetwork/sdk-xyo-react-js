export interface XyoHeatMapColorProps {
  staticMapColor: string
}

export interface XyoAnimatedHeatMapColorProps extends XyoHeatMapColorProps {
  highUsageColor: string
  lowUsageColor: string
}

export interface ColorGradientLegendProps {
  endColor: string
  endLabel: string
  heading: string
  startColor: string
  startLabel: string
  textColor: string
}

export type LegendProps = ColorGradientLegendProps
