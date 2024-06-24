interface Asignacion {
  id?: number
  alumno: number | string
  curso: number | string
  trimestre: number
  fechaAsignacion?: string
  estadoAsignacion?: string

}

export default Asignacion
