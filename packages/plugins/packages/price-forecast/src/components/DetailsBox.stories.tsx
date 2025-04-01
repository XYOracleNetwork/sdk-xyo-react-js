import {
  Button, ButtonGroup, Typography,
} from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { ForecastPayloadSchema } from '@xyo-network/diviner-forecasting-model'
import type { RefObject } from 'react'
import React, { useRef, useState } from 'react'

import { MockSourcePayloads } from '../lib/index.ts'
import { PriceForecastDetailsBox } from './DetailsBox.tsx'

const tenMin = 600_000

const ForecastingDivinerPayload = {
  schema: ForecastPayloadSchema,
  values: [1, 2, 3, 4, 5, 6, 7, 8].map(item => ({
    error: 0,
    timestamp: Date.now() + tenMin * item,
    value: 100 * item,
  })),
}

const StorybookEntry = {
  argTypes: {},
  component: PriceForecastDetailsBox,
  parameters: { docs: { page: null } },
  title: 'plugin/price-forecast/DetailsBox',
} as Meta<typeof PriceForecastDetailsBox>

const Template: StoryFn<typeof PriceForecastDetailsBox> = (args) => {
  const [showPayloads, setShowPayloads] = useState(false)
  const forecastPayloadRef = useRef<HTMLParagraphElement>(null)
  const sourcePayloadsRef = useRef<HTMLParagraphElement>(null)
  const handleClick = (ref: RefObject<HTMLParagraphElement | null>) => {
    setShowPayloads(!showPayloads)
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <>
      <PriceForecastDetailsBox mb={3} {...args} />
      <FlexCol>
        <ButtonGroup>
          <Button variant="contained" onClick={() => handleClick(forecastPayloadRef)}>
            Forecast Payload
          </Button>
          <Button variant="contained" onClick={() => handleClick(sourcePayloadsRef)}>
            Source Payloads
          </Button>
        </ButtonGroup>
      </FlexCol>
      <pre>
        <Typography ref={forecastPayloadRef}>
          ForecastPayload:
          {' '}
          <code>{JSON.stringify(args.payload, null, 2)}</code>
        </Typography>
      </pre>
      <pre>
        <Typography ref={sourcePayloadsRef}>
          SourcePayloads:
          {' '}
          <pre>{JSON.stringify(MockSourcePayloads(), null, 2)}</pre>
        </Typography>
      </pre>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: ForecastingDivinerPayload }

export { Default, WithData }

export default StorybookEntry
