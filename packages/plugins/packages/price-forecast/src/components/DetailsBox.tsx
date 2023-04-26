import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
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

export const data: ChartJS<'line'>['data'] = {
  datasets: [
    {
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgb(255, 99, 132)',
      data: labels.map(() => randomNumberBetween1and10()),
      label: 'Dataset 1',
    },
    {
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgb(53, 162, 235)',
      data: labels.map(() => randomNumberBetween1and10()),
      label: 'Dataset 2',
    },
  ],
  labels,
}

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload

  return (
    <FlexCol {...props}>
      Hello from PriceForecastDetailsBox: <code>{JSON.stringify(priceForecastPayload)}</code>
      <Line options={options} data={data} />
    </FlexCol>
  )
}
