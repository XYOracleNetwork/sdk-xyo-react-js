import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Rollbar from 'rollbar'

import { ErrorReporterProvider } from './Provider'
import { useRollbar } from './useRollbar'

const StorybookEntry = {
  argTypes: {},
  component: ErrorReporterProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/ErrorReporterProvider',
} as ComponentMeta<typeof ErrorReporterProvider>

const RollbarComponent = () => {
  const { rollbar } = useRollbar()
  const rollbarFound = typeof rollbar?.error === 'function'

  return <Typography color={rollbarFound ? 'green' : 'red'}>Rollbar instance {rollbarFound ? '' : 'NOT'} found from context!</Typography>
}

const Template: ComponentStory<typeof ErrorReporterProvider> = () => {
  const rollbar = new Rollbar()
  return (
    <ErrorReporterProvider rollbar={rollbar}>
      <RollbarComponent />
    </ErrorReporterProvider>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
