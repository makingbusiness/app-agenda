export interface Cliente {
  codclie: string
  descrip: string
  clase: string
  represent: string
  direc1: string
  pais: number
  estado: number
  ciudad: number
  telef: string
  movil: string
  email: string
  fecha: string
  codzona: string
  observa: string
  saldo: number
  fechauv: string
  montouv: number
  numerouv: string
  fechaup: string
  montoup: number
  numeroup: string
  docfaltantes: string
  fuvw: string
  montouvw: number
  cartera: Cartera[]
  adicionales: Adicionales
  notas: Nota[]
  observaciones: Observacione[]
}

export interface Cartera {
  fecha: string
  numerod: string
  numeron: string
  tipopcxc: string
  document: string
  notas: string
  monto: number
  mtotax: number
  saldo: number
}

export interface Adicionales {
  observaciones: string
  sector: string
  transportadora: string
  productos: string
  centro_comercial: string
  contacto: string
  facturar_a: string
  canal: string
  referencia1: string
  referencia2: string
  referencia3: string
  referencia4: string
  tel_administrador: string
  tel_compras: string
  tel_tesoreria: string
}

export interface Nota {
  nota: string
  fecha: string
}

export interface Observacione {
  observaciones: string
  obsvendedor: string
  fecha: string
}

export interface Generica
{
  Id: number,
  Descrip: string
}

export interface Sector
{
    CodSector: number
    Descrip: string
    CodZona: string
}

export interface Zona
{
    CodZona: string
    Descrip: string
}