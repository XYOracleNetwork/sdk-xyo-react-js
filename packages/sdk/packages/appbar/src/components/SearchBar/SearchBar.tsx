import { Search as SearchIcon } from '@mui/icons-material'
import { Paper, TextField } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

export interface SearchBarProps extends FlexBoxProps {
  onSearch?: (term?: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ defaultValue, onSearch, ...props }) => {
  const [term, setTerm] = useState<string>()

  return (
    <FlexRow alignItems="stretch" {...props}>
      <Paper variant="elevation" elevation={0} style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        <TextField
          InputProps={{ color: 'secondary', style: { borderBottomRightRadius: 0, borderTopRightRadius: 0, borderWidth: 0 } }}
          variant="outlined"
          size="small"
          defaultValue={defaultValue}
          fullWidth
          onChange={event => setTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onSearch?.(term)
          }}
        />
        <ButtonEx variant="contained" style={{ borderRadius: 0, borderTopLeftRadius: 0 }} color="secondary" onClick={() => onSearch?.(term)}>
          <SearchIcon />
        </ButtonEx>
      </Paper>
    </FlexRow>
  )
}
