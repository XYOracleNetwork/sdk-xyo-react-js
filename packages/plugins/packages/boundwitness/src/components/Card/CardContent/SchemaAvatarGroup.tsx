import { Avatar, AvatarGroup, AvatarGroupProps } from '@mui/material'

interface SchemaAvatarGroupProps extends AvatarGroupProps {
  schemas?: string[]
}

export const SchemaAvatarGroup: React.FC<SchemaAvatarGroupProps> = ({ schemas, ...props }) => {
  return (
    <AvatarGroup max={5} total={schemas?.length} {...props}>
      {schemas?.map((schema, index) => (
        <Avatar key={index + schema} title={schema}>
          {schema[0]}
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
