import type { Theme } from '@mui/material'
import {
  Box, CssBaseline, ThemeProvider, useColorScheme, useTheme,
} from '@mui/material'
import type { Decorator } from '@storybook/react'
import {
  DataismTheme, XyLabsTheme, XyosTheme, XyoTheme,
} from '@xylabs/react-theme'
import React, { FC } from 'react'
import { useDarkMode } from 'storybook-dark-mode'

const themeNames = ['None', 'XYO', 'Dataism', 'XYLabs', 'xyOS'] as const
type ThemeName = typeof themeNames[number]

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

const getTheme = (themeName: ThemeName) => {
  const theme = useTheme()
  const themes: Record<ThemeName, Theme> = {
    None: theme,
    XYO: XyoTheme(theme, false),
    xyOS: XyosTheme(),
    Dataism: DataismTheme(),
    XYLabs: XyLabsTheme(),
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
  const theme = themeOptions

  const Inner = () => {
    const {mode, setMode} = useColorScheme()
    if (darkMode && (mode !== 'dark')) {
      setMode('dark')
    }
    if (!darkMode && (mode !== 'light')) {
      setMode('light')
    }
    return <Box>
      <Story {...context} />
    </Box>
  }

  return (
    <ThemeProvider theme={theme} defaultMode={darkMode ? 'dark' : 'light'}>
      <Inner/>
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]
