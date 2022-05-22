import { Box, Typography } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { ButtonEx, FlexCol, FlexGrowCol } from '@xylabs/sdk-react'
import { useRef, useState } from 'react'

import { useFooterOffsetResizer } from './useFooterOffsetResizer'

const FooterOffsetResizer = () => {
  const [condition, setCondition] = useState(false)
  const footerHeight = '90px'

  const observedElementRef = useRef<HTMLDivElement>()
  const targetElementRef = useRef<HTMLDivElement>()

  useFooterOffsetResizer({ condition, observedElementRef, targetElementRef })

  return (
    <>
      <FlexGrowCol minHeight="97vh">
        <Box display="flex" flexDirection="column" alignItems="stretch" flexGrow="1" pt={1} px={1} width="100%" ref={targetElementRef}>
          <FlexCol>
            <ButtonEx
              marginBottom="12px"
              variant="contained"
              onClick={() =>
                setCondition((condition) => {
                  if (condition) {
                    if (targetElementRef.current) {
                      targetElementRef.current.style.paddingBottom = '0'
                    }
                  }
                  return !condition
                })
              }
            >
              Toggle resizing
            </ButtonEx>
            <Typography variant="body1">{condition ? 'Hidden content is visible!' : 'Content hidden behind footer'}</Typography>
          </FlexCol>
          <FlexGrowCol justifyContent="end">I am visible after resize and padding bottom is updated</FlexGrowCol>
        </Box>
      </FlexGrowCol>

      <footer>
        <Box position="fixed" bottom="0" left="0" right="0" ref={observedElementRef} width="100%" height={footerHeight} bgcolor="blue" color="white">
          Footer Content of {footerHeight}
        </Box>
      </footer>
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
