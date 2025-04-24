import type { Theme } from '@mui/material'
import { useIsDark } from '@xylabs/react-theme'
import type { ForecastPayload } from '@xyo-network/diviner-forecasting-model'
import type {
  ChartData, ChartDataset, ChartOptions, LegendOptions, Point, ScaleChartOptions,
} from 'chart.js'

import { DataLineStyles } from './DataLineStyles.ts'
import { DataPointStyles } from './DataPointStyles.ts'
import { SourcePayloads } from './SourcePayloads.ts'

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
  plugins: { legend: { position: 'top' as const } },
  responsive: true,
})

export class ForecastLineChartConfigBuilder {
  data: ChartData<'line'> = { datasets: [] }

  options: ChartOptions<'line'> = defaultOptions()
  themeColors: ThemeColors | undefined

  constructor(
    theme: Theme,
    private payload?: ForecastPayload,
  ) {
    this.themeColors = this.parseTheme(theme)
  }

  get forecastPayload() {
    if (this.payload) {
      return this.payload
    } else {
      throw new Error('ForecastPayload was not defined')
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
    const forecastData = this.generateDataSetForecastData()

    const datasets: ChartDataset<'line'>[] = [forecastData]

    if (includeSources) {
      // build data from sources in forecastPayload
      const sourceData = await this.generateDataSetSourcePayloads()
      datasets.unshift(sourceData)

      // add last source point as first item in prediction to connect the lines
      const lastSourceDataItem = sourceData.data.at(-1) as Point
      forecastData.data.unshift(lastSourceDataItem)
    }

    this.data = { datasets }

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

  protected generateLegend() {
    return {
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
      },
    } as LegendOptions<'line'>
  }

  protected generateScales() {
    return {
      x: {
        grid: { color: this.themeColors?.gridColor },
        time: { unit: 'minute' },
        type: 'time',
      },
      y: { grid: { color: this.themeColors?.gridColor } },
    } as unknown as ScaleChartOptions<'line'>['scales']
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
    const dark = useIsDark()
    return {
      dataSetColorPrimary: theme.vars.palette.primary.light,
      dataSetColorSecondary: theme.vars.palette.secondary.light,
      gridColor: dark ? theme.vars.palette.grey[800] : theme.vars.palette.grey[300],
    }
  }

  private generateDataSetForecastData(): ChartDataset<'line'> {
    return {
      borderDash: [5],
      borderDashOffset: 0.5,
      data: this.forecastPayload.values.map(price => ({ x: price.timestamp ?? 0, y: price.value })),
      label: 'Forecast Price',
      ...DataPointStyles(this.themeColors?.dataSetColorPrimary),
      ...DataLineStyles(this.themeColors?.dataSetColorPrimary),
    }
  }

  private async generateDataSetSourcePayloads(): Promise<ChartDataset<'line'>> {
    const { sourcePrices } = await SourcePayloads.build('feePerGas.medium')
    return {
      data: sourcePrices,
      label: 'Source Prices',
      ...DataLineStyles(this.themeColors?.dataSetColorSecondary),
      ...DataPointStyles(this.themeColors?.dataSetColorSecondary),
    }
  }
}
