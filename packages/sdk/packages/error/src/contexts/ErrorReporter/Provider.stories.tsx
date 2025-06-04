import { Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'
import Rollbar from 'rollbar'

import { ErrorReporterProvider } from './Provider.tsx'
import { useErrorReporter } from './useErrorReporter.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ErrorReporterProvider,
  parameters: { docs: { page: null } },
  title: 'auth-service/ErrorReporterProvider',
} as Meta<typeof ErrorReporterProvider>

const RollbarComponent = () => {
  const { rollbar } = useErrorReporter()
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
