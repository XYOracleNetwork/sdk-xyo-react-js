import { Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import Rollbar from 'rollbar'

import { ErrorReporterProvider } from './Provider.js'
import { useRollbar } from './useRollbar.js'

const StorybookEntry = {
  argTypes: {},
  component: ErrorReporterProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/ErrorReporterProvider',
} as Meta<typeof ErrorReporterProvider>

const RollbarComponent = () => {
  const { rollbar } = useRollbar()
  const rollbarFound = typeof rollbar?.error === 'function'

  return (
    <Typography color={rollbarFound ? 'green' : 'red'}>
      Rollbar instance
      {rollbarFound ? '' : 'NOT'}
      {' '}
      found from context!
    </Typography>
  )
}

const Template: StoryFn<typeof ErrorReporterProvider> = () => {
  const rollbar = new Rollbar()
  return (
    <ErrorReporterProvider rollbar={rollbar}>
      <RollbarComponent />
    </ErrorReporterProvider>
  )
}

const Default = Template.bind({})

export { Default }

export default StorybookEntry
