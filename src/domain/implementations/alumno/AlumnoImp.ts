import { Request, Response } from 'express'
import AlumnoUseCase from '../../use-cases/alumno/alumnoUseCase'
import logger from '../../../infrastructure/logs/Logger'

class AlumnoImp extends AlumnoUseCase {
  async obtenerAlumnosHttp (req: Request, res: Response): Promise<void> {
    logger.info('Obteniendo los alumnos')
    try {
      const alumnos = await this.obtenerAlumnos()

      if (alumnos.length === 0) {
        res.status(404).json({ message: 'No se encontraron alumnos' })
        return
      }

      res.status(200).json(alumnos)
    } catch (error) {
      console.error('Error al obtener los alumnos:', error)
      res.status(500).json({ message: 'Error al obtener los alumnos' })
    }
  }

  async obtenerAlumnosPorIdHttp (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (isNaN(Number(id))) {
        res.status(400).json({ message: 'El ID debe ser un número' })
        return
      }

      const alumno = await this.obtenerAlumnoPorId(Number(id))

      if (alumno === null) {
        res.status(404).json({ message: 'No se encontró el alumno' })
        return
      }

      res.status(200).json(alumno)
    } catch (error) {
      console.error('Error al obtener el alumno:', error)
      res.status(500).json({ message: 'Error al obtener el alumno' })
    }
  }

  async crearAlumnoHttp (req: Request, res: Response): Promise<void> {
    try {
      const { nombres, apellidos, fechaNacimiento, genero, telefono, email } = req.body

      const alumnoId = await this.crearAlumno({
        nombres,
        apellidos,
        fechaNacimiento,
        genero,
        telefono,
        email,
        estadoAlumno: 'A'
      })

      const informacionAlumno = await this.obtenerAlumnoPorId(alumnoId)

      res.status(201).json({ message: 'Alumno creado', data: informacionAlumno })
    } catch (error) {
      console.error('Error al crear el alumno:', error)
      res.status(500).json({ message: 'Error al crear el alumno' })
    }
  }
}

export default AlumnoImp
