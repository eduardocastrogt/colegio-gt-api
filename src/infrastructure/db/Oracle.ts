import * as oracledb from 'oracledb'
import dotenv from 'dotenv'
dotenv.config()

class Oracle {
  private connection: any

  constructor () {
    oracledb.createPool({
      user: process.env.ORACLE_USER ?? '',
      password: process.env.ORACLE_PASSWORD ?? '',
      connectString: process.env.ORACLE_HOST ?? '',
      poolMax: 10,
      poolMin: 2,
      poolTimeout: 60,
      poolIncrement: 2
    })
      .then(() => {
        console.log('Pool created successfully')
      })
      .catch((err) => {
        console.error('Error creating pool:', err)
      })
  }

  async obtenerConexion (): Promise<any> {
    try {
      const connection = await oracledb.getConnection()
      return connection
    } catch (err) {
      console.error('getConnection() error: ' + err)
      throw err
    }
  }

  async select (query: string): Promise<{ status: string, message: string, data?: any[] }> {
    try {
      this.connection = await oracledb.getConnection()
      const result = await this.connection.execute(query)
      this.connection.close()
      const data = result.rows

      return { status: 'success', message: 'Consulta exitosa', data }
    } catch (err) {
      console.error('Error al ejecutar consulta SELECT:', err)
      return { status: 'error', message: 'Error al ejecutar consulta SELECT' }
    }
  }

  async execute (query: string, params: any): Promise<{ status: string, message: string, rowsAffected?: number, data?: any }> {
    try {
      this.connection = await this.obtenerConexion()

      const result = await this.connection.execute(query, params, { autoCommit: true })
      const rowsAffected = result.rowsAffected
      await this.connection.close()

      return { status: 'success', message: 'Query ejecutado exitosamente', rowsAffected, data: result.outBinds }
    } catch (err) {
      console.error('Error al ejecutar query:', err)
      return { status: 'error', message: 'Error al ejecutar query' }
    }
  }

  async executeProcedure (procedureName: string, params: any): Promise<{ status: string, message: string }> {
    try {
      await this.connection.execute(procedureName, params)

      return { status: 'success', message: 'Procedimiento almacenado ejecutado exitosamente' }
    } catch (err) {
      console.error('Error al ejecutar procedimiento almacenado:', err)
      return { status: 'error', message: 'Error al ejecutar procedimiento almacenado' }
    }
  }

  async closeConnection (): Promise<void> {
    try {
      await this.connection.close()
      console.log('Conexión cerrada')
    } catch (err) {
      console.error('Error al cerrar la conexión:', err)
    }
  }
}

export default new Oracle()
