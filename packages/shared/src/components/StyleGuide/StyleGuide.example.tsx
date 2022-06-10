import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'

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
