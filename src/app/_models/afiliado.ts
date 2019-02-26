export interface Afiliado{
    id:string;
    nombre:string;
    profecion:string;
    email:string;
    tipo_documento:string;
    Nro_Doc:string;

    reciprocidad:Reciprocidad;
}

export interface Reciprocidad{
    id:string;
    nombre:string;
    profesion:string;
    email:string;
    tipo_documento:string;
    Nro_Doc:string;
    Direccion:string;
    Localidad:string;
    Telefonos:string;
    celular:string;
    Universidad:string;
    fechaTitulo:string;
    Postgrado:string;
    Fecha_Matricula:string;
}

export interface Colegio{
    id:number;
    colegio_consejo:string;
}