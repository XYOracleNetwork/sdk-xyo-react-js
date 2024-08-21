import React from 'react'
import type { DeclarationReflection, SignatureReflection } from 'typedoc'

import { ReflectionViewer } from './ReflectionViewer.tsx'
import type { ReflectionViewerProps } from './ReflectionViewerProps.tsx'

export const DeclarationReflectionViewer: React.FC<ReflectionViewerProps<DeclarationReflection>> = ({
  reflection, hiddenFlags, ...props
}) => {
  const safeSignatures = (signatures?: SignatureReflection[] | SignatureReflection) => {
    return (
      Array.isArray(signatures)
        ? signatures
        : signatures
          ? [signatures]
          : undefined
    )
  }

  return (
    <ReflectionViewer
      nameViewer={reflection.signatures || reflection.getSignature || reflection.setSignature ? null : undefined}
      title="DeclarationReflectionViewer"
      hiddenFlags={hiddenFlags}
      reflection={reflection}
      {...props}
    >
      {reflection.signatures?.map((signature) => {
        return <ReflectionViewer key={signature.id} hiddenFlags={hiddenFlags} reflection={signature} />
      })}
      {safeSignatures(reflection.getSignature)?.map((signature) => {
        return <ReflectionViewer marginX={1} key={signature.id} hiddenFlags={hiddenFlags} reflection={signature} />
      })}
      {safeSignatures(reflection.setSignature)?.map((signature) => {
        return <ReflectionViewer marginX={1} key={signature.id} hiddenFlags={hiddenFlags} reflection={signature} />
      })}
    </ReflectionViewer>
  )
}
