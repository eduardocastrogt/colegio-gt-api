import Genero from '../../models/data/Genero'
import Oracle from '../../../infrastructure/db/Oracle'

abstract class GeneroUseCase {
  async obtenerGeneros (): Promise<Genero[] | []> {
    const queryRestul = await Oracle.select('SELECT * FROM genero')

    const { data } = queryRestul

    if (data === undefined || data === null) {
      return []
    }

    const generos = data?.map(genero => {
      return {
        id: genero[0],
        genero: genero[1]
      }
    })

    return generos ?? []
  }
}

export default GeneroUseCase
