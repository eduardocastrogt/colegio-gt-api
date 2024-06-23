import Alumno from '../../models/data/Alumno'
import Oracle from '../../../infrastructure/db/Oracle'
import mapeoAlumnos from '../../../utils/mapeoAlumnos'
import oracledb from 'oracledb'

abstract class AlumnoUseCase {
  async obtenerAlumnos (): Promise<Alumno[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM alumno')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const alumnos = data?.map(alumno => {
      return mapeoAlumnos(alumno)
    })

    return alumnos ?? []
  }

  async obtenerAlumnoPorId (id: number): Promise<Alumno | null> {
    const queryRestul = await Oracle.select(`SELECT * FROM alumno WHERE alumno_id = ${id}`)

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return null
    }

    const alumno = data?.map(alumno => {
      return mapeoAlumnos(alumno)
    })

    return alumno[0] ?? null
  }

  async crearAlumno (alumno: Alumno): Promise<number> {
    const { nombres, apellidos, fechaNacimiento, genero, telefono, email, estadoAlumno } = alumno

    const insertQuery = `
      INSERT INTO alumno (nombres, apellidos, fecha_nacimiento, genero_id, telefono, email, estado_alumno_id)
      VALUES (:nombres, :apellidos, TO_DATE(:fechaNacimiento, 'YYYY-MM-DD'), :genero, :telefono, :email, :estadoAlumno)
      RETURNING alumno_id INTO :nuevoAlumnoId
    `

    const parameters = {
      nombres,
      apellidos,
      fechaNacimiento,
      genero,
      telefono,
      email,
      estadoAlumno,
      nuevoAlumnoId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    }

    const insertResult = await Oracle.execute(insertQuery, parameters)
    return insertResult.data.nuevoAlumnoId[0]
  }
}

export default AlumnoUseCase
