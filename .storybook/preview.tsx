import type { Theme } from '@mui/material'
import {
  createTheme, CssBaseline,
  ThemeProvider, useColorScheme, useTheme
} from '@mui/material'
import type { Decorator } from '@storybook/react-vite'
import {
  DataismTheme, XyLabsTheme, XyosTheme, XyoTheme,
} from '@xylabs/react-theme'
import React, { useEffect, useLayoutEffect } from 'react'

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
  mode: {
    name: 'Color Mode',
    description: 'Global color mode for components',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light Mode' },
        { value: 'dark', icon: 'moon', title: 'Dark Mode' },
        { value: 'system', icon: 'circlehollow', title: 'System Mode' },
      ],
      default: 'light',
    },
  }
}

const getTheme = (themeName: ThemeName) => {
  const theme = useTheme()
  const themes: Record<ThemeName, Theme> = {
    'None': createTheme({
      colorSchemes: {
        dark: {},
        light: {},
      },
      cssVariables: { colorSchemeSelector: 'class' },
    }),
    XYO: XyoTheme(theme, false),
    xyOS: XyosTheme(),
    Dataism: DataismTheme(),
    XYLabs: XyLabsTheme(),
  }
  return themes[themeName] ?? {}
}

export const parameters = {
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

  const themeOptions = getTheme(context.globals.theme)
  const theme = themeOptions

  // SB does not adjust the background color based off the color scheme, so we need to do it manually
  useLayoutEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if (body) {
      body.style.backgroundColor = themeOptions.vars?.palette?.background?.paper || 'transparent'
    }
  }, [themeOptions])

  return (
    <ThemeProvider theme={theme} defaultMode={'dark'}>
      <CssBaseline enableColorScheme />
        <Story {...context} />
    </ThemeProvider>
  )
}

const withModeSelector: Decorator = (Story, context) => {
  const { mode } = context.globals
  const { setMode } = useColorScheme()

  useEffect(() => {
    setMode(mode)
  }, [mode])

  return <Story {...context} />
}

export const decorators = [withModeSelector, withThemeProvider]
