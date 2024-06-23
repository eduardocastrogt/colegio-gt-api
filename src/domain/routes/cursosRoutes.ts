import { Request, Response, Router } from 'express'
import EstadoCursoImp from '../implementations/curso/estadoCursoImp'
import CursoImp from '../implementations/curso/CursoImp'

const estadoCursoImp = new EstadoCursoImp()
const cursoImp = new CursoImp()

const cursosRouter = Router()

// Generar swagger para este endpoint, incluir ejemplo de respuesta y modelos de datos
/**
 * @swagger
 * /v1/api/curso/estados-curso:
 *   get:
 *     summary: Obtener todos los estados de curso
 *     tags: [Estados de Curso]
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
 *             example:
 *               - id: 1
 *                 estado: 'Activo'
 *               - id: 2
 *                 estado: 'Inactivo'
 */
cursosRouter.get('/curso/estados-curso', (req: Request, res: Response) => {
  void (async () => {
    await estadoCursoImp.obtenerEstadosCursoHttp(req, res)
  })()
})

// Generar swagger para este endpoint, incluir ejemplo de respuesta y modelos de datos
/**
 * @swagger
 * /v1/api/curso:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Cursos]
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
 *                   curso:
 *                     type: string
 *                   estado:
 *                     type: string
 *             example:
 *               - id: 1
 *                 curso: 'Matemáticas'
 *                 estado: 'Activo'
 *               - id: 2
 *                 curso: 'Español'
 *                 estado: 'Activo'
 */
cursosRouter.get('/curso', (req: Request, res: Response) => {
  void (async () => {
    await cursoImp.obtenerCursosHttp(req, res)
  })()
})

// Generar swagger para este endpoint, incluir ejemplo de respuesta y modelos de datos
/**
 * @swagger
 * /v1/api/curso:
 *   post:
 *     summary: Crear un curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     curso:
 *                       type: string
 *                     estado:
 *                       type: string
 *             example:
 *               message: 'Curso creado'
 *               data:
 *                 id: 1
 *                 curso: 'Matemáticas'
 *                 estado: 'Activo'
 */
cursosRouter.post('/curso', (req: Request, res: Response) => {
  void (async () => {
    await cursoImp.crearCursoHttp(req, res)
  })()
})

// Generar swagger para este endpoint, incluir ejemplo de respuesta y modelos de datos
/**
 * @swagger
 * /v1/api/curso/estados-asignacion:
 *   get:
 *     summary: Obtener todos los estados de asignación
 *     tags: [Estados de Asignación]
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
 *             example:
 *               - id: 1
 *                 estado: 'Activo'
 *               - id: 2
 *                 estado: 'Inactivo'
 */
cursosRouter.get('/curso/estados-asignacion', (req: Request, res: Response) => {
  void (async () => {
    await cursoImp.obtenerEstadosAsignacionHttp(req, res)
  })()
})

// Generar swagger para este endpoint, incluir ejemplo de respuesta y modelos de datos
/**
 * @swagger
 * /v1/api/curso/trimestres:
 *   get:
 *     summary: Obtener todos los trimestres de un curso
 *     tags: [Trimestres]
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
 *                   trimestre:
 *                     type: string
 *             example:
 *               - trimestre: '12024'
 *               - trimestre: '22024'
 */
cursosRouter.get('/curso/trimestres', (req: Request, res: Response) => {
  void (async () => {
    await cursoImp.obtenerTrimestresCursoHttp(req, res)
  })()
})

export default cursosRouter
