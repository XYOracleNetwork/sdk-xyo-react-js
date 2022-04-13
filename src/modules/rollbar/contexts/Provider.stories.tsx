import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Rollbar from 'rollbar'

import { RollbarProvider } from './Provider'
import { useRollbar } from './useRollbar'

const StorybookEntry = {
  argTypes: {},
  component: RollbarProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Rollbar/RollbarProvider',
} as ComponentMeta<typeof RollbarProvider>

const RollbarComponent = () => {
  const { rollbar } = useRollbar()
  const rollbarFound = typeof rollbar?.error === 'function'

  return (
    <Typography color={rollbarFound ? 'green' : 'red'}>
      Rollbar instance {rollbarFound ? '' : 'NOT'} found from context!
    </Typography>
  )
}

const Template: ComponentStory<typeof RollbarProvider> = () => {
  const rollbar = new Rollbar()
  return (
    <RollbarProvider instance={rollbar}>
      <RollbarComponent />
    </RollbarProvider>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
