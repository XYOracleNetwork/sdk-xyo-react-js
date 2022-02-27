import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
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
      defaultValue: 'http://localhost:8081',
    },
  },
  component: JsonRouteWrapper,
  decorators: [JsonDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Json/JsonRouteWrapper',
} as ComponentMeta<typeof JsonRouteWrapper>

const Template: ComponentStory<typeof JsonRouteWrapper> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeJson = searchParams.get('json')
  return (
    <FlexCol>
      <ButtonEx
        marginY={3}
        onClick={() => setSearchParams({ json: activeJson === 'true' ? '' : 'true' })}
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
  callback: () => new XyoArchivistApi({ apiDomain: 'http://localhost:8081', archive: 'temp' }).getBoundWitnessStats(),
}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
