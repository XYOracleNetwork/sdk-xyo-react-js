import { ListProps } from '@mui/material'

import { useAuthSets } from '../contexts'
import { ManageAuthSetsList } from './ManageAuthSetsList'

export const ManageAuthSetsDataList: React.FC<ListProps> = (props) => {
  const { authSets, activeAuthSet, removeAuthSet } = useAuthSets()
  return <ManageAuthSetsList authSets={authSets} activeAuthSet={activeAuthSet} removeAuthSet={removeAuthSet} {...props} />
}
