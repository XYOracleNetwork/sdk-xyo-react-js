import { Typography, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator } from '../.storybook'
import { AuthThemeExtender } from './AuthThemeExtender'

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

const Template: ComponentStory<typeof AuthThemeExtender> = ({ themeOptions }) => {
  const ChildComponent = () => {
    const theme = useTheme()
    console.log(theme)
    return (
      <>
        <Typography variant="h3">Should have marginBottom of {theme.spacing(4)}</Typography>
        <Typography variant="h4" color={theme.palette.primary.main}>
          Should have a color of {theme.palette.primary.main}
        </Typography>
        <Typography variant="h4" color={theme.palette.secondary.main}>
          Should have a color of {theme.palette.secondary.main}
        </Typography>
      </>
    )
  }
  return (
    <AuthThemeExtender themeOptions={themeOptions}>
      <ChildComponent />
    </AuthThemeExtender>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

const WithExitingTheme = Template.bind({})
WithExitingTheme.args = {
  themeOptions: {
    palette: {
      primary: {
        main: '#485c76',
      },
      secondary: {
        main: '#8f91c7',
      },
    },
  },
}
WithExitingTheme.decorators = [authDecorator]

export { Default, WithExitingTheme }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
