import { Avatar, AvatarGroup, AvatarGroupProps } from '@mui/material'
import { usePayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin-resolver'
import { useCallback } from 'react'

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
        <Avatar key={index + schema} title={schema}>
          {schema[0]}
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
