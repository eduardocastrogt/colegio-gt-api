import { Request, Response } from 'express'
import EstadoAlumnoUseCase from '../../use-cases/estado-alumno/estadoAlumnoUseCase'

class EstadoAlumnoImp extends EstadoAlumnoUseCase {
  async ObtenerEstadosAlumnoHttp (req: Request, res: Response): Promise<void> {
    try {
      const estados = await this.obtenerEstadosAlumno()

      if (estados.length === 0) {
        res.status(404).json({ message: 'No se encontraron estados de alumnos' })
        return
      }

      res.status(200).json(estados)
    } catch (error) {
      console.error('Error al obtener los estados del alumno:', error)
      res.status(500).json({ message: 'Error al obtener los estados del alumno' })
    }
  }
}

export default EstadoAlumnoImp
