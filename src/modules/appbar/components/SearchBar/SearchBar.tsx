import SearchIcon from '@mui/icons-material/Search'
import { Paper, TextField } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexRow } from '@xylabs/sdk-react'
import { useState } from 'react'

export interface SearchBarProps extends FlexBoxProps {
  onSearch?: (term?: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ defaultValue, onSearch, ...props }) => {
  const [term, setTerm] = useState<string>()

  return (
    <FlexRow alignItems="stretch" {...props}>
      <Paper style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <TextField
          InputProps={{ color: 'secondary', style: { borderBottomRightRadius: 0, borderTopRightRadius: 0, borderWidth: 0 } }}
          variant="outlined"
          size="small"
          defaultValue={defaultValue}
          fullWidth
          onChange={(event) => setTerm(event.target.value)}
          onKeyDown={(event) => {
            console.log(JSON.stringify(event.code, null, 2))
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
