import { EmpleadoModel } from './../../models/user-interface';
import { isNullOrUndefined } from 'util';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertType } from 'sweetalert2';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CRUDComponent implements OnInit {
  constructor(
    public crudService: UserService,
    private modalService: NgbModal
  ) {}
  listadoEmpleados: any;
  listadoEmpleadosTemp: any;
  p = 1;
  modalAgregarEmpleado: any;
  modalEditarEmpleado: any;
  codu: string;
  username: string;
  firstname: string;
  lastname: string;
  filtroEmpleados: any;
  modelEmpleado = new EmpleadoModel();
  ngOnInit(): void {
    this.getDataUser();
  }

  addUser() {
    this.modelEmpleado.estado = 0;
    this.crudService.insertUser(this.modelEmpleado).subscribe((res) => {
      let estado: SweetAlertType = res.status === 200 ? 'success' : 'error';
      Swal.fire('Guardar Empleado', res.message, estado);
      if (res.status === 200) {
        this.modalAgregarEmpleado.close();
      }
      this.getDataUser();
    });
  }

  getDataUser() {
    this.crudService.getUsers().subscribe((res) => {
      this.listadoEmpleados = res;
      this.listadoEmpleadosTemp = res;
    });
  }

  updateUser() {
    this.crudService.updateUser(this.modelEmpleado).subscribe((res) => {
      let estado: SweetAlertType = res.status === 200 ? 'success' : 'error';
      Swal.fire('Actualizar Empleado', res.message, estado);
      if (res.status === 200) {
        this.modalEditarEmpleado.close();
      }
      this.getDataUser();
    });
  }

  deleteUser(numeroidentificacion) {
    Swal.fire({
      title: 'Esta seguro que desea eliminar este empleado?',
      text: 'Recuerde que una vez eliminado no se puede recuperar.!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value === true) {
        debugger;
        this.crudService.deleteUser(numeroidentificacion).subscribe(
          (res) => {
            let estado: SweetAlertType =
              res.status === 200 ? 'success' : 'error';
            Swal.fire('Eliminar Empleado', res.message, estado);
            this.getDataUser();
          },

          (err) => {
            Swal.fire(
              'Error!',
              'No se pudo eliminar correctamente, contactese con el administrador del sistema ',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }

  /* Metodos para el manejo de modales */

  /* Instancia para crear modal */
  openModalAgregarEmpleado(agregarEmpleado) {
    this.modalAgregarEmpleado = this.modalService.open(agregarEmpleado, {
      windowClass: 'globalWrapperModal',
      backdrop: 'static',
      keyboard: false,
    });
  }

  filtrarEmpleados(event) {

    this.listadoEmpleados = this.listadoEmpleadosTemp;
    let filtro = event.target.value.toLowerCase();

    if (!isNullOrUndefined(filtro) && filtro != '') {
      this.listadoEmpleados = this.listadoEmpleadosTemp.filter(
        (itemEmpleado) => {
          let nombreArray: string = itemEmpleado.nombre.toLowerCase();
          let apellidosArray: string = itemEmpleado.apellido.toLowerCase();
          let tipoidentificacionArray: string =
            itemEmpleado.tipoidentificacion.toLowerCase();
          let numeroidentificacion: string =
            itemEmpleado.numeroidentificacion.toLowerCase();
          let usuarioArray: string = itemEmpleado.usuario.toLowerCase();
          let paisArray: string = itemEmpleado.pais.toLowerCase();
          let correoArray: string = itemEmpleado.correo.toLowerCase();

          let resultadoFiltronombreArray = !isNullOrUndefined(nombreArray)
            ? nombreArray.indexOf(filtro)
            : -1;
          let resultadoFiltroapellidosArray = !isNullOrUndefined(apellidosArray)
            ? apellidosArray.indexOf(filtro)
            : -1;
          let resultadoFiltrotipoidentificacionArray = !isNullOrUndefined(
            tipoidentificacionArray
          )
            ? tipoidentificacionArray.indexOf(filtro)
            : -1;

          let resultadoFiltronumeroidentificacion = !isNullOrUndefined(
            numeroidentificacion
          )
            ? numeroidentificacion.indexOf(filtro)
            : -1;
          let resultadoFiltrousuarioArray = !isNullOrUndefined(usuarioArray)
            ? usuarioArray.indexOf(filtro)
            : -1;
          let resultadoFiltrpaisArray = !isNullOrUndefined(paisArray)
            ? paisArray.indexOf(filtro)
            : -1;
          let resultadoFiltrocorreoArray = !isNullOrUndefined(correoArray)
            ? correoArray.indexOf(filtro)
            : -1;

          return (
            resultadoFiltronombreArray != -1 ||
            resultadoFiltroapellidosArray != -1 ||
            resultadoFiltrotipoidentificacionArray != -1 ||
            resultadoFiltronumeroidentificacion != -1 ||
            resultadoFiltrousuarioArray != -1 ||
            resultadoFiltrpaisArray != -1 ||
            resultadoFiltrocorreoArray != -1
          );
        }
      );
    }
  }

  /* Instancia para editar modal */
  openModalEditarEmpleado(editarEmpleado, beanEmpleado) {
    /* Limpiado  de datos pasados */

    this.modelEmpleado = beanEmpleado;
    this.modalEditarEmpleado = this.modalService.open(editarEmpleado, {
      windowClass: 'globalWrapperModal',
      backdrop: 'static',
      keyboard: false,
    });
  }

  cerrarModalEditar() {
    this.modelEmpleado = new EmpleadoModel();
    this.getDataUser();
    this.modalEditarEmpleado.close();
  }
  cerrarModalGuardar() {
    this.modelEmpleado = new EmpleadoModel();
    this.getDataUser();
    this.modalAgregarEmpleado.close();
  }
}
