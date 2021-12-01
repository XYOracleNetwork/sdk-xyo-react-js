/* eslint-disable @delagen/deprecation/deprecation */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FlexCol } from './FlexCol'
import { FlexRow } from './FlexRow'

const StorybookEntry = {
  argTypes: {},
  component: FlexRow,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'FlexRow',
} as ComponentMeta<typeof FlexRow>

const Template: ComponentStory<typeof FlexRow> = (args) => <FlexRow {...args}></FlexRow>

const testColumns = {
  border: 'solid 1px gray',
  children: (
    <>
      <FlexCol margin={1} padding={1} bgcolor="gray">
        Column One
      </FlexCol>
      <FlexCol margin={1} padding={1} bgcolor="gray">
        Column Two
      </FlexCol>
      <FlexCol margin={1} padding={1} bgcolor="gray">
        Column Three
      </FlexCol>
    </>
  ),
}

const SpaceBetweenJustifiedContent = Template.bind({})
SpaceBetweenJustifiedContent.args = {
  ...testColumns,
  justifyContent: 'space-between',
  title: 'SpaceBetweenJustifiedContent',
}

const SpaceAroundJustifiedContent = Template.bind({})
SpaceAroundJustifiedContent.args = {
  ...testColumns,
  justifyContent: 'space-around',
  title: 'SpaceAroundJustifiedContent',
}

const SpaceEvenlyJustifiedContent = Template.bind({})
SpaceEvenlyJustifiedContent.args = {
  ...testColumns,
  justifyContent: 'space-evenly',
  title: 'SpaceEvenlyJustifiedContent',
}

const FlexStartJustifiedContent = Template.bind({})
FlexStartJustifiedContent.args = {
  ...testColumns,
  justifyContent: 'flex-start',
  title: 'FlexStartJustifiedContent',
}

const FlexEndJustifiedContent = Template.bind({})
FlexEndJustifiedContent.args = {
  ...testColumns,
  justifyContent: 'flex-end',
  title: 'FlexEndJustifiedContent',
}

export {
  FlexEndJustifiedContent,
  FlexStartJustifiedContent,
  SpaceAroundJustifiedContent,
  SpaceBetweenJustifiedContent,
  SpaceEvenlyJustifiedContent,
}

export default StorybookEntry
