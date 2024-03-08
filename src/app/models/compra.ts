export class Compra{
    id: number;
    cantidad : number;
    id_producto: number;
    monto: number;
    fecha: string;
    nombre: string;
    constructor() {
        this.id = 0;
        this.cantidad = 0;
        this.id_producto= 0;
        this.monto= 0;
        this.fecha = '';
        this.nombre = ''
    }
}