import { FlexCol } from '@xylabs/react-flexbox'
import type { ReflectionFlags } from 'typedoc'

import { CommentViewer } from '../CommentViewer.js'
import { SomeReflection } from '../SomeReflection.js'
import { NameViewer } from './NameViewer.js'
import { FlagFilter, ReflectionViewerProps } from './ReflectionViewerProps.js'

const hide = (flags?: ReflectionFlags, hiddenFlags: FlagFilter[] = []) => {
  let hide = false
  hiddenFlags.map((hiddenFlag) => {
    if (flags?.[hiddenFlag]) {
      hide = true
    }
  })
  return hide
}

export const ReflectionViewer: React.FC<ReflectionViewerProps> = ({ variant, nameViewer, children, reflection, hiddenFlags, ...props }) => {
  const someReflection = reflection as SomeReflection

  return hide(reflection?.flags, hiddenFlags) ? null : (
      <FlexCol title="ReflectionViewer" alignItems="stretch" {...props}>
        {nameViewer === undefined ?
          <NameViewer marginY={0.25} variant={variant} reflection={someReflection} reflectionViewer={ReflectionViewer} />
        : nameViewer}
        {reflection.comment ?
          <CommentViewer comment={reflection.comment} />
        : null}
        {/*sources && reflection.sources && children ? (
        <>
          {reflection.sources.map((source, index) => {
            return <SourceViewer key={index} source={source} />
          })}
        </>
        ) : null*/}
        {someReflection.parameters?.map((parameter) => {
          return <ReflectionViewer hiddenFlags={hiddenFlags} marginY={0.25} marginX={1} key={parameter.id} reflection={parameter} />
        }) ?? null}
        {children}
      </FlexCol>
    )
}
