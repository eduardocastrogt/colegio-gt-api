import * as oracledb from 'oracledb'
import dotenv from 'dotenv'
dotenv.config()

class Oracle {
  private pool: any

  constructor () {
    this.initializePool().then(() => {
      console.log('Pool created successfully')
    }).catch((err) => {
      console.error('Error creating pool:', err)
    })
  }

  private async initializePool (): Promise<void> {
    try {
      this.pool = await oracledb.createPool({
        user: process.env.ORACLE_USER ?? '',
        password: process.env.ORACLE_PASSWORD ?? '',
        connectString: process.env.ORACLE_HOST ?? '',
        poolMax: 10,
        poolMin: 2,
        poolTimeout: 60,
        poolIncrement: 2
      })
      console.log('Pool created successfully')
    } catch (err) {
      console.error('Error creating pool:', err)
      throw err
    }
  }

  async select (query: string): Promise<{ status: string, message: string, data?: any[] }> {
    let connection: any
    try {
      if (this.pool != null) {
        connection = await this.pool.getConnection()
        const result = await connection.execute(query)
        return { status: 'success', message: 'Consulta exitosa', data: result.rows }
      } else {
        return { status: 'error', message: 'Error al ejecutar consulta SELECT' }
      }
    } catch (err) {
      console.error('Error al ejecutar consulta SELECT:', err)
      return { status: 'error', message: 'Error al ejecutar consulta SELECT' }
    } finally {
      if (connection != null) {
        try {
          await connection.close()
        } catch (err) {
          console.error('Error al cerrar conexión:', err)
        }
      }
    }
  }

  async execute (query: string, params: any): Promise<{ status: string, message: string, rowsAffected?: number, data?: any }> {
    let connection
    try {
      connection = await this.pool.getConnection()
      const result = await connection.execute(query, params, { autoCommit: true })
      return { status: 'success', message: 'Query ejecutado exitosamente', rowsAffected: result.rowsAffected, data: result.outBinds }
    } catch (err) {
      console.error('Error al ejecutar query:', err)
      return { status: 'error', message: 'Error al ejecutar query' }
    } finally {
      if (connection != null) {
        try {
          await connection.close()
        } catch (err) {
          console.error('Error al cerrar conexión:', err)
        }
      }
    }
  }

  async executeProcedure (procedureName: string, params: any): Promise<{ status: string, message: string }> {
    let connection
    try {
      connection = await this.pool.getConnection()
      await connection.execute(procedureName, params)
      return { status: 'success', message: 'Procedimiento almacenado ejecutado exitosamente' }
    } catch (err) {
      console.error('Error al ejecutar procedimiento almacenado:', err)
      return { status: 'error', message: 'Error al ejecutar procedimiento almacenado' }
    } finally {
      if (connection != null) {
        try {
          await connection.close()
        } catch (err) {
          console.error('Error al cerrar conexión:', err)
        }
      }
    }
  }

  async closePool (): Promise<void> {
    try {
      await this.pool.close()
      console.log('Pool cerrado')
    } catch (err) {
      console.error('Error al cerrar pool:', err)
    }
  }
}

export default new Oracle()
