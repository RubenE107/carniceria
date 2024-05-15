export class Venta{
    id: number;
    id_producto: number;
    monto: number;
    fecha: string;
    cantidad: number;
    nombre:string;
    name:string;
    constructor() {
        this.id = 0;
        this.id_producto= 0;
        this.monto= 0;
        this.fecha = '';
        this.nombre = '';
        this.name = '';
        this.cantidad = 0
    }
}