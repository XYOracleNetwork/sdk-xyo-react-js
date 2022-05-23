import { Box, Paper } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol, FlexGrowCol } from '@xylabs/sdk-react'
import { useRef } from 'react'

import { Footer } from '../components'
import { useFooterOffsetResizer } from './useFooterOffsetResizer'

const FooterOffsetResizer = () => {
  const targetElementRef = useRef<HTMLDivElement>()

  useFooterOffsetResizer({ targetElementRef })

  return (
    <>
      <FlexGrowCol minHeight="97vh">
        <Box display="flex" flexDirection="column" alignItems="stretch" flexGrow="1" pt={1} px={1} width="100%" ref={targetElementRef}>
          <FlexGrowCol justifyContent="end">I am visible after resize and padding bottom is updated</FlexGrowCol>
        </Box>
      </FlexGrowCol>

      <FlexCol position="fixed" bottom={0} left={0} right={0} alignItems="stretch">
        <Paper elevation={8}>
          <Footer dynamicHeight width="100%" />
        </Paper>
      </FlexCol>
    </>
  )
}

const StorybookEntry: Meta = {
  argTypes: {},
  component: FooterOffsetResizer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'hooks/FooterOffsetResizer',
}

const Template: ComponentStory<typeof FooterOffsetResizer> = () => {
  return <FooterOffsetResizer />
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
