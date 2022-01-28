import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { BrowserRouter } from 'react-router-dom'

import { AuthApiLoader, AuthLoader, AuthServiceId } from '../../../contexts'
import { Web3Login } from './Web3Login'

const StorybookEntry = {
  argTypes: {},
  component: Web3Login,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/Web3Login',
} as ComponentMeta<typeof Web3Login>

const Template: ComponentStory<typeof Web3Login> = (args) => {
  const authServiceList = [
    {
      id: AuthServiceId.Web3Wallet,
      title: 'Web3 wallet',
    },
  ]
  const apiDomain = 'http://localhost:8080'
  console.log(XyoMetaMaskConnector)
  return (
    <BrowserRouter>
      <AuthLoader authServiceList={authServiceList}>
        <AuthApiLoader apiDomain={apiDomain}>
          <Web3Login {...args}></Web3Login>
        </AuthApiLoader>
      </AuthLoader>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
