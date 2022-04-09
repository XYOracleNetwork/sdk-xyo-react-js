import { FlexCol, InvertableThemeProvider } from '@xylabs/sdk-react'
import { CssBaseline } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';
import {partialDarkThemeOptions, themeOptions} from '../src/modules/theme'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withThemeProvider = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', null)

  const darkMode = useDarkMode()

  return (
    <InvertableThemeProvider dark={darkMode} darkTheme={partialDarkThemeOptions} options={themeOptions}>
      <CssBaseline enableColorScheme />
      <FlexCol alignItems="unset">
        <Story {...context}/>
      </FlexCol>
    </InvertableThemeProvider>
  );
};

export const decorators = [withThemeProvider];