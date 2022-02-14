import { Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles'
import { FlexCol } from '@xylabs/sdk-react'

import { themeOptions } from '../../theme'
import { AppBars } from './AppBars'
import { Buttons } from './Buttons'
import { Papers } from './Papers'
import { Texts } from './Texts'

export const StyleGuide: React.FC = () => {
  const theme = createTheme(themeOptions)
  console.log(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <FlexCol alignItems="stretch">
        <Typography variant="h5">XYO Network Style Guild</Typography>
        <AppBars />
        <Buttons />
        <Papers />
        <Texts />
      </FlexCol>
    </ThemeProvider>
  )
}
