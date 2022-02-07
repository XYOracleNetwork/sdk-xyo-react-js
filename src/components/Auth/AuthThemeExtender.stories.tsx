import { Typography, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator } from '../.storybook'
import { AuthThemeExtender } from './AuthThemeExtender'

const customPrimary = '#485c76'
const customSecondary = '#8f91c7'

const StorybookEntry = {
  argTypes: {
    themeOptions: {
      control: { type: 'object' },
      description: 'Material UI ThemeOptions object',
    },
  },
  component: AuthThemeExtender,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthThemeExtender',
} as ComponentMeta<typeof AuthThemeExtender>

const ChildComponent = () => {
  const theme = useTheme()
  return (
    <>
      <Typography variant="h3">marginBottom of {theme.spacing(4)}</Typography>
      <Typography variant="h4" color={theme.palette.primary.main}>
        Color: {theme.palette.primary.main}
      </Typography>
      <Typography variant="h4" color={theme.palette.secondary.main}>
        Color: {theme.palette.secondary.main}
      </Typography>
    </>
  )
}

const Template: ComponentStory<typeof AuthThemeExtender> = () => (
  <AuthThemeExtender>
    <ChildComponent />
  </AuthThemeExtender>
)

const WithExistingThemeTemplate: ComponentStory<typeof AuthThemeExtender> = ({ themeOptions }) => {
  return (
    <AuthThemeExtender themeOptions={themeOptions}>
      <p>Expected Primary Color: {customPrimary}</p>
      <p>Expected Secondary Color: {customSecondary}</p>
      <p>Expected marginBottom: 32px</p>
      <ChildComponent />
    </AuthThemeExtender>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

const WithExitingTheme = WithExistingThemeTemplate.bind({})
WithExitingTheme.args = {
  themeOptions: {
    palette: {
      primary: {
        main: customPrimary,
      },
      secondary: {
        main: customSecondary,
      },
    },
  },
}
WithExitingTheme.decorators = [authDecorator]

export { Default, WithExitingTheme }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
