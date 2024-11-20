import {
  Box, createTheme, CssBaseline, useTheme,
} from '@mui/material'
import type { Decorator } from '@storybook/react'
import { InvertibleMuiThemeProvider } from '@xylabs/react-invertible-theme'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'

import {
  DataismTheme, XyLabsTheme, XYOWebsiteTheme,
} from './Theme'

const themeNames = ['None', 'XYO Website', 'Dataism', 'XY Labs Website']

export const globalTypes = {
  theme: {
    name: 'ThemeOptions',
    description: 'Global theme for components',
    toolbar: {
      default: 'XYO Website',
      icon: 'eye',
      // Array of plain string values or MenuItem shape (see below)
      items: themeNames,
      // Property that specifies if the name of the item will be displayed
      title: 'None',
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
}

const getTheme = (themeName) => {
  const theme = useTheme()
  const themes = {
    'None': theme,
    'XYO Website': XYOWebsiteTheme(theme, false),
    'Dataism': DataismTheme,
    'XY Labs Website': XyLabsTheme,
  }
  return themes[themeName] ?? {}
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: { storySort: { method: 'alphabetical' } },
}

const withThemeProvider: Decorator = (Story, context) => {
  if (typeof context.globals.theme !== 'string') {
    context.globals.theme = 'None'
  }

  const darkMode = useDarkMode()
  const themeOptions = getTheme(context.globals.theme)
  const theme = createTheme(themeOptions)

  return (
    <InvertibleMuiThemeProvider theme={theme} defaultMode={darkMode ? 'dark' : 'light'}>
      <CssBaseline enableColorScheme />
      <Box>
        <Story {...context} />
      </Box>
    </InvertibleMuiThemeProvider>
  )
}

export const decorators = [withThemeProvider]
