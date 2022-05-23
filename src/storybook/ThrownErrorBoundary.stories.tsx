import { Alert, Paper, TextField } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { BasePageProps, FlexCol } from '@xylabs/sdk-react'
import { ApplicationAppBar, SystemToolbar } from '@xyo-network/react-appbar'
import { ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { Footer } from '@xyo-network/react-shared'
import { BrowserRouter } from 'react-router-dom'

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
