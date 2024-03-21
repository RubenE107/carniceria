import { Component, OnInit } from '@angular/core';
import { OfertaLaboral } from 'src/app/models/OfertaLaboral';
import { OfertaLaboralService } from 'src/app/services/oferta-laboral.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html',
  styleUrls: ['./oferta-laboral.component.css']
})
export class OfertaLaboralComponent implements OnInit {
  ofertas: OfertaLaboral[] = [];
  oferta: OfertaLaboral = new OfertaLaboral();
  ofertaNueva: OfertaLaboral = new OfertaLaboral();

  constructor(private ofertaService: OfertaLaboralService) {
  
}
  ngOnInit(): void {
      this.initDatepicker();
      this.ofertaService.list().subscribe((resOfertas: any) => {
          this.ofertas = resOfertas;
          console.log("hola mundo",resOfertas);
      }, err => console.error(err));
  }
  actualizarOferta(id_oferta: any) {
      this.ofertaService.listOne(id_oferta).subscribe((resOferta: any) => {
          this.oferta = resOferta;
          console.log(this.oferta)
          $('#modalModificarOferta').modal();
          $("#modalModificarOferta").modal("open");
      }, err => console.error(err));
  }
  guardarActualizarOferta() {
      this.ofertaService.actualizarOferta(this.oferta).subscribe((res) => {
          $('#modalModificarOferta').modal('close');
          this.ofertaService.list().subscribe((resOfertas: any) => {
              this.ofertas = resOfertas;
          }, err => console.error(err));
          Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Plan Actualizado'
          })
      }, err => console.error(err));
  }
  crearOferta() {
      this.ofertaNueva = new OfertaLaboral();
      console.log("oferta nueva")
      $('#modalCrearOferta').modal();
      $("#modalCrearOferta").modal("open");
  }
  guardarNuevaOferta(){
      console.log("GuardandoOferta")
      this.ofertaService.crearOferta(this.ofertaNueva).subscribe((res) => {
          $('#modalCrearOferta').modal('close');
          this.ofertaService.list().subscribe((resOfertas: any) => {
              this.ofertas = resOfertas;
          }, err => console.error(err));
          Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Plan Actualizado'
          })
      }, err => console.error(err));
  }
  eliminarOferta(id_oferta: any){
      console.log("Click en eliminar OfertaLaboral");
      console.log("Identificador del OfertaLaboral: ",id_oferta);
      Swal.fire({
        title: "¿Estás seguro de eliminar esta oferta?",
        text: "¡No es posible revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ofertaService.eliminarOferta(id_oferta).subscribe((resOferta: any) =>
          {
           console.log("resOferta: ", resOferta);
           this.ofertaService.list().subscribe((resOferta: any) =>
           {
             this.ofertas = resOferta;  
             //console.log(resOferta);
             console.log(this.ofertas)
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
          $('#fechaOferta').datepicker({
              format: "yyyy-mm-dd",
              defaultDate: date,
          });
      //}
  }



}
