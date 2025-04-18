import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'
import type { ReflectionFlags } from 'typedoc'

import { CommentViewer } from '../CommentViewer.tsx'
import type { SomeReflection } from '../SomeReflection.ts'
import { NameViewer } from './NameViewer.tsx'
import type { FlagFilter, ReflectionViewerProps } from './ReflectionViewerProps.tsx'

const hide = (flags?: ReflectionFlags, hiddenFlags: FlagFilter[] = []) => {
  let hide = false
  for (const hiddenFlag of hiddenFlags) {
    if (flags?.[hiddenFlag]) {
      hide = true
    }
  }
  return hide
}

export const ReflectionViewer: React.FC<ReflectionViewerProps> = ({
  variant, nameViewer, children, reflection, hiddenFlags, ...props
}) => {
  const someReflection = reflection as SomeReflection

  return hide(reflection?.flags, hiddenFlags)
    ? null
    : (
        <FlexCol title="ReflectionViewer" alignItems="stretch" {...props}>
          {nameViewer === undefined
            ? <NameViewer marginY={0.25} variant={variant} reflection={someReflection} reflectionViewer={ReflectionViewer} />
            : nameViewer}
          {reflection.comment
            ? <CommentViewer comment={reflection.comment} />
            : null}
          {/* sources && reflection.sources && children ? (
        <>
          {reflection.sources.map((source, index) => {
            return <SourceViewer key={index} source={source} />
          })}
        </>
        ) : null */}
          {someReflection.parameters?.map((parameter) => {
            return <ReflectionViewer hiddenFlags={hiddenFlags} marginY={0.25} marginX={1} key={parameter.id} reflection={parameter} />
          }) ?? null}
          {children}
        </FlexCol>
      )
}
