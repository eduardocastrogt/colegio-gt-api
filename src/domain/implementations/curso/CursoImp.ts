import { Request, Response } from 'express'
import CursoUseCase from '../../use-cases/curso/cursoUseCase'

class CursoImp extends CursoUseCase {
  async obtenerCursosHttp (req: Request, res: Response): Promise<void> {
    try {
      const cursos = await this.obtenerCursos()

      if (cursos.length === 0) {
        res.status(404).json({ message: 'No se encontraron cursos' })
        return
      }

      res.status(200).json(cursos)
    } catch (error) {
      console.error('Error al obtener los cursos:', error)
      res.status(500).json({ message: 'Error al obtener los cursos' })
    }
  }

  async crearCursoHttp (req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body

      const cursoId = await this.crearCurso({
        nombre,
        descripcion
      })

      const informacionCurso = await this.obtenerCursoPorId(cursoId)

      res.status(201).json({ message: 'Curso creado', data: informacionCurso })
    } catch (error) {
      console.error('Error al crear el curso:', error)
      res.status(500).json({ message: 'Error al crear el curso' })
    }
  }

  async obtenerEstadosAsignacionHttp (req: Request, res: Response): Promise<void> {
    try {
      const estadosAsignacion = await this.obtenerEstadosAsignacion()

      if (estadosAsignacion.length === 0) {
        res.status(404).json({ message: 'No se encontraron estados de asignación' })
        return
      }

      res.status(200).json(estadosAsignacion)
    } catch (error) {
      console.error('Error al obtener los estados de asignación:', error)
      res.status(500).json({ message: 'Error al obtener los estados de asignación' })
    }
  }

  async obtenerTrimestresCursoHttp (req: Request, res: Response): Promise<void> {
    try {
      const trimestres = await this.obtenerTrimestresCurso()

      if (trimestres.length === 0) {
        res.status(404).json({ message: 'No se encontraron trimestres para el curso' })
        return
      }

      res.status(200).json(trimestres)
    } catch (error) {
      console.error('Error al obtener los trimestres del curso:', error)
      res.status(500).json({ message: 'Error al obtener los trimestres del curso' })
    }
  }
}

export default CursoImp
