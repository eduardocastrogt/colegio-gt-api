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

  async crearAsignacionHttp (req: Request, res: Response): Promise<void> {
    try {
      const { curso, trimestre, alumno } = req.body

      if (curso === undefined || typeof curso !== 'number') {
        res.status(400).json({ message: 'El campo curso es obligatorio y debe ser un número' })
        return
      }
      if (trimestre === undefined || typeof trimestre !== 'number') {
        res.status(400).json({ message: 'El campo trimestre es obligatorio y debe ser un número' })
        return
      }
      if (alumno === undefined || typeof alumno !== 'number') {
        res.status(400).json({ message: 'El campo alumno es obligatorio y debe ser un número' })
        return
      }

      const asignacionId = await this.crearAsignacion({ curso, trimestre, alumno })

      res.status(201).json({ message: 'Asignación creada', data: { asignacionId } })
    } catch (error) {
      console.error('Error al crear la asignación:', error)
      res.status(500).json({ message: 'Error al crear la asignación' })
    }
  }

  async obtenerAsignacionesHttp (req: Request, res: Response): Promise<void> {
    try {
      const asignaciones = await this.obtenerListadoDeAsignaciones()

      if (asignaciones.length === 0) {
        res.status(404).json({ message: 'No se encontraron asignaciones' })
        return
      }

      res.status(200).json(asignaciones)
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error)
      res.status(500).json({ message: 'Error al obtener las asignaciones' })
    }
  }

  async actualizarEstadoAsignacionHttp (req: Request, res: Response): Promise<void> {
    try {
      const { estado } = req.body
      const { id } = req.params
      const asignacionId = Number(id)

      if (isNaN(asignacionId)) {
        res.status(400).json({ message: 'El campo asignacionId es obligatorio y debe ser un número' })
        return
      }

      if (estado === undefined || typeof estado !== 'string') {
        res.status(400).json({ message: 'El campo estado es obligatorio y debe ser una cadena' })
        return
      }

      const estadosValidos = ['P', 'N', 'R', 'A']
      if (!estadosValidos.includes(estado.toUpperCase())) {
        res.status(400).json({ message: 'El campo estado debe ser uno de los siguientes valores: P, N, R, A' })
        return
      }

      await this.actualizarEstadoAsignacion(asignacionId, estado.toUpperCase())

      res.status(200).json({ message: 'Estado de la asignación actualizado' })
    } catch (error) {
      console.error('Error al actualizar el estado de la asignación:', error)
      res.status(500).json({ message: 'Error al actualizar el estado de la asignación' })
    }
  }
}

export default CursoImp
