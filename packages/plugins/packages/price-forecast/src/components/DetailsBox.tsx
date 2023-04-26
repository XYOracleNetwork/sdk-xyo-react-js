import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { ForecastPayload } from '../lib'
import { useChartColors } from './useChartColors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const randomNumberBetween1and10 = () => Math.floor(Math.random() * 10) + 1

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload
  const { dataSetColorPrimary, dataSetColorSecondary, gridColor } = useChartColors()

  const options: ChartJS<'line'>['options'] = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gas Price Forecaster',
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
      },
    },
  }

  const data: ChartJS<'line'>['data'] = useMemo(
    () => ({
      datasets: [
        {
          backgroundColor: dataSetColorPrimary,
          borderColor: dataSetColorPrimary,
          data: labels.map(() => randomNumberBetween1and10()),
          label: 'Dataset 1',
        },
        {
          backgroundColor: dataSetColorSecondary,
          borderColor: dataSetColorSecondary,
          data: labels.map(() => randomNumberBetween1and10()),
          label: 'Dataset 2',
        },
      ],
      labels,
    }),
    [dataSetColorPrimary, dataSetColorSecondary],
  )

  return (
    <FlexCol {...props}>
      Hello from PriceForecastDetailsBox: <code>{JSON.stringify(priceForecastPayload)}</code>
      <Line options={options} data={data} />
    </FlexCol>
  )
}
