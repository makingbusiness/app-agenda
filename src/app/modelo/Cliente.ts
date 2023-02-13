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
  seleccionado?: boolean
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

export interface Potencial
{
    codclie: string
    descrip: string
    nit: string
    clase: string
    represent: string
    contacto: string
    factA: string
    direc1: string
    codzona: string
    vend: string
    telef: string
    email: string
    movil: string
    observaciones: string
    sector: string
    centro_comercial: string
    canal: number
    productos: string
    local: string
    fecha: string
    transportadora: string
    ciudad: number
    snInfo: string
    activo: string
    tel_Administrador: string
    tel_Compras: string
    tel_Tesoreria: string
    pais: number
    estado: number
    clienteAdmin: string
    nomAdm: string
    nomCom: string
    nomTes: string
    tipo: string
    seleccionado?: boolean
}