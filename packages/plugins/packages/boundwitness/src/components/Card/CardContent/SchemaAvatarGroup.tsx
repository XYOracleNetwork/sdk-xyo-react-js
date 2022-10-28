import { Avatar, AvatarGroup, AvatarGroupProps } from '@mui/material'

interface SchemaAvatarGroupProps extends AvatarGroupProps {
  schemas?: string[]
  maxAvatars?: number
}

export const SchemaAvatarGroup: React.FC<SchemaAvatarGroupProps> = ({ schemas, maxAvatars = 4, ...props }) => {
  return (
    <AvatarGroup max={maxAvatars} total={schemas?.length} {...props}>
      {schemas?.map((schema, index) => (
        <Avatar key={index + schema} title={schema}>
          {schema[0]}
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
