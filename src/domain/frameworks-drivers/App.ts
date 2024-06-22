import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()

export class App {
  private readonly port: string = process.env.PORT ?? '3000'
  public app: Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // Configuración de headers de seguridad, referencia: https://www.npmjs.com/package/helmet
    this.app.use(helmet())
  }

  private routes (): void {
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('Hello World')
    })
  }

  async start (): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}
