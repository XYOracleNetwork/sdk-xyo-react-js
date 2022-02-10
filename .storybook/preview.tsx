import { FlexGrowRow } from '@xylabs/sdk-react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { useDarkMode } from 'storybook-dark-mode';
import { darkTheme, themeOptions } from '../src/theme'
import { clone } from 'lodash';

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

  const isDarkMode = useDarkMode()

  const clonedTheme = clone(themeOptions)

  const defaultTheme = createTheme(clonedTheme, isDarkMode ? {...darkTheme} : {})

  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <FlexGrowRow>
        <Story {...context}/>
      </FlexGrowRow>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];