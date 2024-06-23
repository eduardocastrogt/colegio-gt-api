import { Request, Response, Router } from 'express'
import AlumnoImp from '../implementations/alumno/AlumnoImp'
import validarCreacionAlumno from '../../utils/validations/validarCreacionAlumno'

const alumnoImp = new AlumnoImp()

const alumnoRouter = Router()

/**
 * @swagger
 * /v1/api/alumnos:
 *   get:
 *     summary: Obtener todos los alumnos
 *     tags: [Alumnos]
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
 *                   nombres:
 *                     type: string
 *                   apellidos:
 *                     type: string
 *                   fecha_nacimiento:
 *                     type: string
 *                   genero:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *                   estado_alumno:
 *                     type: string
 *                   fecha_creacion:
 *                     type: string
 */
alumnoRouter.get('/alumnos', (req: Request, res: Response) => {
  void (async () => {
    await alumnoImp.obtenerAlumnosHttp(req, res)
  })()
})

/**
 * @swagger
 * /v1/api/alumnos/{id}:
 *   get:
 *     summary: Obtener un alumno por su ID
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del alumno
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 nombres:
 *                   type: string
 *                 apellidos:
 *                   type: string
 *                 fecha_nacimiento:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string
 *                 estado_alumno:
 *                   type: string
 *                 fecha_creacion:
 *                   type: string
 */
alumnoRouter.get('/alumnos/:id', (req: Request, res: Response) => {
  void (async () => {
    await alumnoImp.obtenerAlumnosPorIdHttp(req, res)
  })()
})

/**
 * @swagger
 * /v1/api/alumnos:
 *   post:
 *     summary: Crear un alumno
 *     tags: [Alumnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               estadoAlumno:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */
alumnoRouter.post('/alumnos', validarCreacionAlumno, (req: Request, res: Response) => {
  void (async () => {
    await alumnoImp.crearAlumnoHttp(req, res)
  })()
})

export default alumnoRouter
