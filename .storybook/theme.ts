import { ThemeOptions } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const fontFamilyHeadings = ['Lexend Deca', 'Helvetica', 'sans-serif'].join(',')

export const fontFamilyPrimary = ['Nunito Sans', 'Helvetica', 'sans-serif'].join(',')

const fontFamily = {
  headings: fontFamilyHeadings,
  primary: fontFamilyPrimary,
}

const themeOptions: ThemeOptions = {
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            filter: 'brightness(75%)',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#485c76',
    },
    secondary: {
      main: '#8f91c7',
    },
  },
  typography: {
    caption: {
      fontFamily: fontFamily.headings,
    },
    fontFamily: fontFamily.primary,
    h1: {
      fontFamily: fontFamily.headings,
    },
    h2: {
      fontFamily: fontFamily.headings,
    },
    h3: {
      fontFamily: fontFamily.headings,
    },
    h4: {
      fontFamily: fontFamily.headings,
    },
    h5: {
      fontFamily: fontFamily.headings,
    },
    h6: {
      fontFamily: fontFamily.headings,
    },
    subtitle1: {
      opacity: '50%',
    },
    subtitle2: {
      opacity: '50%',
    },
  },
}

const theme = createTheme(themeOptions)

export { theme }
