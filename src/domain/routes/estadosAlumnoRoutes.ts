import { Request, Response, Router } from 'express'
import EstadoAlumnoImp from '../implementations/estado-alumno/EstadoAlumnoImp'

const estadosImp = new EstadoAlumnoImp()

const estadoAlumnoRoute = Router()

/**
 * @swagger
 * /v1/api/estados-alumno:
 *   get:
 *     summary: Obtener todos los estados del alumno
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
 *                   estado:
 *                     type: string
 */

estadoAlumnoRoute.get('/estados-alumno', (req: Request, res: Response) => {
  void (async () => {
    await estadosImp.ObtenerEstadosAlumnoHttp(req, res)
  })()
})

export default estadoAlumnoRoute
