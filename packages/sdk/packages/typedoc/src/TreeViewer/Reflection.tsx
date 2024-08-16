import { Add, Remove } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { TreeItem, TreeView } from '@mui/x-tree-view'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { ContainerReflection, Reflection } from 'typedoc'

import type { ReflectionLookup } from '../ReflectionLookup.ts'
import type { FlagFilter } from '../ReflectionViewer/index.ts'

export interface ReflectionTreeViewerProps<T extends Reflection = ContainerReflection> extends FlexBoxProps {
  hiddenFlags?: FlagFilter[]
  lookup?: ReflectionLookup
  reflection: T
  searchTerm?: string
}

export const ReflectionTreeViewer: React.FC<ReflectionTreeViewerProps> = ({ lookup, reflection, searchTerm, ...props }) => {
  const navigate = useNavigate()
  return (
    <FlexCol alignItems="stretch" {...props}>
      {/* TODO - move this into a title component */}
      {/* {nameViewer === undefined ? <NameViewer variant={variant} reflection={reflection} /> : nameViewer} */}
      {/* {reflection.comment ? <CommentViewer comment={reflection.comment} /> : null} */}
      {/* {reflection.sources ? ( */}
      {/*  <> */}
      {/*    {reflection.sources.map((source, index) => { */}
      {/*      return <SourceViewer key={index} source={source} /> */}
      {/*    })} */}
      {/*  </> */}
      {/* ) : null} */}
      {/* TODO - when searching do not include categories that dont have children, pull maps out of view */}
      <TreeView
        aria-label="XYO SDK Documentation"
        defaultExpandIcon={<Add />}
        defaultCollapseIcon={<Remove />}
        defaultExpanded={reflection.groups ? [reflection.groups[0].title] : []}
      >
        {reflection.groups?.map((group, index) => (
          <TreeItem key={`primary-${index}`} nodeId={group.title} label={<Typography variant="h6">{group.title}</Typography>}>
            {group.children.map((child, jndex) => {
              const searchTermTrimmed = searchTerm?.trim().toLowerCase()
              const childReflection = typeof child === 'number' ? lookup?.[child as number] : child
              return childReflection && (!searchTermTrimmed || childReflection.name.toLowerCase().includes(searchTermTrimmed))
                ? (
                    <TreeItem
                      key={`secondary-${index}- ${jndex}`}
                      nodeId={`declaration-${childReflection?.id}`}
                      label={childReflection.name}
                      onClick={() => {
                        const hash = `#${childReflection.name}`
                        navigate({ hash })
                        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    />
                  )
                : null
            })}
          </TreeItem>
        ))}
      </TreeView>
    </FlexCol>
  )
}
