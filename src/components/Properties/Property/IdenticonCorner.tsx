import { Paper, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/sdk-react'

export interface IdenticonCornerProps {
  value: string
}

const IdenticonCorner: React.FC<IdenticonCornerProps> = ({ value }) => {
  const theme = useTheme()
  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderLeft: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <Identicon size={25} value={value} />
    </Paper>
  )
}

export { IdenticonCorner }
