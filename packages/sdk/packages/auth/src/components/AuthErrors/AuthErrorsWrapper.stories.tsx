/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-internal-modules */
import { Alert, AlertTitle, Button } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import axios from 'axios'

import { AuthErrorsWrapper } from './AuthErrorsWrapper'

const StorybookEntry = {
  argTypes: {},
  component: AuthErrorsWrapper,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthErrorsWrapper',
  /* eslint-disable deprecation/deprecation */
} as ComponentMeta<typeof AuthErrorsWrapper>

const Template: ComponentStory<typeof AuthErrorsWrapper> = () => {
  const create403 = () => {
    const request = axios.get('http://localhost:8081/archive/foo123890/block/recent/20')
    request.then().catch((error) => console.error(error))
  }

  const create401 = () => {
    const request = axios.post('http://localhost:8081/user/accounts', { email: 'none@none.com', password: 'wrong' })
    request.then().catch((error) => console.error(error))
  }

  return (
    <>
      <Alert severity="error" sx={{ marginBottom: '24px' }}>
        <AlertTitle>Story has been Deprecated</AlertTitle>
      </Alert>
      <Button sx={{ marginBottom: '24px' }} variant="contained" onClick={() => create403()}>
        Trigger API Error - 403
      </Button>
      <Button variant="contained" onClick={() => create401()}>
        Trigger API Error - 401
      </Button>
      {/* Prevent circular dependency with react-auth-service */}
      {/* <AuthErrorsWrapper {...props}>
        <AuthServiceWrapper />
      </AuthErrorsWrapper> */}
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
