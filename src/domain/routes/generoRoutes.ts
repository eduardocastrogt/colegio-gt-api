import { Request, Response, Router } from 'express'
import GeneroImp from '../implementations/genero/GeneroImp'

const generoImp = new GeneroImp()

const generoRouter = Router()

/**
 * @swagger
 * /v1/api/generos:
 *   get:
 *     summary: Obtener todos los géneros
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   genero:
 *                     type: string
 */
// generoRouter.get('/generos', async (req: Request, res: Response): Promise<void> => {
//   await generoImp.obtenerGenerosHttp(req, res)
// })
generoRouter.get('/generos', (req: Request, res: Response) => {
  void (async () => {
    await generoImp.obtenerGenerosHttp(req, res)
  })()
})
export default generoRouter
