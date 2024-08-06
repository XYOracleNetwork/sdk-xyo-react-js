import 'chartjs-adapter-luxon'

import { useTheme } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { ForecastPayload } from '@xyo-network/diviner-forecasting-model'
import { Payload } from '@xyo-network/payload-model'
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

import { ForecastLineChartConfigBuilder } from '../lib/index.ts'

ChartJS.register(CategoryScale, TimeScale, PointElement, LineElement, LinearScale, Title, Tooltip, Legend)

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload | undefined
  const theme = useTheme()
  const [data, setData] = useState<ChartData<'line'>>({ datasets: [] })
  const [options, setOptions] = useState<ChartOptions<'line'>>({})

  useAsyncEffect(

    async (mounted) => {
      const { data, options } = await ForecastLineChartConfigBuilder.create(theme, priceForecastPayload, { fetch: true })
      if (mounted()) {
        setData(data)
        setOptions(options)
      }
    },
    [priceForecastPayload, theme],
  )

  return (
    <FlexCol {...props} busy={priceForecastPayload === undefined} minHeight="25vh">
      {priceForecastPayload
        ? <Line options={options} data={data} />
        : null}
    </FlexCol>
  )
}
