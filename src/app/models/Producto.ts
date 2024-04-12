export class Producto{
    id: number;
    nombre : string;
    animal: string;
    precio: number;
    cantidad: number;
    descripcion: string;
    oferta: boolean;
    fotito: number;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.animal = '';
        this.precio = 0;
        this.cantidad = 0;
        this.descripcion = '';
        this.oferta=true;
        this.fotito = 0;
    }
}