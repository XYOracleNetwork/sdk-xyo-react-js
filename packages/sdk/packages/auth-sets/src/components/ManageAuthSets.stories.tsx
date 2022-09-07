import { ComponentStory, Meta } from '@storybook/react'

import { AuthSetsProvider, AuthSetsProviderProps, AuthSetsState } from '../contexts'
import { ManageAuthSets } from './ManageAuthSets'

const defaultAuthSets: AuthSetsState['authSets'] = new Map()
defaultAuthSets.set('http://beta.api.archivist.xyo.network', [
  {
    account: '0x123456780910',
    issuer: 'http://beta.api.archivist.xyo.network',
  },
])
defaultAuthSets.set('http://api.archivist.xyo.network', [
  {
    account: '0x123456780910',
    issuer: 'http://api.archivist.xyo.network',
  },
])

// eslint-disable-next-line import/no-default-export
export default {
  component: ManageAuthSets,
  title: 'authSets/ManageAuthSets',
} as Meta

const Template: ComponentStory<React.FC<AuthSetsProviderProps>> = (props) => (
  <AuthSetsProvider {...props}>
    <ManageAuthSets />
  </AuthSetsProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  defaultAuthSets,
}

export { Default, WithData }
