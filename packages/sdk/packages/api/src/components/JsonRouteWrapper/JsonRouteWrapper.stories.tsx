import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoArchivistApi } from '@xyo-network/api'
import { BrowserRouter, useSearchParams } from 'react-router-dom'

import { JsonRouteWrapper } from './JsonRouteWrapper'

const JsonDecorator: DecoratorFn = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
)

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'https://beta.api.archivist.xyo.network',
    },
  },
  component: JsonRouteWrapper,
  decorators: [JsonDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/JsonRouteWrapper',
} as ComponentMeta<typeof JsonRouteWrapper>

const Template: ComponentStory<typeof JsonRouteWrapper> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeJson = searchParams.get('json')
  return (
    <FlexCol>
      <ButtonEx
        marginY={3}
        onClick={() => {
          activeJson === 'true' ? searchParams.delete('json') : searchParams.set('json', 'true')
          setSearchParams(searchParams)
        }}
        variant="outlined"
      >
        Toggle JSON Page
      </ButtonEx>
      <JsonRouteWrapper {...props}></JsonRouteWrapper>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {
  callback: () => new XyoArchivistApi({ apiDomain: 'https://beta.api.archivist.xyo.network' }).archive('temp').block.stats.get(),
}

const HideBackButton = Template.bind({})
HideBackButton.args = {
  callback: () =>
    new XyoArchivistApi({
      apiDomain: 'https://beta.api.archivist.xyo.network',
    })
      .archive('temp')
      .block.stats.get(),
  noBackButton: true,
}

export { Default, HideBackButton }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
