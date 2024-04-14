export class Producto{
    id: number;
    nombre : string;
    name : string;
    animal: string;
    animal_eng : string;
    precio: number;
    cantidad: number;
    descripcion: string;
    description : string;
    oferta: boolean;
    fotito: number;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.name = '';
        this.animal = '';
        this.animal_eng = '';
        this.precio = 0;
        this.cantidad = 0;
        this.descripcion = '';
        this.description = '';
        this.oferta=true;
        this.fotito = 0;
    }
}