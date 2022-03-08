import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { AppSettingsProvider, ArchivistApiProvider, useAppSettings } from '../../../contexts'
import { ArchiveSelectEx } from './ArchiveSelectEx'

const StorybookEntry = {
  argTypes: {},
  component: ArchiveSelectEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ArchiveSelectEx',
} as ComponentMeta<typeof ArchiveSelectEx>

const Template: ComponentStory<typeof ArchiveSelectEx> = (args) => {
  const TemplateWithSettings: React.FC = () => {
    const { archive } = useAppSettings()
    return (
      <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network" archive={archive ?? 'temp'}>
        <BrowserRouter>
          <ArchiveSelectEx {...args}></ArchiveSelectEx>
        </BrowserRouter>
      </ArchivistApiProvider>
    )
  }

  return (
    <AppSettingsProvider value={{}}>
      <TemplateWithSettings />
    </AppSettingsProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
