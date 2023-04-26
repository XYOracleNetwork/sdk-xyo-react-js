import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { ForecastPayload } from '../lib'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options: ChartJS['options'] = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  responsive: true,
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const randomNumberBetween1and10 = () => Math.floor(Math.random() * 10) + 1

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload
  const theme = useTheme()

  const data: ChartJS<'line'>['data'] = useMemo(
    () => ({
      datasets: [
        {
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.light,
          data: labels.map(() => randomNumberBetween1and10()),
          label: 'Dataset 1',
        },
        {
          backgroundColor: theme.palette.secondary.light,
          borderColor: theme.palette.secondary.light,
          data: labels.map(() => randomNumberBetween1and10()),
          label: 'Dataset 2',
        },
      ],
      labels,
    }),
    [],
  )

  return (
    <FlexCol {...props}>
      Hello from PriceForecastDetailsBox: <code>{JSON.stringify(priceForecastPayload)}</code>
      <Line options={options} data={data} />
    </FlexCol>
  )
}
