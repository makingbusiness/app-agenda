export interface Filtro {
    Pais: number
    Estado: number
    Ciudad: number
    Canal: string
    Clase: string
    Potenciales: boolean
    OtrosPotenciales: boolean
    Programacion: string
    FechaDesde: string
    FechaHasta: string
    Dato: RegExp
    DatoMay: RegExp
    Sector: number
    Zona: string
}