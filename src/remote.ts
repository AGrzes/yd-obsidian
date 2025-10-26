import express from 'express'
import { App } from 'obsidian'
import { DataviewApi } from './types.js'

interface ExecRequest {
  code: string
  context: Record<string, any>
}

type AsyncFunction = (...args: any[]) => Promise<any>
const AsyncFunction: AsyncFunctionConstructor = Object.getPrototypeOf(async function () {}).constructor

interface AsyncFunctionConstructor {
  new (...args: string[]): AsyncFunction
  (...args: string[]): AsyncFunction
}

export function createRemoteServer(app: App, dv: DataviewApi) {
  const remoteServerApp = express()
  remoteServerApp.use(express.json())

  remoteServerApp.post('/echo', (req, res) => {
    console.log(req.body)
    res.send()
  })

  remoteServerApp.post('/exec', async (req, res) => {
    const { code, context } = req.body as ExecRequest
    try {
      const func = new AsyncFunction('app', 'dv', 'context', code)
      const result = await func(app, dv, context)
      res.json({ result })
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  return remoteServerApp.listen(32167, () => {
    console.log('Remote server listening on port 32167')
  })
}
