export class OfertaLaboral{
    idOferta: number;
    salario: number;
    puesto: String;
    id_empresa: number;
    descripcion: String;
    horario: String;
    constructor() {
        this.idOferta = 0;
        this.salario=0;
        this.puesto=''
        this.id_empresa=0
        this.descripcion=''
        this.horario=''
    }
}