import { Alert, AlertTitle, Divider, List, ListProps, Theme } from '@mui/material'
import { Fragment } from 'react'

import { AuthSetsState } from '../contexts'
import { AuthSetListItem } from './AuthSet'

export interface ManageAuthSetsListProps extends ListProps {
  activeAuthSet?: AuthSetsState['activeAuthSet']
  authSets?: AuthSetsState['authSets']
  reAuthIssuer?: string
  removeAuthSet?: AuthSetsState['removeAuthSet']
}

export const ManageAuthSetsList: React.FC<ManageAuthSetsListProps> = ({ authSets, activeAuthSet, removeAuthSet, reAuthIssuer, ...props }) => {
  if (!authSets || authSets.size === 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>No Active Logins</AlertTitle>
      </Alert>
    )
  } else {
    return (
      <List sx={{ bgcolor: 'background.paper', border: (theme: Theme) => `1px solid ${theme.palette.divider}` }} {...props}>
        {Array.from(authSets?.entries()).map(([key, value], index, arr) => {
          const { account, issuer, identifier } = value[0] ?? {}
          return (
            <Fragment key={key}>
              <AuthSetListItem
                alignItems="flex-start"
                account={account}
                issuer={issuer}
                identifier={identifier}
                active={value[0] === activeAuthSet}
                onRemove={() => removeAuthSet?.(issuer)}
                reAuth={!!(issuer && reAuthIssuer && issuer === reAuthIssuer)}
              />
              {index !== arr.length - 1 ? <Divider component="li" /> : null}
            </Fragment>
          )
        })}
      </List>
    )
  }
}
