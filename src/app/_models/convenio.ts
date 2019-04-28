export interface Convenio{
    id:number;
    institucion_nombre:string;
    id_tipo_convenio:string;
    id_localidad:number;
    beneficio:string;

    localidad:Localidad;
    tipo:TipoConvenio;
}

export interface Localidad{
    id:number;
    nombre:string;
    id_provincia:number;

    provincia:Provincia;
}

export interface Provincia{
    id:number;
    nombre:string;
}

export interface TipoConvenio{
    id:string;
    nombre:string;
}