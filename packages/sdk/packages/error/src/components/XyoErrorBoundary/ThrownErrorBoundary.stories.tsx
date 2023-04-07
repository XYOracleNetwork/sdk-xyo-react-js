/* eslint-disable import/no-internal-modules */
import { Alert } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'

import { XyoThrownErrorBoundary } from './ThrownErrorBoundary'

const StorybookEntry: Meta = {
  component: XyoThrownErrorBoundary,
  title: 'auth-service/XyoApiBoundary/ThrownErrorBoundary',
}

const Template: StoryFn<typeof XyoThrownErrorBoundary> = ({ errorComponent }) => {
  return (
    <XyoThrownErrorBoundary errorComponent={errorComponent} boundaryName="StoryBook">
      <Alert severity="info">Use React Dev Tools to trigger and error within the boundary</Alert>
    </XyoThrownErrorBoundary>
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
