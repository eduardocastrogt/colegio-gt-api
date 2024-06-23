import { DateTime } from 'luxon'

// Función para validar el formato y validez de la fecha
const validacionFormatoFecha = (fecha: string): boolean => {
  const formatoFecha = 'yyyy-MM-dd' // Formato esperado

  try {
    const fechaNacimiento = DateTime.fromFormat(fecha, formatoFecha, { zone: 'utc' })

    if (!fechaNacimiento.isValid) {
      return false // La fecha no es válida según el formato dado
    }

    // Verificar que la fecha no sea posterior a la fecha actual
    const fechaActual = DateTime.utc()

    return fechaNacimiento <= fechaActual
  } catch (error) {
    return false // Error al analizar la fecha
  }
}

export default validacionFormatoFecha
