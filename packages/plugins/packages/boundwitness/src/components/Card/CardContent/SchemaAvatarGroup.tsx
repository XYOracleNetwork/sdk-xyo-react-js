import type { AvatarGroupProps } from '@mui/material'
import { Avatar, AvatarGroup } from '@mui/material'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { usePayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin-resolver'
import React, { useCallback } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

interface SchemaAvatarGroupProps extends AvatarGroupProps {
  maxAvatars?: number
  schemas?: string[]
}

export const SchemaAvatarGroup: React.FC<SchemaAvatarGroupProps> = ({ schemas, maxAvatars = 4, ...props }) => {
  const { resolver } = usePayloadRenderPluginResolver()

  const resolveSchemaToIcon = useCallback(
    (schema: string, index: number) => {
      const SchemaAvatar = resolver?.resolve({ schema })?.components.avatar.image
      return SchemaAvatar
        ? <SchemaAvatar key={index + schema} />
        : (
            <Avatar key={index + schema} title={schema} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              {schema === BoundWitnessSchema
                ? <VscSymbolMethod />
                : <VscSymbolNamespace />}
            </Avatar>
          )
    },
    [resolver],
  )

  return (
    <AvatarGroup max={maxAvatars} total={schemas?.length} {...props}>
      {schemas?.map((schema, index) => resolveSchemaToIcon(schema, index))}
    </AvatarGroup>
  )
}
