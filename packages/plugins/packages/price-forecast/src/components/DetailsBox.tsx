import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { ForecastPayload } from '../lib'
import { useChartColors } from './useChartColors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload | undefined
  const { dataSetColorPrimary, gridColor } = useChartColors()

  const labels = useMemo(
    () => priceForecastPayload?.values.map((price) => (price.timestamp ? new Date(price.timestamp).toLocaleDateString() : null)),
    [priceForecastPayload?.values],
  )

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
    () =>
      priceForecastPayload
        ? {
            datasets: [
              {
                backgroundColor: dataSetColorPrimary,
                borderColor: dataSetColorPrimary,
                data: priceForecastPayload?.values.map((price) => price.value),
                label: 'Forecast Price',
              },
            ],
            labels,
          }
        : {
            datasets: [],
            labels,
          },
    [dataSetColorPrimary, labels, priceForecastPayload],
  )

  return (
    <FlexCol {...props} busy={priceForecastPayload === undefined} minHeight="25vh">
      {priceForecastPayload ? <Line options={options} data={data} /> : null}
    </FlexCol>
  )
}
