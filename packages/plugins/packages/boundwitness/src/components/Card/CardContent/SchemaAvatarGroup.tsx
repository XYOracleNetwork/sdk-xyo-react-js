import { Avatar, AvatarGroup, AvatarGroupProps } from '@mui/material'
import { XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { usePayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin-resolver'
import { useCallback } from 'react'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

interface SchemaAvatarGroupProps extends AvatarGroupProps {
  schemas?: string[]
  maxAvatars?: number
}

export const SchemaAvatarGroup: React.FC<SchemaAvatarGroupProps> = ({ schemas, maxAvatars = 4, ...props }) => {
  const { resolver } = usePayloadRenderPluginResolver()

  const resolveSchemaToIcon = useCallback(
    (schema: string, index: number) => {
      const SchemaAvatar = resolver?.resolve({ schema })?.components.avatar.image
      return SchemaAvatar ? (
        <SchemaAvatar key={index + schema} />
      ) : (
        <Avatar key={index + schema} title={schema} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          {schema === XyoBoundWitnessSchema ? <VscSymbolMethod /> : <VscSymbolNamespace />}
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
