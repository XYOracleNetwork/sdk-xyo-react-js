import { ExpandMoreRounded } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, alpha, Typography, useTheme } from '@mui/material'
import { Override } from '@xylabs/sdk-js'
import { ButtonEx, useMediaQuery } from '@xylabs/sdk-react'
import { Key, ReactNode } from 'react'
import { To } from 'react-router-dom'

interface SimpleAccordionCardAdditionalProps extends AccordionProps {
  name: ReactNode
  desc?: string
  href?: string
  to?: To
  linkText?: string
  expandedKey?: Key
  dark?: boolean
  onChangeExpandKey?: (expanded: Key | null) => void
}

interface OptionalChildren {
  children?: ReactNode
}

//this makes the requirement for children from AccordionProps go away
export type SimpleAccordionCardProps = Override<SimpleAccordionCardAdditionalProps, OptionalChildren>

export const SimpleAccordionCard: React.FC<SimpleAccordionCardProps> = ({ name, desc, linkText, to, href, key, expandedKey, dark = false, onChangeExpandKey, ...props }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    onChangeExpandKey?.(isExpanded ? key ?? null : null)
  }

  return (
    <Accordion
      expanded={expandedKey === key}
      onChange={handleChange}
      elevation={0}
      style={{
        backgroundColor: dark ? undefined : alpha(theme.palette.primary.light, 0.05),
      }}
      {...props}
    >
      <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography fontWeight={700} variant="h6" textAlign="left" gutterBottom={isMobile ? true : false}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" fontWeight={400} textAlign="left">
          {desc}
        </Typography>
        <ButtonEx href={href} to={to}>
          {linkText ?? 'Learn More'}
        </ButtonEx>
      </AccordionDetails>
    </Accordion>
  )
}
