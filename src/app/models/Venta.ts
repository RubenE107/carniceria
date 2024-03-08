export class Venta{
    id: number;
    id_usuario: number
    id_producto: number;
    monto: number;
    fecha: string;
    cantidad: number;
    nombre:string;
    constructor() {
        this.id = 0;
        this.id_usuario= 0;
        this.id_producto= 0;
        this.monto= 0;
        this.fecha = '';
        this.nombre = '';
        this.cantidad = 0
    }
}