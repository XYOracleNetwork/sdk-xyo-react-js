import { FlexCol } from '@xylabs/sdk-react'
import { ReflectionFlags } from 'typedoc'

import { CommentViewer } from '../CommentViewer'
import { SomeReflection } from '../SomeReflection'
import { SourceViewer } from '../SourceViewer'
import { NameViewer } from './NameViewer'
import { FlagFilter, ReflectionViewerProps } from './ReflectionViewerProps'

const hide = (flags?: ReflectionFlags, hiddenFlags: FlagFilter[] = []) => {
  let hide = false
  hiddenFlags.map((hiddenFlag) => {
    if (flags?.[hiddenFlag]) {
      hide = true
    }
  })
  return hide
}

export const ReflectionViewer: React.FC<ReflectionViewerProps> = ({ variant, nameViewer, children, reflection, hiddenFlags, sources = false, ...props }) => {
  const someReflection = reflection as SomeReflection

  return hide(reflection?.flags, hiddenFlags) ? null : (
    <FlexCol title="ReflectionViewer" alignItems="stretch" {...props}>
      {nameViewer === undefined ? <NameViewer marginY={0.25} variant={variant} reflection={someReflection} reflectionViewer={ReflectionViewer} /> : nameViewer}
      {reflection.comment ? <CommentViewer comment={reflection.comment} /> : null}
      {sources && reflection.sources && children ? (
        <>
          {reflection.sources.map((source, index) => {
            return <SourceViewer key={index} source={source} />
          })}
        </>
      ) : null}
      {someReflection.parameters?.map((parameter) => {
        return <ReflectionViewer hiddenFlags={hiddenFlags} marginY={0.25} marginX={1} key={parameter.id} reflection={parameter} />
      }) ?? null}
      {children}
    </FlexCol>
  )
}
