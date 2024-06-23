import Alumno from '../domain/models/data/Alumno'
import formatoFechaNacimiento from './formatoFechaNacimiento'

const mapeoAlumnos = (alumno: any): Alumno => {
  return {
    id: alumno[0],
    nombres: alumno[1],
    apellidos: alumno[2],
    fechaNacimiento: formatoFechaNacimiento(alumno[3]),
    genero: alumno[4].trim(),
    telefono: alumno[5],
    email: alumno[6],
    estadoAlumno: alumno[7].trim(),
    fechaCreacion: alumno[8]
  }
}

export default mapeoAlumnos
