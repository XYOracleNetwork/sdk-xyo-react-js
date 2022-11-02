import { lighten, useTheme } from '@mui/material'

import { useApi } from '../../contexts'

const useBuildHistoryData = () => {
  const { errorHistory, responseHistory, successHistory, failureHistory } = useApi()
  const theme = useTheme()

  const histories = [
    {
      bgColor: lighten(theme.palette.success.light, 0.85),
      callHistory: successHistory,
      heading: 'Successes',
    },
    {
      bgColor: lighten(theme.palette.error.light, 0.85),
      callHistory: failureHistory,
      heading: 'Failures',
    },
    {
      bgColor: lighten(theme.palette.error.light, 0.85),
      callHistory: errorHistory,
      heading: 'Errors',
    },
    {
      bgColor: lighten(theme.palette.info.light, 0.85),
      callHistory: responseHistory,
      heading: 'Responses',
    },
  ]

  return histories
}

export { useBuildHistoryData }
