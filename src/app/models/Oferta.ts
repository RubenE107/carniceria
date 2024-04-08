export class Oferta{
    id_oferta: number;
    id_producto: number;
    nombre_oferta: string;
    precio_orig : number;
    porc_descuento: number;
    fecha_inicio: string;
    fecha_fin: string;
    nombre_producto: string
    constructor(){
        this.id_oferta = 0;
        this.id_producto = 0;
        this.nombre_oferta = '';
        this.precio_orig = 0;
        this.porc_descuento = 0;
        this.fecha_inicio = '';
        this.fecha_fin = '';
        this.nombre_producto = '';
    }
}