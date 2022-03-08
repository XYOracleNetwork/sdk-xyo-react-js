import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { authDecorator, authServiceList } from '../../.storybook'
import { useArchivistApi } from '../../contexts'
import { AxiosErrorHandler } from './AxiosErrorHandler'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
        jwtToken: 'badToken',
        loggedInAccount: 'none@none.com',
      },
    },
  },
  component: AxiosErrorHandler,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AxiosErrorHandler',
} as ComponentMeta<typeof AxiosErrorHandler>

const Template: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [apiError, setApiError] = useState<AxiosError>()
  const { api } = useArchivistApi()

  useAsyncEffect(async () => {
    try {
      await api?.getBoundWitnessStats()
      setApiError(undefined)
    } catch (error) {
      setApiError(error as AxiosError)
    }
  }, [api])

  return (
    <>
      <AxiosErrorHandler apiError={apiError}>
        <p>I should only be visible when there is no error</p>
      </AxiosErrorHandler>
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
