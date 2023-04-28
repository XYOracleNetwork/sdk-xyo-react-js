import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import { ForecastLineChartConfigBuilder, ForecastPayload } from '../lib'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export interface PriceForecastDetailsBoxProps extends FlexBoxProps {
  payload?: Payload
}

export const PriceForecastDetailsBox: React.FC<PriceForecastDetailsBoxProps> = ({ payload, ...props }) => {
  const priceForecastPayload = payload as ForecastPayload | undefined
  const theme = useTheme()

  const { data, options } = useMemo(() => new ForecastLineChartConfigBuilder(theme, priceForecastPayload), [priceForecastPayload, theme])

  return (
    <FlexCol {...props} busy={priceForecastPayload === undefined} minHeight="25vh">
      {priceForecastPayload ? <Line options={options} data={data} /> : null}
    </FlexCol>
  )
}
