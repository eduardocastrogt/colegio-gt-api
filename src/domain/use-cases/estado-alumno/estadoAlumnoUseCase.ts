import EstadoAlumno from '../../models/data/EstadoAlumno'
import Oracle from '../../../infrastructure/db/Oracle'

abstract class EstadoAlumnoUseCase {
  async obtenerEstadosAlumno (): Promise<EstadoAlumno[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM estado_alumno')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const estados = data?.map(estado => {
      return {
        id: estado[0],
        estado: estado[1]
      }
    })

    return estados ?? []
  }
}

export default EstadoAlumnoUseCase
