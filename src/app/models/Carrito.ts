
export class Carrito{
    id: number;
    id_producto: number;
    id_usuario: number;
    nombre : string;
    name : string;
    cantidad: number;
    precio: number;
    constructor() {
        this.id = 0;
        this.cantidad = 0;
        this.id_producto = 0;
        this.id_usuario = 0;
        this.precio = 0;
        this.nombre= "";
        this.name = '';
    }
}