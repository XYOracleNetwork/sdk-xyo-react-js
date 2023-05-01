import { Theme } from '@mui/material'
import { ForecastPayload } from '@xyo-network/diviner-forecasting-model'
import { ChartData, ChartDataset, ChartOptions, LegendOptions, Point, ScaleChartOptions } from 'chart.js'
// eslint-disable-next-line import/no-unresolved
import { _DeepPartialObject } from 'chart.js/dist/types/utils'

import { SourcePayloads } from './SourcePayloads'

interface SourcePayloadConfig {
  fetch: boolean
  sampleSize?: number
}

interface ThemeColors {
  dataSetColorPrimary: string
  dataSetColorSecondary: string
  gridColor: string
}

const defaultOptions: () => ChartOptions<'line'> = () => ({
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  responsive: true,
})

export class ForecastLineChartConfigBuilder {
  data: ChartData<'line'> = {
    datasets: [],
  }
  options: ChartOptions<'line'> = defaultOptions()
  themeColors: ThemeColors | undefined

  constructor(theme: Theme, private payload?: ForecastPayload) {
    this.themeColors = this.parseTheme(theme)
  }

  get forecastPayload() {
    if (this.payload) {
      return this.payload
    } else {
      throw Error('ForecastPayload was not defined')
    }
  }

  static async create(theme: Theme, payload?: ForecastPayload, sourcePayloadConfig?: SourcePayloadConfig) {
    const instance = new ForecastLineChartConfigBuilder(theme, payload)

    await instance.build(sourcePayloadConfig?.fetch)

    instance.refreshValues()

    return instance
  }

  async build(includeSources?: boolean) {
    this.buildOptions()
    await this.buildData(includeSources)
    return this
  }

  async buildData(includeSources?: boolean) {
    const forecastData = {
      backgroundColor: this.themeColors?.dataSetColorPrimary,
      borderColor: this.themeColors?.dataSetColorPrimary,
      borderDash: [10],
      borderDashOffset: 0.5,
      data: this.forecastPayload.values.map((price) => ({ x: price.timestamp ?? 0, y: price.value })),
      label: 'Forecast Price',
    }

    const datasets: ChartDataset<'line'>[] = [forecastData]

    if (includeSources) {
      // build data from sources in forecastPayload
      const sourceData = await this.buildSourcePayloads()
      datasets.unshift(sourceData)

      // add last source point as first item in prediction to connect the lines
      const lastSourceDataItem = sourceData.data.at(-1) as Point
      forecastData.data.unshift(lastSourceDataItem)
    }

    this.data = {
      datasets,
    }

    return this
  }

  buildOptions() {
    if (this.options.plugins) {
      this.options.plugins.title = this.generateTitle()
      this.options.plugins.legend = this.generateLegend()
    }
    this.options.scales = this.generateScales()

    return this
  }

  refreshValues() {
    this.data = { ...this.data }
    this.options = { ...this.options }
  }

  protected generateLegend(): _DeepPartialObject<LegendOptions<'line'>> {
    return {
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
      },
    }
  }

  protected generateScales(): _DeepPartialObject<ScaleChartOptions<'line'>['scales']> {
    return {
      x: {
        grid: {
          color: this.themeColors?.gridColor,
        },
        // offset: true,
        time: {
          unit: 'minute',
        },
        type: 'time',
      },
      y: {
        grid: {
          color: this.themeColors?.gridColor,
        },
      },
    }
  }

  protected generateTitle() {
    return {
      display: true,
      text: `Gas Price Forecaster (GWEI over time from ${
        this.forecastPayload?.values[0].timestamp ? new Date(this.forecastPayload.values[0].timestamp).toLocaleDateString() : ''
      })`,
    }
  }

  protected parseTheme(theme: Theme) {
    const dark = theme.palette.mode === 'dark'
    return {
      dataSetColorPrimary: theme.palette.primary.light,
      dataSetColorSecondary: theme.palette.secondary.light,
      gridColor: dark ? theme.palette.grey[800] : theme.palette.grey[300],
    }
  }

  private async buildSourcePayloads(): Promise<ChartDataset<'line'>> {
    const { sourcePrices } = await SourcePayloads.build('feePerGas.medium')
    return {
      backgroundColor: this.themeColors?.dataSetColorSecondary,
      borderColor: this.themeColors?.dataSetColorSecondary,
      data: sourcePrices,
      label: 'Source Prices',
    }
  }
}
