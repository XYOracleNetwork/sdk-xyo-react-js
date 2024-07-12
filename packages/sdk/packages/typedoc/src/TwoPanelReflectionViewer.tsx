import { Search } from '@mui/icons-material'
import { TextField, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { useMemo, useState } from 'react'
import type { ReflectionGroup } from 'typedoc'

import { createLookup } from './createLookup.js'
import { ContainerReflectionViewerProps, ReflectionGroupViewer, ReflectionViewer } from './ReflectionViewer/index.js'
import { ReflectionTreeViewer } from './TreeViewer/index.js'

export const TwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps> = ({
  reflection,
  itemRenderer = ReflectionViewer,
  hiddenFlags,
  ...props
}) => {
  const lookup = useMemo(() => createLookup(reflection), [reflection])
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState<string>()
  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const reflectionGroups = useMemo(() => {
    return reflection.groups?.map((group: ReflectionGroup) => {
      return (
        <ReflectionGroupViewer
          autoScroll
          variant="h6"
          lookup={lookup}
          renderer={itemRenderer}
          key={group.title}
          group={group}
          reflection={reflection}
          alignItems="stretch"
          hiddenFlags={hiddenFlags}
        />
      )
    })
  }, [itemRenderer, lookup, reflection, hiddenFlags])

  const NavigationCol: React.FC<FlexBoxProps> = (props) => {
    return (
      <FlexCol {...props}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: <Search />,
          }}
          onChange={onSearchTermChange}
        />
        <FlexGrowCol marginTop={1} alignItems="stretch">
          <ReflectionTreeViewer
            justifyContent="flex-start"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="scroll"
            searchTerm={searchTerm}
            hiddenFlags={hiddenFlags}
            reflection={reflection}
            lookup={lookup}
            border={`1px solid ${theme.palette.grey['300']}`}
            borderRadius={1}
            paddingY={1}
          />
        </FlexGrowCol>
      </FlexCol>
    )
  }

  const DetailsCol: React.FC<FlexBoxProps> = (props) => {
    return (
      <FlexGrowCol {...props}>
        <FlexGrowCol alignItems="stretch">
          <FlexCol
            alignItems="stretch"
            justifyContent="flex-start"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="scroll"
            borderRadius={1}
            padding={1}
            border={`1px solid ${theme.palette.grey['300']}`}
          >
            {reflectionGroups}
          </FlexCol>
        </FlexGrowCol>
      </FlexGrowCol>
    )
  }

  return (
    <FlexRow alignItems="stretch" justifyContent="start" sx={{ overflowY: 'scroll' }} {...props}>
      <NavigationCol minWidth={320} alignItems="stretch" justifyContent="flex-start" overflow="hidden" />
      <DetailsCol marginLeft={1} alignItems="stretch" justifyContent="flex-start" overflow="hidden" />
    </FlexRow>
  )
}
