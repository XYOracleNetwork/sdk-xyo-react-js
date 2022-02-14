import { Paper, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'

const Papered = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  textAlign: 'center',
}))

const PaperedSecondary = styled(Papered)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
}))

export const PapersExample: React.FC = ({ ...props }) => {
  return (
    <FlexCol {...props}>
      <Typography variant="subtitle1">Paper</Typography>
      <FlexRow alignItems="stretch">
        {Array.from({ length: 5 }, () => undefined).map((_, index) => (
          <FlexCol key={`paper-${index}`} marginRight={2}>
            <Papered key={`paper-${index}`} square elevation={index * 2}>
              Elevation-{index * 3}
            </Papered>
          </FlexCol>
        ))}
        <PaperedSecondary>Secondary Background</PaperedSecondary>
      </FlexRow>
    </FlexCol>
  )
}
