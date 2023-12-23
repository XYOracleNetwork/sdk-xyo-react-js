import { Button, DialogActions, FormControl, FormLabel, StandardTextFieldProps, TextField } from '@mui/material'

import { useSeedPhrase } from '../../../../../contexts'
import { colorParser, InvalidPhraseTypography, PhraseHeaderBox } from './validation-messages'

export const NewPhraseTextField: React.FC<StandardTextFieldProps> = (props) => {
  const { handleClear, handleGenerate, overwriteWarning, phrase, setPhrase, validPhrase } = useSeedPhrase()
  return (
    <>
      <FormControl fullWidth size="small" sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <FormLabel>
          <PhraseHeaderBox conditional={validPhrase}>New Seed Phrase</PhraseHeaderBox>
        </FormLabel>
        <TextField
          focused
          color={colorParser(validPhrase)}
          error={validPhrase === false}
          helperText={validPhrase === false ? <InvalidPhraseTypography /> : null}
          fullWidth
          maxRows={Number.POSITIVE_INFINITY}
          multiline
          onChange={(e) => setPhrase?.(e.target.value)}
          value={phrase}
          {...props}
        />
      </FormControl>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button disabled={overwriteWarning} variant="outlined" onClick={handleGenerate}>
          Generate
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </DialogActions>
    </>
  )
}
