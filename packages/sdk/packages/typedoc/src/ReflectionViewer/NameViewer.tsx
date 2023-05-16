import { Chip, Stack, Typography, TypographyVariant } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import { ReflectionKind } from 'typedoc'

import { JsonViewerButton } from '../JsonViewerButton'
import { SomeReflection } from '../SomeReflection'
import { trimFlagLabel } from '../trimFlagLabel'
import { ReflectionViewerProps } from './ReflectionViewerProps'
import { SomeTypeViewer } from './SomeTypeViewer'

export interface NameViewerProps extends FlexBoxProps {
  reflection: SomeReflection
  reflectionViewer: React.FC<ReflectionViewerProps>
  variant?: TypographyVariant
}

export const NameViewer: React.FC<NameViewerProps> = ({ reflectionViewer, variant, reflection, ...props }) => {
  return (
    <FlexRow justifyContent="flex-start" {...props}>
      <FlexRow marginRight={1}>
        <Typography variant={variant} noWrap>
          {reflection.name}
          {reflection.type ? <>:&nbsp;</> : null}
        </Typography>
        <SomeTypeViewer reflection={reflection} reflectionViewer={reflectionViewer} />
      </FlexRow>
      <Stack direction="row" spacing={1}>
        <Chip size="small" label={ReflectionKind.singularString(reflection.kind)} />
        {reflection.flags
          ? Object.entries(reflection.flags).map(([flag, value]) => {
              return value ? <Chip size="small" key={flag} label={trimFlagLabel(flag)} variant="outlined" /> : null
            })
          : null}
      </Stack>
      {document && document?.location.hostname === 'localhost' && (
        <JsonViewerButton jsonViewProps={{ collapsed: 1 }} size="small" variant="contained" padding={0} marginX={1} src={reflection} />
      )}
    </FlexRow>
  )
}
