export interface Ciudad
{
    Pais:number
    NombrePais:string
    Estado:number
    NombreEstado:string
    Ciudad:number
    NombreCiudad:string
}

export interface Departamento
{
    Estado:number
    NombreEstado:string
    Pais: number
    NombrePais: string
}

export interface Pais
{
    Pais:number
    NombrePais:string
}

export interface Coordenadas
{
    Fecha: string
    Hora: string
    Latitud: string
    Longitud: string
}