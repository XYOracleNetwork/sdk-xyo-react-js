import { useMemo, useState } from 'react'

export const useAccessCodes = (localStorageKey: string, validCodeLength = 6) => {
  const [validated, setValidated] = useState(false)
  const [codeInput, setCodeInput] = useState('')

  const onAccessCodeSuccess = () => {
    // Save the access code to local storage
    if (codeInput) {
      localStorage.setItem(localStorageKey, JSON.stringify([codeInput]))
      setValidated(true)
    } else {
      // If the codeInput is empty, but we have success, do nothing since the successful code is already saved
      setValidated(true)
    }
  }
  const validateCodeInput = (code?: string) => {
    return code?.length === validCodeLength
  }
  const onCodeInputChange = (code?: string) => {
    setCodeInput(code ?? '')
  }
  const userAccessCodes = useMemo(() => {
    const storedCodes = localStorage.getItem(localStorageKey)
    if (storedCodes) {
      const parsedResult = JSON.parse(storedCodes ?? '')
      if (Array.isArray(parsedResult)) return parsedResult
    }
  }, [])

  return {
    codeInput, validated, userAccessCodes, onAccessCodeSuccess, onCodeInputChange, validateCodeInput,
  }
}
