import { CardContent, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { WithRefDecorator } from '@xyo-network/react-storybook'
import React, { useState } from 'react'

import { PageCard } from './PageCard.tsx'

const StorybookEntry: Meta = {
  argTypes: { onRefresh: { table: { disable: true } } },
  component: PageCard,
  parameters: { docs: { page: null } },
  title: 'shared/PageCard',
}

const Template: StoryFn<typeof PageCard> = (props) => {
  const [refreshedValue, setRefreshedValue] = useState<number>(Math.random)
  return (
    <PageCard title="Page Card" subheader="subheader" onRefresh={() => setRefreshedValue(Math.random())} {...props}>
      <CardContent>
        <Typography variant="body1">Page Card Content</Typography>
        <Typography variant="body1">
          Refreshed Value:
          {refreshedValue?.toString()}
        </Typography>
      </CardContent>
    </PageCard>
  )
}

const TemplateWithNoOnRefresh: StoryFn<typeof PageCard> = (props) => {
  return (
    <PageCard title="Page Card" subheader="subheader" {...props}>
      <CardContent>
        <Typography variant="body1">Page Card Content</Typography>
      </CardContent>
    </PageCard>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.parameters = { actions: { argTypesRegex: '' } }

const WithNoOnRefresh = TemplateWithNoOnRefresh.bind({})
WithNoOnRefresh.args = {}
WithNoOnRefresh.parameters = { actions: { argTypesRegex: '' } }

const WithRef = Template.bind({})
WithRef.decorators = [WithRefDecorator]

export {
  Default, WithNoOnRefresh, WithRef,
}

export default StorybookEntry
