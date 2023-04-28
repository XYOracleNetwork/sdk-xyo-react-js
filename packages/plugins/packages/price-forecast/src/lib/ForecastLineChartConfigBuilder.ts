import { Theme } from '@mui/material'
import { Chart as ChartJS, TooltipOptions } from 'chart.js'
// eslint-disable-next-line import/no-unresolved
import { _DeepPartialObject } from 'chart.js/dist/types/utils'

import { ForecastPayload } from './payload'

interface ThemeColors {
  dataSetColorPrimary: string
  dataSetColorSecondary: string
  gridColor: string
}

const defaultOptions: () => ChartJS<'line'>['options'] = () => ({
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  responsive: true,
})

export class ForecastLineChartConfigBuilder {
  data: ChartJS<'line'>['data'] = {
    datasets: [],
  }
  labels: (number | undefined)[] = []
  options: ChartJS<'line'>['options'] = {}
  themeColors: ThemeColors | undefined

  constructor(theme: Theme, private forecastPayload?: ForecastPayload) {
    this.themeColors = this.parseTheme(theme)
    this.buildLabels().buildOptions().buildData()
  }

  buildData() {
    this.data = {
      datasets: [
        {
          backgroundColor: this.themeColors?.dataSetColorPrimary,
          borderColor: this.themeColors?.dataSetColorPrimary,
          data: this.forecastPayload?.values.map((price) => price.value) ?? [],
          label: 'Forecast Price',
        },
      ],
      labels: this.labels,
    }
    return this
  }

  buildLabels() {
    this.labels = this.forecastPayload?.values.map((price) => price.timestamp) ?? []
    return this
  }

  buildOptions() {
    const optionsBase = defaultOptions()
    if (optionsBase.plugins) {
      optionsBase.plugins.title = this.generateTitle()
      optionsBase.plugins.tooltip = this.generateTooltip()
    }
    optionsBase.scales = this.generateScales()
    this.options = optionsBase
    return this
  }

  generateScales(): ChartJS<'line'>['options']['scales'] {
    return {
      x: {
        grid: {
          color: this.themeColors?.gridColor,
        },
        ticks: {
          callback: function (_, index) {
            const timestamp = this.getLabelForValue(index)
            const date = new Date(timestamp)
            const options: Intl.DateTimeFormatOptions = { hour: 'numeric', hour12: true, minute: 'numeric' }
            const timeString = date.toLocaleTimeString([], options)
            return timeString
          },
        },
      },
      y: {
        grid: {
          color: this.themeColors?.gridColor,
        },
      },
    }
  }

  generateTitle() {
    return {
      display: true,
      text: `Gas Price Forecaster (GWEI over time from ${
        this.forecastPayload?.values[0].timestamp ? new Date(this.forecastPayload.values[0].timestamp).toLocaleDateString() : ''
      })`,
    }
  }

  generateTooltip(): _DeepPartialObject<TooltipOptions<'line'>> {
    return {
      callbacks: {
        title: function () {
          const label = this.dataPoints[0].label
          const date = new Date(parseInt(label))
          const options: Intl.DateTimeFormatOptions = { hour: 'numeric', hour12: true, minute: 'numeric' }
          const timeString = date.toLocaleTimeString([], options)
          return `${date.toLocaleDateString()} ${timeString}`
        },
      },
    }
  }

  parseTheme(theme: Theme) {
    const dark = theme.palette.mode === 'dark'
    return {
      dataSetColorPrimary: theme.palette.primary.light,
      dataSetColorSecondary: theme.palette.secondary.light,
      gridColor: dark ? theme.palette.grey[800] : theme.palette.grey[300],
    }
  }
}
