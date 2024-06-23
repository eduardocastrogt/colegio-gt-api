import Curso from '../../models/data/Curso'
import Oracle from '../../../infrastructure/db/Oracle'
import oracledb from 'oracledb'
import EstadoAsignacion from '../../models/data/EstadoAsignacion'
import Trimestre from '../../models/data/Trimestre'

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
}

export default CursoUseCase
