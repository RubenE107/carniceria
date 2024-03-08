import { Producto } from "./Producto";

export class Carrito{
    id: number;
    id_producto: number;
    id_usuario: number;
    nombre : string;
    cantidad: number;
    producto: Producto;
    precio: number;
    constructor() {
        this.producto = new Producto();
        this.id = 0;
        this.cantidad = 0;
        this.id_producto = 0;
        this.id_usuario = 0;
        this.precio = 0;
        this.nombre= "";
    }
}