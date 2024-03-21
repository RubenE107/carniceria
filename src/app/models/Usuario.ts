export class Usuario{
    id: number;
    nombre : string;
    correo: string;
    id_rol:number;
    rol:string
    contrasena: string;
    telefono: string;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.correo = '';
        this.id_rol = 0;
        this.rol ='';
        this.contrasena = '';
        this.telefono = '';
    }
}