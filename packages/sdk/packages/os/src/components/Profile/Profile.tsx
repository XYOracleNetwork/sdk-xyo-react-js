import { Avatar, Divider, Paper, PaperProps, Typography, useTheme } from '@mui/material'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { format, subHours } from 'date-fns'

import { StatsModal } from './StatsModal.js'
export interface XyOsProfileProps extends PaperProps {
  pfp: string
  xns: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const XyOsProfile: React.FC<XyOsProfileProps> = ({ xns, pfp, ...props }) => {
  const theme = useTheme()
  return (
    <FlexGrowCol gap={1} alignItems="flex-start">
      <FlexGrowRow gap={1}>
        <Avatar alt={xns} src={'https://arietrouw.com/assets/img/arie.jpg'} sx={{ height: 100, width: 100 }} />
        <FlexGrowCol width="100%" alignItems={'flex-start'}>
          <Typography variant="h5">{xns}</Typography>
          <Typography variant="subtitle2">Last Active: {format(subHours(Date.now(), 4), 'pp')}</Typography>
        </FlexGrowCol>
      </FlexGrowRow>
      <Paper sx={{ padding: 1 }}>
        <FlexGrowRow paddingBottom={1} width="100%" alignItems="center" justifyContent="space-between">
          <Typography variant="body1" fontWeight={'medium'}>
            2024 Stats
          </Typography>
          <StatsModal />
        </FlexGrowRow>
        <FlexGrowRow justifyContent="flex-start" width="100%" gap={1}>
          <FlexGrowCol alignItems={'flex-start'}>
            <Typography variant="h5">3,921</Typography>
            <Typography variant="body2">Bound Witnesses</Typography>
          </FlexGrowCol>
          <Divider flexItem orientation="vertical"></Divider>
          <FlexGrowCol alignItems={'flex-start'}>
            <Typography variant="h5">30</Typography>
            <Typography variant="body2">Connected Bridges</Typography>
          </FlexGrowCol>
          <Divider flexItem orientation="vertical"></Divider>
          <FlexGrowCol alignItems={'flex-start'}>
            <Typography variant="h5">3,921</Typography>
            <Typography variant="body2">Bound Witnesses</Typography>
          </FlexGrowCol>
        </FlexGrowRow>
      </Paper>
      <Paper sx={{ padding: 1 }}>
        <Typography paddingBottom={1} variant="h6">
          Badges
        </Typography>
        <FlexGrowRow justifyContent="flex-start" width="100%" gap={1}>
          <Avatar sx={{ color: theme.palette.primary.main, height: 50, width: 50 }}></Avatar>
          <Avatar sx={{ color: theme.palette.primary.main, height: 50, width: 50 }}></Avatar>
          <Avatar sx={{ color: theme.palette.primary.main, height: 50, width: 50 }}></Avatar>
        </FlexGrowRow>
      </Paper>
    </FlexGrowCol>
  )
}
