import { InvertibleThemeProvider } from '@xylabs/react-invertible-theme'
import { FlexCol } from '@xylabs/react-flexbox'
import { CssBaseline } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';
import { partialDarkThemeOptions, partialAppLightThemeOptions, themeOptions, appThemeOptions, webThemeOptions } from '@xyo-network/react-theme'
import { AppSettingsProvider } from '@xyo-network/react-app-settings'
import React from 'react';
import { Decorator } from '@storybook/react';

export const globalTypes = {
  theme: {
    name: 'ThemeOptions',
    description: 'Global theme for components',
    defaultValue: 'AppTheme',
    toolbar: {
      icon: 'eye',
      // Array of plain string values or MenuItem shape (see below)
      items: ['Theme', 'AppTheme', 'WebTheme'],
      // Property that specifies if the name of the item will be displayed
      title: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical'
    }
  }
}

const getTheme = (themeName) => {
  const themes = {
    Theme: themeOptions,
    AppTheme: appThemeOptions,
    WebTheme: webThemeOptions,
  }
  return themes[themeName]
}

const withThemeProvider: Decorator = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', '')

  const darkMode = useDarkMode()
  const themeOptions = getTheme(context.globals.theme)

  return (
    <AppSettingsProvider value={{darkMode}}>
    <InvertibleThemeProvider dark={darkMode} lightOptions={partialAppLightThemeOptions} darkTheme={partialDarkThemeOptions} options={themeOptions}>
      <CssBaseline enableColorScheme />
      <FlexCol alignItems="unset">
        <Story {...context}/>
      </FlexCol>
    </InvertibleThemeProvider>
    </AppSettingsProvider>
  );
};

export const decorators = [withThemeProvider];