import { Alert, Button } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { ThrownErrorBoundary } from './ThrownErrorBoundary.tsx'

const StorybookEntry: Meta = {
  component: ThrownErrorBoundary,
  title: 'auth-service/ApiBoundary/ThrownErrorBoundary',
}

const Thrower: React.FC = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false)
  if (shouldThrow) {
    throw new Error('Test Error')
  }
  return (
    <Button onClick={() => {
      setShouldThrow(true)
    }}
    >
      Throw Error
    </Button>
  )
}

const Template: StoryFn<typeof ThrownErrorBoundary> = ({ errorComponent }) => {
  return (
    <ThrownErrorBoundary errorComponent={errorComponent} boundaryName="StoryBook">
      <Alert severity="info">Use React Dev Tools to trigger and error within the boundary</Alert>
      <Thrower />
    </ThrownErrorBoundary>
  )
}

const Default = Template.bind({})
Default.args = {}

const CustomErrorComponent = Template.bind({})
CustomErrorComponent.args = {
  errorComponent: e => (
    <Alert severity="error">
      Using Custom Error Component with error:
      {e.message}
    </Alert>
  ),
}

export { CustomErrorComponent, Default }

export default StorybookEntry
