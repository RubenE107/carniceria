import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from 'src/app/models/Empresa';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
    empresas: Empresa[] = [];
    empresa: Empresa = new Empresa();
    empresaNueva: Empresa = new Empresa();

    constructor(private empresaService: EmpresaService) {
    }
    ngOnInit(): void {
        this.initDatepicker();
        this.empresaService.list().subscribe((resEmpresas: any) => {
            this.empresas = resEmpresas;
        }, err => console.error(err));
    }
    actualizarEmpresa(id_empresa: any) {
        this.empresaService.listOne(id_empresa).subscribe((resEmpresa: any) => {
            this.empresa = resEmpresa;
            console.log(this.empresa)
            $('#modalModificarEmpresa').modal();
            $("#modalModificarEmpresa").modal("open");
        }, err => console.error(err));
    }
    guardarActualizarEmpresa() {
        this.empresaService.actualizarEmpresa(this.empresa).subscribe((res) => {
            $('#modalModificarEmpresa').modal('close');
            this.empresaService.list().subscribe((resEmpresas: any) => {
                this.empresas = resEmpresas;
            }, err => console.error(err));
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Plan Actualizado'
            })
        }, err => console.error(err));
    }
    crearEmpresa() {
        this.empresaNueva = new Empresa();
        console.log("empresa nueva")
        $('#modalCrearEmpresa').modal();
        $("#modalCrearEmpresa").modal("open");
    }
    guardarNuevaEmpresa(){
        console.log("GuardandoEmpresa")
        this.empresaService.crearEmpresa(this.empresaNueva).subscribe((res) => {
            $('#modalCrearEmpresa').modal('close');
            this.empresaService.list().subscribe((resEmpresas: any) => {
                this.empresas = resEmpresas;
            }, err => console.error(err));
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Plan Actualizado'
            })
        }, err => console.error(err));
    }
    eliminarEmpresa(id_empresa: any){
        console.log("Click en eliminar Empresa");
        console.log("Identificador del Empresa: ",id_empresa);
        Swal.fire({
          title: "¿Estás seguro de eliminar esta empresa?",
          text: "¡No es posible revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, quiero eliminarlo!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.empresaService.eliminarEmpresa(id_empresa).subscribe((resEmpresa: any) =>
            {
             console.log("resEmpresa: ", resEmpresa);
             this.empresaService.list().subscribe((resEmpresa: any) =>
             {
               this.empresas = resEmpresa;  
               //console.log(resEmpresa);
               console.log(this.empresas)
             },
             err => console.error(err)
             );
            }, 
            err => console.error(err)
            );
    
    
            Swal.fire({
              title: "¡Eliminado!",
              text: "Tu archivo ha sido eliminado.",
              icon: "success"
            });
          }
        });
    
    }

    initDatepicker(fecha?: any)
    {
        let date = "2024-07-26";
        //if(fecha){
            //date = new Date(fecha += 'T00:00:00');
            $('#fechaEmpresa').datepicker({
                format: "yyyy-mm-dd",
                defaultDate: date,
            });
        //}
    }

    actualizarFecha(date?: any)
    {
        if(date){
            this.empresa.fecha = date;
        }
    }
}