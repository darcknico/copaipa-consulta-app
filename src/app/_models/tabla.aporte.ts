export interface TablaAporte{
    id_tarea:number;
    tarea:string;
    id_subtarea:string;
    subtarea:string;
    unidad_de_medida:string;
    descuento:string;
    Tipo_de_descuento:string;
    importe:string;
    id_subcategoria:number;
}

export interface Tarea{
    id_tarea:number;
    tarea:string;
}

export interface Subtarea{
    id_tarea:number;
    id_subtarea:number;
    id_subcategoria:number;
    subtarea:string;
    tarea:string;
    unidad:string;
    descuento:string;
}

export interface DetalleTablaAporte{
    id:number;
    id_tarea:number;
    id_subtarea:number;
    id_subcategoria:number;
    tarea:string;
    subtarea:string;
    subcategoria:string;
    descuento_descripcion:string;
    cantidad:number;
    unidad:string;
    descuento:number;
    importe:number;
    descuento_aplicado:boolean;
}

export interface ImporteTablaAporte{
    id_tarea:number;
    id_subtarea:number;
    id_subcategoria:number;
    tacrtimportes_secuencia:number;
    nombre:string;
    rango:string;
    detalle_importe:string;
}