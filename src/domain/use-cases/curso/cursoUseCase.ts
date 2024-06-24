import Curso from '../../models/data/Curso'
import Oracle from '../../../infrastructure/db/Oracle'
import oracledb from 'oracledb'
import EstadoAsignacion from '../../models/data/EstadoAsignacion'
import Trimestre from '../../models/data/Trimestre'
import Asignacion from '../../models/data/Asignacion'

abstract class CursoUseCase {
  async obtenerCursos (): Promise<Curso[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM curso')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const cursos = data?.map(curso => {
      return {
        id: curso[0],
        nombre: curso[1],
        descripcion: curso[2],
        estadoCurso: curso[3].trim(),
        fechaCreacion: curso[4]
      }
    })

    return cursos ?? []
  }

  async obtenerCursoPorId (id: number): Promise<Curso | null> {
    const queryRestul = await Oracle.select(`SELECT * FROM curso WHERE curso_id = ${id}`)

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return null
    }

    const curso = data?.map(curso => {
      return {
        id: curso[0],
        nombre: curso[1],
        descripcion: curso[2],
        estadoCurso: curso[3].trim(),
        fechaCreacion: curso[4]
      }
    })

    return curso[0] ?? null
  }

  async crearCurso (curso: Curso): Promise<number> {
    const { nombre, descripcion } = curso

    const insertQuery = `
      INSERT INTO curso (nombre, descripcion, estado_curso_id)
      VALUES (:nombre, :descripcion, :estadoCurso)
      RETURNING curso_id INTO :nuevoCursoId
    `

    const parameters = {
      nombre,
      descripcion,
      estadoCurso: 'A',
      nuevoCursoId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    }

    const insertResult = await Oracle.execute(insertQuery, parameters)
    return insertResult.data.nuevoCursoId[0]
  }

  async obtenerEstadosAsignacion (): Promise<EstadoAsignacion[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM estado_asignacion')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const asignaciones = data?.map(asignacion => {
      return {
        id: asignacion[0].trim(),
        estado: asignacion[1]
      }
    })

    return asignaciones ?? []
  }

  async obtenerTrimestresCurso (): Promise<Trimestre[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM trimestre_curso')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const trimestres = data?.map(trimestre => {
      return {
        trimestre: trimestre[0]
      }
    })

    return trimestres ?? []
  }

  async crearAsignacion (asignacion: Asignacion): Promise<number> {
    const { alumno, curso, trimestre, estadoAsignacion = 'P' } = asignacion

    const insertQuery = `
      INSERT INTO asignacion_curso (curso_id, alumno_id, trimestre_curso_id, estado_asignacion_id)
      VALUES (:curso, :alumno, :trimestre, :estadoAsignacion)
      RETURNING asignacion_curso_id INTO :nuevaAsignacionId
    `

    const parameters = {
      curso,
      alumno,
      trimestre,
      estadoAsignacion,
      nuevaAsignacionId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    }

    const insertResult = await Oracle.execute(insertQuery, parameters)
    return insertResult.data.nuevaAsignacionId[0]
  }

  async obtenerListadoDeAsignaciones (): Promise<Asignacion[] | []> {
    const queryResult = await Oracle.select(`
      select a.asignacion_curso_id as id, b.nombre as curso, d.nombres || ' ' || d.apellidos as alumno,
             c.trimestre_curso_id as trimestre, a.estado_asignacion_id as estadoAsignacion
      from asignacion_curso a 
      join curso b on a.curso_id = b.curso_id 
      join trimestre_curso c on a.trimestre_curso_id = c.trimestre_curso_id
      join alumno d on a.alumno_id = d.alumno_id
      order by a.fecha_asignacion desc
    `)

    const { data } = queryResult

    if (data === undefined || data === null) {
      return []
    }

    const asignaciones = data?.map(asignacion => {
      return {
        id: asignacion[0],
        curso: asignacion[1],
        alumno: asignacion[2],
        trimestre: asignacion[3],
        estadoAsignacion: asignacion[4].trim()
      }
    })

    return asignaciones ?? []
  }

  async actualizarEstadoAsignacion (asignacionId: number, estadoAsignacion: string): Promise<void> {
    const updateQuery = `
      UPDATE asignacion_curso
      SET estado_asignacion_id = :estadoAsignacion
      WHERE asignacion_curso_id = :asignacionId
    `

    const parameters = {
      estadoAsignacion,
      asignacionId
    }

    await Oracle.execute(updateQuery, parameters)
  }
}

export default CursoUseCase
