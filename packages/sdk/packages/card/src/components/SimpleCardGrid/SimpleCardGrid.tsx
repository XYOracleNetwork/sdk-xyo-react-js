import { Grid, GridProps } from '@mui/material'

import { SimpleCard, SimpleCardProps } from '../SimpleCard/index.js'

export interface SimpleCardGridProps extends GridProps {
  cards?: SimpleCardProps[]
}

export const SimpleCardGrid: React.FC<SimpleCardGridProps> = ({ cards, ...props }) => {
  return (
    <Grid container {...props}>
      {cards?.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <SimpleCard {...card} sx={{ flexDirection: 'column', height: '100%' }} />
        </Grid>
      ))}
    </Grid>
  )
}
