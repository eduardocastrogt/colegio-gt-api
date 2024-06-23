import { NextFunction, Request, Response } from 'express'
import validacionFormatoFecha from './validacionFormatoFecha'
import validarEmail from './validarEmail'

// Función para validar la creación de un alumno
const validarCreacionAlumno = (req: Request, res: Response, next: NextFunction): void => {
  const { nombres, apellidos, fechaNacimiento, telefono, email } = req.body

  // Función para validar campos requeridos
  const requerido = (campo: string, nombreCampo: string): boolean => {
    if (campo === undefined || campo === null || typeof campo !== 'string') {
      res.status(400).json({ message: `El campo ${nombreCampo} es requerido` })
      return false
    }
    return true
  }

  // Nombres
  if (!requerido(nombres, 'nombres')) return
  if (nombres.length > 50 || nombres.length < 5) {
    res.status(400).json({ message: 'Nombres debe tener una longitud de 5 a 50 caracteres' })
    return
  }

  // Apellidos
  if (!requerido(apellidos, 'apellidos')) return
  if (apellidos.length > 50 || apellidos.length < 5) {
    res.status(400).json({ message: 'Apellidos debe tener una longitud de 5 a 50 caracteres' })
    return
  }

  // Fecha de nacimiento
  if (!validacionFormatoFecha(fechaNacimiento)) {
    res.status(400).json({ message: 'El campo fechaNacimiento debe tener el formato YYYY-MM-DD o ser una fecha válida' })
    return
  }

  // Teléfono
  if (!requerido(telefono, 'teléfono')) return
  if (telefono.length !== 8) {
    res.status(400).json({ message: 'Teléfono debe de tener 8 dígitos' })
    return
  }

  // Email
  if (!requerido(email, 'email')) return
  if (!validarEmail(email)) {
    res.status(400).json({ message: 'El email no es válido' })
    return
  }

  next()
}

export default validarCreacionAlumno
