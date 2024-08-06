import { CssBaseline } from '@mui/material';
import { Decorator } from '@storybook/react';
import { FlexCol } from '@xylabs/react-flexbox';
import { InvertibleCssVarsProvider, InvertibleThemeProvider } from '@xylabs/react-invertible-theme';
import { appThemeOptions, osThemeOptions, themeOptions, webThemeOptions } from '@xyo-network/react-theme';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

export const globalTypes = {
  theme: {
    name: 'ThemeOptions',
    description: 'Global theme for components',
    defaultValue: 'AppTheme',
    toolbar: {
      icon: 'eye',
      // Array of plain string values or MenuItem shape (see below)
      items: ['Theme', 'AppTheme', 'WebTheme', 'OsTheme'],
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
    OsTheme: osThemeOptions
  }
  return themes[themeName]
}

const withThemeProvider: Decorator = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', '')

  const darkMode = useDarkMode()
  const themeOptions = getTheme(context.globals.theme)

  return (
    <InvertibleThemeProvider dark={darkMode} options={themeOptions}>
      <InvertibleCssVarsProvider defaultMode={darkMode ? 'dark' : 'light'}>
        <CssBaseline enableColorScheme />
        <FlexCol alignItems="unset">
          <Story {...context}/>
        </FlexCol>
      </InvertibleCssVarsProvider>
    </InvertibleThemeProvider>
  );
};

export const decorators = [withThemeProvider];