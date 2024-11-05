export interface HeatMapColorProps {
  staticMapColor: string
}

export interface AnimatedHeatMapColorProps extends HeatMapColorProps {
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
