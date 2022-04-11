import { Button } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import axios from 'axios'

import { authDecorator, authServiceList } from '../../../../.storybook'
import { useArchivistApi } from '../../../archivist-api'
import { AuthServiceWrapper } from '../../../auth-service'
import { AuthErrorsWrapper } from './AuthErrorsWrapper'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
      },
    },
  },
  component: AuthErrorsWrapper,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthErrorsWrapper',
} as ComponentMeta<typeof AuthErrorsWrapper>

const Template: ComponentStory<typeof AuthErrorsWrapper> = (props) => {
  const create403 = () => {
    const request = axios.get('http://localhost:8081/archive/foo123890/block/recent/20')
    request.then().catch((error) => console.error(error))
  }

  const create401 = () => {
    const request = axios.post('http://localhost:8081/user/login', { email: 'none@none.com', password: 'wrong' })
    request.then().catch((error) => console.error(error))
  }

  return (
    <>
      <Button sx={{ marginBottom: '24px' }} variant="contained" onClick={() => create403()}>
        Trigger API Error - 403
      </Button>
      <Button variant="contained" onClick={() => create401()}>
        Trigger API Error - 401
      </Button>
      <AuthErrorsWrapper {...props}>
        <AuthServiceWrapper />
      </AuthErrorsWrapper>
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
