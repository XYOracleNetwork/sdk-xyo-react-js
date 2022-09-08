import { ComponentStory, Meta } from '@storybook/react'

import { AuthSetsProvider, AuthSetsProviderProps, AuthSetsState } from '../contexts'
import { ManageAuthSetsList } from './ManageAuthSets'

const betaApiDomain = 'https://beta.api.archivist.xyo.network'
const defaultAuthSets: AuthSetsState['authSets'] = new Map()
defaultAuthSets.set(betaApiDomain, [
  {
    account: '0x123456780910',
    identifier: 'Kerplunk Archivist',
    issuer: betaApiDomain,
  },
])
defaultAuthSets.set('https://api.archivist.xyo.network', [
  {
    account: '0x123456780910',
    identifier: 'Main Archivist',
    issuer: 'https://api.archivist.xyo.network',
  },
])

// eslint-disable-next-line import/no-default-export
export default {
  component: ManageAuthSetsList,
  title: 'authSets/ManageAuthSetsList',
} as Meta

const Template: ComponentStory<React.FC<AuthSetsProviderProps>> = (props) => {
  return (
    <AuthSetsProvider {...props}>
      <ManageAuthSetsList />
    </AuthSetsProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  activeIssuer: betaApiDomain,
  defaultAuthSets,
  issuerMapping: { betaApiDomain: 'Kerplunk Archivist' },
}

export { Default, WithData }
