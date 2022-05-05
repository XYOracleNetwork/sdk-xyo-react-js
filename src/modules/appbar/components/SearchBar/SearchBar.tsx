import SearchIcon from '@mui/icons-material/Search'
import { Paper, TextField } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexRow } from '@xylabs/sdk-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props extends FlexBoxProps {
  onSearch?: (term?: string) => void
}

const SearchBar: React.FC<Props> = ({ defaultValue, onSearch, ...props }) => {
  const [term, setTerm] = useState<string>()
  const navigate = useNavigate()
  const onSearchHandler =
    onSearch ||
    ((term?: string) => {
      navigate(`/block/${term}`)
    })

  return (
    <FlexRow alignItems="stretch" {...props}>
      <Paper style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <TextField
          InputProps={{ color: 'secondary', style: { borderBottomRightRadius: 0, borderTopRightRadius: 0, borderWidth: 0 } }}
          variant="outlined"
          size="small"
          defaultValue={defaultValue}
          fullWidth
          onBlur={(event) => setTerm(event.target.value)}
        />
        <ButtonEx variant="contained" style={{ borderRadius: 0, borderTopLeftRadius: 0 }} color="secondary" onClick={() => onSearchHandler(term)}>
          <SearchIcon />
        </ButtonEx>
      </Paper>
    </FlexRow>
  )
}

export { SearchBar }
