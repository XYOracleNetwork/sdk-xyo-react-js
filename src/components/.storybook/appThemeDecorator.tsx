import { createTheme, useTheme, ThemeProvider } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { appTheme } from '../../theme'

const appThemeDecorator: DecoratorFn = (Story, { args }) => {
  const currentTheme = useTheme()
  const theme = createTheme(currentTheme, appTheme)
  return (
    <ThemeProvider theme={theme}>
      <Story {...args } />
    </ThemeProvider>
  )
}

export { appThemeDecorator }