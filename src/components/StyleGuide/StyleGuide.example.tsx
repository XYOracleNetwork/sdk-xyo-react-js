import { createTheme, ThemeProvider, Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'

import { themeOptions } from '../../theme'
import { AppBarsExample } from './AppBars.example'
import { ButtonsExample } from './Buttons.example'
import { PapersExample } from './Papers.example'
import { TextsExample } from './Texts.example'

export const StyleGuideExample: React.FC = () => {
  const theme = createTheme(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <FlexCol alignItems="stretch">
        <Typography variant="h5">XYO Network Style Guild</Typography>
        <AppBarsExample />
        <ButtonsExample />
        <PapersExample />
        <TextsExample />
      </FlexCol>
    </ThemeProvider>
  )
}
