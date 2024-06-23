import { Request, Response } from 'express'
import GeneroUseCase from '../../use-cases/genero/generoUseCase'

class GeneroImp extends GeneroUseCase {
  async obtenerGenerosHttp (req: Request, res: Response): Promise<void> {
    try {
      const generos = await this.obtenerGeneros()

      if (generos.length === 0) {
        res.status(404).json({ message: 'No se encontraron géneros' })
        return
      }

      res.status(200).json(generos)
    } catch (error) {
      console.error('Error al obtener los géneros:', error)
      res.status(500).json({ message: 'Error al obtener los géneros' })
    }
  }
}

export default GeneroImp
