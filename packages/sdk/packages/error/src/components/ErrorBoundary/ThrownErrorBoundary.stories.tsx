/* eslint-disable import/no-internal-modules */
import { Alert } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'

import { ThrownErrorBoundary } from './ThrownErrorBoundary'

const StorybookEntry: Meta = {
  component: ThrownErrorBoundary,
  title: 'auth-service/ApiBoundary/ThrownErrorBoundary',
}

const Template: StoryFn<typeof ThrownErrorBoundary> = ({ errorComponent }) => {
  return (
    <ThrownErrorBoundary errorComponent={errorComponent} boundaryName="StoryBook">
      <Alert severity="info">Use React Dev Tools to trigger and error within the boundary</Alert>
    </ThrownErrorBoundary>
  )
}

const Default = Template.bind({})
Default.args = {}

const CustomErrorComponent = Template.bind({})
CustomErrorComponent.args = {
  errorComponent: (e) => <Alert severity="error">Using Custom Error Component with error: {e.message}</Alert>,
}

export { CustomErrorComponent, Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
