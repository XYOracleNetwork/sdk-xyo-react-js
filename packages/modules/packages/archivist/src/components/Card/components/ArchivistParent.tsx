import { ListItem, Typography } from '@mui/material'

export interface ArchivistTypeProps {
  archivistType?: 'Commit' | 'Read' | 'Write'
  parentArchivists?: string[]
}

export const ArchivistParent: React.FC<ArchivistTypeProps> = ({ archivistType, parentArchivists }) => (
  <>
    {parentArchivists?.map((address) => {
      return (
        <ListItem key={address}>
          <Typography variant="subtitle2">
            {archivistType}
            :
            {' '}
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {address}
            </Typography>
          </Typography>
        </ListItem>
      )
    })}
  </>
)
