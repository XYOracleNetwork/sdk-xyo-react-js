/* eslint-disable import/no-internal-modules */
import { Alert, Paper, TextField } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { BasePageProps } from '@xylabs/react-common'
import { FlexCol } from '@xylabs/react-flexbox'
import { ApiProvider, ArchivesProvider } from '@xyo-network/react-api'
import { ApplicationAppBar, SystemToolbar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { BrowserRouter } from 'react-router-dom'

import { XyoThrownErrorBoundary } from './ThrownErrorBoundary'

const basePageProps: BasePageProps = {
  appBar: (
    <ApplicationAppBar
      systemToolbar={
        <SystemToolbar
          style={{ paddingLeft: 8, paddingRight: 8 }}
          disableGutters
          archiveSelectProps={{
            sx: { display: 'none' },
          }}
          sx={{ flexWrap: 'wrap-reverse', justifyContent: 'end' }}
          darkModeButton
          authButton
        />
      }
    >
      <TextField fullWidth size="small" />
    </ApplicationAppBar>
  ),
  appFooter: (
    <FlexCol alignItems="stretch">
      <Paper elevation={8}>
        <Footer width="100%" />
      </Paper>
    </FlexCol>
  ),
  title: 'Page Title',
}

const StorybookEntry: Meta = {
  args: {
    basePageProps,
  },
  component: XyoThrownErrorBoundary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/XyoApiBoundary/ThrownErrorBoundary',
}

const Template: ComponentStory<typeof XyoThrownErrorBoundary> = ({ basePageProps, errorComponent }) => {
  return (
    <BrowserRouter>
      <NetworkMemoryProvider>
        <ApiProvider apiDomain="http://localhost:8080">
          <ArchivesProvider>
            <XyoThrownErrorBoundary basePageProps={basePageProps} errorComponent={errorComponent} boundaryName="StoryBook">
              <Alert severity="info">Use React Dev Tools to trigger and error within the boundary</Alert>
            </XyoThrownErrorBoundary>
          </ArchivesProvider>
        </ApiProvider>
      </NetworkMemoryProvider>
    </BrowserRouter>
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
