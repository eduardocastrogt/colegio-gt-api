import express, { Application } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Importación de rutas
import generoRouter from '../routes/generoRoutes'
import estadoAlumnoRoute from '../routes/estadosAlumnoRoutes'
import alumnoRouter from '../routes/alumnosRoutes'
import cursosRouter from '../routes/cursosRoutes'
dotenv.config()

export class App {
  private readonly port: string = process.env.PORT ?? '3000'
  private readonly version: string = process.env.VERSION ?? 'v1'
  private readonly prefixApi: string = process.env.PREFIX_API ?? '/api'
  public app: Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.swagger()
  }

  private swagger (): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0'
        }
      },
      apis: ['./src/domain/routes/*.ts']
    }

    const swaggerSpec = swaggerJsdoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // Configuración de headers de seguridad, referencia: https://www.npmjs.com/package/helmet
    this.app.use(helmet())
  }

  private routes (): void {
    // Obtener generos
    this.app.use(`/${this.version}/${this.prefixApi}`, generoRouter)
    // Estados en los que puede estar un alumno
    this.app.use(`/${this.version}/${this.prefixApi}`, estadoAlumnoRoute)
    // Rutas de alumnos
    this.app.use(`/${this.version}/${this.prefixApi}`, alumnoRouter)
    // Rutas de cursos
    this.app.use(`/${this.version}/${this.prefixApi}`, cursosRouter)
  }

  async start (): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}
