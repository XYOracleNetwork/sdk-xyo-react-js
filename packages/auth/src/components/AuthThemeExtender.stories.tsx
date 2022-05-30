import { createTheme, MenuItem, Select, Typography, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator } from '../../../../.storybook'
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
  const value = 'test'
  return (
    <>
      <Typography variant="h3">marginBottom of {theme.spacing(4)}</Typography>
      <Typography variant="h4" color={theme.palette.primary.main}>
        Color: {theme.palette.primary.main}
      </Typography>
      <Typography variant="h4" color={theme.palette.secondary.main}>
        Color: {theme.palette.secondary.main}
      </Typography>

      <Select variant="outlined" value={value}>
        <MenuItem value={'test'}>Test</MenuItem>
        <MenuItem value={'temp'}>Temp</MenuItem>
        <MenuItem value={'coin-app'}>COIN App</MenuItem>
      </Select>
    </>
  )
}

const Template: ComponentStory<typeof AuthThemeExtender> = () => {
  return (
    <AuthThemeExtender>
      <ChildComponent />
    </AuthThemeExtender>
  )
}

const WithExistingThemeOptions: ComponentStory<typeof AuthThemeExtender> = ({ themeOptions }) => {
  const theme = useTheme()
  const updatedTheme = themeOptions ? createTheme(theme, themeOptions) : theme

  return (
    <AuthThemeExtender themeOptions={updatedTheme}>
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

const WithExitingTheme = WithExistingThemeOptions.bind({})
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
