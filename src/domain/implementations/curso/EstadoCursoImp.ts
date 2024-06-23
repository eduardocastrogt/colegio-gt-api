import { Request, Response } from 'express'
import EstadoCursoUseCase from '../../use-cases/curso/estadoCursoUseCase'

class EstadoCursoImp extends EstadoCursoUseCase {
  async obtenerEstadosCursoHttp (req: Request, res: Response): Promise<void> {
    try {
      const estadosCurso = await this.obtenerEstadosCurso()

      if (estadosCurso.length === 0) {
        res.status(404).json({ message: 'No se encontraron estados de curso' })
        return
      }

      res.status(200).json(estadosCurso)
    } catch (error) {
      console.error('Error al obtener los estados de curso:', error)
      res.status(500).json({ message: 'Error al obtener los estados de curso' })
    }
  }
}

export default EstadoCursoImp
