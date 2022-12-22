/* eslint-disable import/no-internal-modules */
import { ComponentStory, Meta } from '@storybook/react'
import { AxiosError } from 'axios'

import { ResultLoader } from './ResultLoader'

const StorybookEntry: Meta = {
  argTypes: {},
  component: ResultLoader,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/ResultLoader',
}

const Template: ComponentStory<typeof ResultLoader> = (props) => {
  return <ResultLoader {...props} />
}

const Default = Template.bind({})
Default.args = {}

const NotFound = Template.bind({})
NotFound.args = { notFound: true }

const ApiError = Template.bind({})
ApiError.args = { apiError: new AxiosError(), children: <h1>Shown in case of error</h1> }

const SearchResult = Template.bind({})
SearchResult.args = { children: <h1>Shown when there is a valid result</h1>, searchResult: 'foo' }

export { ApiError, Default, NotFound, SearchResult }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
