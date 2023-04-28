import { Button, ButtonGroup, Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { RefObject, useRef, useState } from 'react'

import { ForecastPayloadSchema } from '../lib'
import { PriceForecastDetailsBox } from './DetailsBox'

const tenMin = 600000

const ForecastingDivinerPayload = {
  schema: ForecastPayloadSchema,
  values: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({
    error: 0,
    timestamp: Date.now() + tenMin * item,
    value: 1000 * Math.random(),
  })),
}

const StorybookEntry = {
  argTypes: {},
  component: PriceForecastDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/price-forecast/DetailsBox',
} as Meta<typeof PriceForecastDetailsBox>

const Template: StoryFn<typeof PriceForecastDetailsBox> = (args) => {
  const [showPayloads, setShowPayloads] = useState(false)
  const forecastPayloadRef = useRef<HTMLParagraphElement>(null)
  const sourcePayloadsRef = useRef<HTMLParagraphElement>(null)
  const handleClick = (ref: RefObject<HTMLParagraphElement>) => {
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
          ForecastPayload: <code>{JSON.stringify(args.payload, null, 2)}</code>
        </Typography>
      </pre>
      <pre>
        <Typography ref={sourcePayloadsRef}>
          SourcePayloads: <pre>{/* <code>{JSON.stringify(args.payload, null, 2)}</code> */}</pre>
        </Typography>
      </pre>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: ForecastingDivinerPayload,
}

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
