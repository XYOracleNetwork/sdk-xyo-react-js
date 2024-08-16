import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { LoadResult } from './LoadResult.tsx'

const StorybookEntry: Meta = {
  argTypes: {},
  component: LoadResult,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/LoadResult',
}

const Template: StoryFn<typeof LoadResult> = (props) => {
  return <LoadResult {...props} />
}

const Default = Template.bind({})
Default.args = {}

const NotFound = Template.bind({})
NotFound.args = { notFound: true }

const ApiError = Template.bind({})
ApiError.args = { children: <h1>Shown in case of error</h1>, error: true }

const SearchResult = Template.bind({})
SearchResult.args = { children: <h1>Shown when there is a valid result</h1>, searchResult: 'foo' }

export { ApiError, Default, NotFound, SearchResult }

export default StorybookEntry
