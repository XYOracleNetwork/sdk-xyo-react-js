/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { BrowserRouter } from 'react-router-dom'

import { DeprecateStory } from '../../../../../.storybook'
import { JsonFromUrl } from './JsonFromUrl'

const StorybookEntry: Meta = {
  args: {
    apiDomain: 'http://localhost:8081',
  },
  component: JsonFromUrl,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/JsonRouteWrapper/JsonFromUrl',
}

const Template: ComponentStory<typeof JsonFromUrl> = (props) => {
  return (
    <>
      <DeprecateStory />
      <BrowserRouter>
        <FlexCol>
          <JsonFromUrl {...props}></JsonFromUrl>
        </FlexCol>
      </BrowserRouter>
    </>
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
