import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FlexCol } from '@xylabs/sdk-react'
import { useDarkMode } from 'storybook-dark-mode'

import { SimpleCard } from '../SimpleCard'

export const colorfulGradientLightMode = makeStyles(() => ({
  background: {
    backgroundImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
  },
  border: {
    borderImage: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    borderImageSlice: 1,
    borderImageSource: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: '2px',
  },
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #e17751, #d84e7a, #5898dd, #8c8ee5)',
    display: 'inline-block',
  },
}))

export const colorfulGradientDarkMode = makeStyles(() => ({
  background: {
    backgroundImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
  },
  border: {
    borderImage: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
    borderImageSlice: 1,
    borderImageSource: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: '2px',
  },
  heading: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    background: '-webkit-linear-gradient(232deg, #F17938, #FF5BDC, #5898dd, #B2FFFD)',
    display: 'inline-block',
  },
}))

export const GradientTextExample: React.FC = () => {
  const darkMode = useDarkMode()
  const classes = darkMode ? colorfulGradientDarkMode() : colorfulGradientLightMode()
  return (
    <FlexCol alignItems="stretch">
      <Typography variant="h4" gutterBottom>
        XYO Network Gradient Text Options
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Highlight
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="h5" gutterBottom>
        Lorem ipsum dolor sit amet consectetur, <span className={classes.heading}>adipisicing elit.</span>
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Body Text
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="h5" gutterBottom className={classes.heading}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas, suscipit ea vel dicta quasi hic,
        deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Caption
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="caption" gutterBottom className={classes.heading}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas, suscipit ea vel dicta quasi hic,
        deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Card Border
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            className={classes.border}
            headline="Gradient Border Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            className={classes.border}
            headline="Gradient Border Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            className={classes.border}
            headline="Gradient Border Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
      </Grid>
    </FlexCol>
  )
}
