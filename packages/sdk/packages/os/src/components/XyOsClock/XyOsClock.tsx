import { BoxProps, Paper, Typography } from '@mui/material'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { format } from 'date-fns'
import { ReactElement, useEffect, useState } from 'react'

interface ClockProps extends BoxProps {
  date: number
}

interface ComponentSizeProps {
  large: ReactElement<XyOsClockProps>
  medium: ReactElement<XyOsClockProps>
  small: ReactElement<XyOsClockProps>
}

interface ClockComponentsProps {
  components: ComponentSizeProps
  type: 'appbar' | 'widget'
}

export interface XyOsClockProps {
  clockSize: 'small' | 'medium' | 'large'
  clockType: 'appbar' | 'widget'
}

export const XyOsClock: React.FC<XyOsClockProps> = ({ clockType, clockSize, ...props }) => {
  const [date, setDate] = useState(Date.now())
  useEffect(() => {
    const timerHandler: TimerHandler = () => setDate(Date.now())
    const timer = setInterval(timerHandler, 500)
    return function cleanup() {
      clearInterval(timer)
    }
  }, [])
  const ClockComponents: ClockComponentsProps[] = [
    {
      components: {
        large: <LargeAppBarClock date={date} {...props} />,
        medium: <MediumAppBarClock date={date} {...props} />,
        small: <SmallAppBarClock date={date} {...props} />,
      },
      type: 'appbar',
    },
    {
      components: {
        large: <LargeWidgetClock date={date} {...props} />,
        medium: <MediumWidgetClock date={date} {...props} />,
        small: <SmallWidgetClock date={date} {...props} />,
      },
      type: 'widget',
    },
  ]
  return ClockComponents.find((component) => component.type === clockType)?.components[`${clockSize}`]
}

export const SmallAppBarClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <FlexGrowRow gap={1}>
      <Typography variant="body1">{format(date, 'E MMM dd')}</Typography>
      <Typography variant="body1">{format(date, 'p')}</Typography>
    </FlexGrowRow>
  )
}

export const MediumAppBarClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <FlexGrowRow gap={1}>
      <Typography variant="body1">{format(date, 'E MMM dd')}</Typography>
      <Typography variant="body1">{format(date, 'pp')}</Typography>
    </FlexGrowRow>
  )
}

export const LargeAppBarClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <FlexGrowRow gap={1}>
      <Typography variant="body1">{format(date, 'EEEE MMM dd, yyy')}</Typography>
      <Typography variant="body1">{format(date, 'ppp')}</Typography>
    </FlexGrowRow>
  )
}

export const SmallWidgetClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <Paper sx={{ padding: 1 }}>
      <FlexGrowCol>
        <Typography variant="h6">{format(date, 'p')}</Typography>
        <Typography variant="body2">{format(date, 'E MMM dd')}</Typography>
      </FlexGrowCol>
    </Paper>
  )
}

export const MediumWidgetClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <Paper sx={{ padding: 1 }}>
      <FlexGrowCol>
        <Typography variant="h6">{format(date, 'pp')}</Typography>
        <Typography variant="body2">{format(date, 'E MMM dd, yyyy')}</Typography>
      </FlexGrowCol>
    </Paper>
  )
}

export const LargeWidgetClock: React.FC<ClockProps> = ({ date }) => {
  return (
    <Paper sx={{ padding: 1 }}>
      <FlexGrowCol>
        <Typography variant="body2">{format(date, 'EEEE')}</Typography>
        <Typography variant="h5">{format(date, 'pp')}</Typography>
        <Typography variant="body1">{format(date, 'MMM dd, yyyy')}</Typography>
      </FlexGrowCol>
    </Paper>
  )
}
