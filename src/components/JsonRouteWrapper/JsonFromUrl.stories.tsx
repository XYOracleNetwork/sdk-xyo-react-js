/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { JsonFromUrl } from './JsonFromUrl'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      defaultValue: 'http://localhost:8081',
    },
  },
  component: JsonFromUrl,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Json/JsonFromUrl',
} as ComponentMeta<typeof JsonFromUrl>

const Template: ComponentStory<typeof JsonFromUrl> = (props) => {
  return (
    <BrowserRouter>
      <FlexCol>
        <JsonFromUrl {...props}></JsonFromUrl>
      </FlexCol>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = { pathname: '/stats' }

const CustomTheme = Template.bind({})
CustomTheme.args = { pathname: '/stats', theme: 'apathy:inverted' }

const ErrorState = Template.bind({})
ErrorState.args = { pathname: '/foo' }

export { CustomTheme, Default, ErrorState }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
