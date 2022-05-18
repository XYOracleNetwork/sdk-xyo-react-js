import { createTheme, ThemeProvider, Typography } from '@mui/material'
import { FlexCol, InvertableThemeProvider } from '@xylabs/sdk-react'
import { useDarkMode } from 'storybook-dark-mode'

import { AppBarsExample } from './AppBars.example'
import { ButtonsExample } from './Buttons.example'
import { PapersExample } from './Papers.example'
import { TextsExample } from './Texts.example'

export const StyleGuideExample: React.FC = () => {
  return (
    <FlexCol alignItems="stretch">
      <Typography variant="h5">XYO Network Style Guide</Typography>
      <AppBarsExample />
      <ButtonsExample />
      <PapersExample />
      <TextsExample />
    </FlexCol>
  )
}
