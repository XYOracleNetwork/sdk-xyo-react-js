import { Typography } from '@mui/material'

export interface ValueProps {
  value?: string | number | boolean | null
  paddingFactor?: number
}

export const Value: React.FC<ValueProps> = ({ value, paddingFactor }) => {
  const customThemeProps = { clamped: 'true', paddingFactor }
  return (
    <>
      {value !== undefined ? (
        <Typography variant="caption" fontFamily="monospace" fontWeight="light" {...customThemeProps}>
          {value}
        </Typography>
      ) : null}
    </>
  )
}
