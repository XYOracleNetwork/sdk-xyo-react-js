import { Alert, Paper, TextField } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { BasePageProps, FlexCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { ApplicationAppBar, SystemToolbar } from '../../../appbar'
import { ArchivesProvider } from '../../../archives'
import { ArchivistApiProvider } from '../../../archivist-api'
import { Footer } from '../../../general'
import { NetworkMemoryProvider } from '../../../network'
import { XyoApiThrownErrorBoundary } from './ThrownErrorBoundary'

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
  component: XyoApiThrownErrorBoundary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ThrownErrorBoundary',
}

const Template: ComponentStory<typeof XyoApiThrownErrorBoundary> = ({ basePageProps, errorComponent }) => {
  return (
    <BrowserRouter>
      <NetworkMemoryProvider>
        <ArchivistApiProvider apiDomain="http://localhost:8080">
          <ArchivesProvider>
            <XyoApiThrownErrorBoundary basePageProps={basePageProps} errorComponent={errorComponent}>
              <Alert severity="info">Use React Dev Tools to trigger and error within the boundary</Alert>
            </XyoApiThrownErrorBoundary>
          </ArchivesProvider>
        </ArchivistApiProvider>
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
