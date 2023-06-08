import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const worker = new Worker(new URL('./Worker.ts', import.meta.url))

export const WorkerTest: React.FC = () => {
  const [workerMessage, setWorkerMessage] = useState<string>()

  useEffect(() => {
    worker.onmessage = (event) => {
      setWorkerMessage(event.data)
    }
  }, [])

  const pingWorker = () => {
    worker.postMessage('ping')
  }

  return (
    <>
      <Button onClick={pingWorker}>Ping Worker</Button>
      <Typography>Worker Ping Count:</Typography>
      {workerMessage}
    </>
  )
}
