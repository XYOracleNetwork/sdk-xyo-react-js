import { InvertableThemeProvider } from '@xylabs/react-invertable-theme'
import { FlexCol } from '@xylabs/react-flexbox'
import { CssBaseline } from '@mui/material';
// import { useDarkMode } from 'storybook-dark-mode';
import { partialDarkThemeOptions, partialAppLightThemeOptions, themeOptions, appThemeOptions, webThemeOptions } from '@xyo-network/react-theme'
import { AppSettingsProvider } from '@xyo-network/react-app-settings'
import React from 'react';
import { DecoratorFn } from '@storybook/react';

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

const withThemeProvider: DecoratorFn = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', '')

  // Bring back once dark mode is upgraded to 7.0 compatibility
  // const darkMode = useDarkMode()
  const darkMode = true
  const themeOptions = getTheme(context.globals.theme)

  return (
    <AppSettingsProvider value={{darkMode}}>
    <InvertableThemeProvider dark={darkMode} lightOptions={partialAppLightThemeOptions} darkTheme={partialDarkThemeOptions} options={themeOptions}>
      <CssBaseline enableColorScheme />
      <FlexCol alignItems="unset">
        <Story {...context}/>
      </FlexCol>
    </InvertableThemeProvider>
    </AppSettingsProvider>
  );
};

export const decorators = [withThemeProvider];