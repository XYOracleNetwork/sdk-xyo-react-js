import { FlexGrowRow } from '@xylabs/sdk-react'
import { ThemeProvider, createTheme } from '@mui/material';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { theme } from './theme'

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

const defaultTheme = createTheme(theme)

const withThemeProvider = (Story, context) => {
  // Clear the auth state with each story
  localStorage.setItem('AuthState', null)
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
      <FlexGrowRow>
        <Story {...context}/>
      </FlexGrowRow>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];