import EstadoCurso from '../../models/data/EstadoCurso'
import Oracle from '../../../infrastructure/db/Oracle'

abstract class EstadoCursoUseCase {
  async obtenerEstadosCurso (): Promise<EstadoCurso[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM estado_curso')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const estadosCurso = data?.map(estadoCurso => {
      return {
        id: estadoCurso[0].trim(),
        estado: estadoCurso[1]
      }
    })

    return estadosCurso ?? []
  }
}

export default EstadoCursoUseCase
