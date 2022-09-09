import { ComponentStory, Meta } from '@storybook/react'

import { betaApiDomain, defaultAuthSets } from './authSetsData.stories'
import { ManageAuthSetsList, ManageAuthSetsListProps } from './ManageAuthSetsList'

// eslint-disable-next-line import/no-default-export
export default {
  component: ManageAuthSetsList,
  title: 'authSets/ManageAuthSetsList',
} as Meta

const Template: ComponentStory<React.FC<ManageAuthSetsListProps>> = (props) => {
  return <ManageAuthSetsList {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  activeAuthSet: defaultAuthSets.get(betaApiDomain)[0],
  authSets: defaultAuthSets,
  removeAuthSet: () => true,
}

export { Default, WithData }
