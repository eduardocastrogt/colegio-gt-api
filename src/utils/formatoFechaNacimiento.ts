const formatoFechaNacimiento = (fechaIso: string): string => {
  const fecha = new Date(fechaIso)

  const año = fecha.getUTCFullYear()
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0')
  const dia = fecha.getUTCDate().toString().padStart(2, '0')

  return `${año}-${mes}-${dia}`
}

export default formatoFechaNacimiento
