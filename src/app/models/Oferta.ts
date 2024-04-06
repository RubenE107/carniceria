export class Oferta{
    id: number;
    id_producto: number;
    precio_original : number;
    descuento: number;
    fecha_inicio: string;
    fecha_final: string;
    nombre_producto: string
    constructor() {
        this.id = 0;
        this.id_producto=0
        this.precio_original=0
        this.descuento=0
        this.fecha_inicio=""
        this.fecha_final=""
        this.nombre_producto=""
    }
}