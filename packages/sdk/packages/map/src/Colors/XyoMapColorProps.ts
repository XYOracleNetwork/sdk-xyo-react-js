export interface XyoHeatMapColorProps {
  staticMapColor: string
}

export interface XyoAnimatedHeatMapColorProps extends XyoHeatMapColorProps {
  lowUsageColor: string
  highUsageColor: string
}

export interface ColorGradientLegendProps {
  startColor: string
  endColor: string
  heading: string
  startLabel: string
  endLabel: string
  textColor: string
}

export type LegendProps = ColorGradientLegendProps
