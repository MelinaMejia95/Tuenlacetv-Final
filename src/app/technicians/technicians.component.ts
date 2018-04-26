import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { TechniciansService } from '../services/technicians.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import {IMyDpOptions, IMyDateModel, IMyInputFocusBlur, IMyDate} from 'mydatepicker';
import { Techs } from './technician'

declare let jQuery:any;

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  toogleDelete:boolean = false; toogleArticle: boolean = true;
  technicians: any[] = []; techEdit: any; concepts: any; rates: any; techs: any; employee: any; groups: any; articles: any; details: any[] = [];
  valor: number; porIva: number; valorIva: number = 0; valorSinIva: number = 0; total: number = 0; cantidad: number ; groupAdd: any; articleAdd: any;
  detailEdit: any[] =[]; techsLenght: any; auxArray: any[] = []; techDetail: number; param_corte: string; param_instalacion: string; param_rco: string;
  param_retiro: string; switchAlert: number; response: string; editDetail: number; modelDate: any; disabled: boolean = true; disabled2: boolean = true;

  rForm: FormGroup;
  orderForm: FormGroup;
  titleAlert: string = "Campo requerido";

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  private selDate2: IMyDate = {year: 0, month: 0, day: 0};

  /**
   * @type {Techs[]} 
   */
  count: Techs[];

  /**
   * @type {Techs} 
   */

  filter: Techs = new Techs();

  /**
   * @type {number} 
   */
  numberOfTechs: number;

  /**
   * @type {number} 
   */
  limit: number;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private _techservice: TechniciansService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'grupoArticulos': [null, Validators.required],               
      'articulos': [null, Validators.required],
      'valor': [null, Validators.required],
      'cantidad': [null, Validators.required],
      'porIva': [null, Validators.required],
      'iva': [null],      
    })

    this.orderForm = fb.group({ 
      'fechaven': [null, Validators.required],
      'empleado': [null, Validators.required],
      'observaciones': [null, Validators.required],
      'solucion': [null, Validators.required],      
    })

    let date = new Date();
    this.modelDate = {date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
      }

  }

  ngOnInit() {
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal();
    this._techservice.getTechs().subscribe(data => {
      console.log(data)
      this.technicians= data.ordenes;
      this.groups = data.grupos;
      this.articles = data.articulos;
      this.param_corte = data.param_corte;
      this.param_instalacion = data.param_instalacion;
      this.param_rco = data.param_rco;
      this.param_retiro = data.param_retiro;
    });
    this._techservice.getTechsFilter().subscribe(
      (count: Techs[]) => {
        this.count = count;
        this.numberOfTechs = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#tiposervicioEdit').prop('disabled',true);
      jQuery('#nombreEdit').prop('disabled',true);
     }});
     jQuery('#registros').on('change', () => {
      this.config.itemsPerPage = Number(jQuery('#registros').val()); 
      console.log(jQuery('#registros').val());
      if (jQuery('#registros').val() == '10') {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      } else {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      }
    })
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  openModal (tech) {
    this.disabled = true;
    this.disabled2 = true;    
    this.editDetail = 0;
    this.valorIva = 0;
    this.techEdit = tech;
    this.techsLenght = tech.detalle;
    this.selDate = this.techEdit.fechatrn;
    console.log(tech)
    for (let i = 0; i < this.techsLenght.length; i++) {
      this.details[i] = {'id': i,'articulo':this.techsLenght[i]['articulo'], 'cantidad':this.techsLenght[i]['cantidad'], 'grupo':this.techsLenght[i]['grupo'],
                        'iva':this.techsLenght[i]['iva'], 'porIva':this.techsLenght[i]['porIva'], 'total':this.techsLenght[i]['total'], 
                        'valor':this.techsLenght[i]['valor']}
     // console.log(this.details[i]);
    }

    if (this.techsLenght.length == 0) {
      this.techDetail = 0;
    } else{
      this.techDetail = 1;      
    }
    
    this._techservice.getInfoTechs().subscribe(data => {
      console.log(data)
      this.concepts = data.conceptos;
      this.rates = data.tarifas;
      this.techs = data.tecnicos;
      this.employee = data.empleados;
    });
    
    switch (this.techEdit.abreviatura){
      case 'INT' || 'INI' : {
        if (this.param_instalacion == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'COT' || 'COI' : {
        if (this.param_corte == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'RCT' || 'RCI' : {
        if (this.param_rco == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'RET' || 'RTI' : {
        if (this.param_retiro == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
    } 

    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(tech){
    this.techEdit = tech;
  }
  
  selectDetail(detail) {
    this.detailEdit = detail;
  }

  editOrder () {
    if (this.switchAlert == 1) {
      swal({
        title: '¿Desea cobrar días?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
            this.response = 'S';
           } else{
             this.response = 'N';
           }
           console.log(this.response) 
        
      })
    }
    if(this.response){
      this._techservice.updateOrder({/* 'codigo': this.conceptEdit.codigo, 'servicio_id': this.concept, 'id': this.conceptEdit.id, 'nombre': this.conceptEdit.nombre, 'abreviatura': this.conceptEdit.abreviatura,
      'porcentajeIva': this.conceptEdit.porcentajeIva, 'operacion': this.conceptEdit.operacion,  
      'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db') */}).subscribe(
      data => {
        console.log(data)
        if ( data.status == "updated") {
          swal({
            title: 'Registro actualizado con éxito',
            text: '',
            type: 'success',
            onClose: function reload() {
              location.reload();
            }
          })
        } else {
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        }
      },
      error => {
        console.log(error._body)
        if ( error._body == `{"codigo":["has already been taken"]}`) {
          swal(
            'El código ya existe',
            '',
            'warning'
          )
        }
      }
      );
    }
  }

  addDetail(post){
    console.log(post.cantidad)
    this.total = Number(post.valor) * Number(post.cantidad)
    for(let i = 0; i < this.groups.length ; i++) {
      if (post.grupoArticulos == this.groups[i]['id']){
        this.groupAdd = this.groups[i]['descripcion'];
        console.log(this.groupAdd)
      }
    }
    for(let i = 0; i < this.articles.length ; i++) {
      if (post.articulos == this.articles[i]['id']){
        this.articleAdd = this.articles[i]['nombre'];
        console.log(this.articleAdd)
      }
    }
    this.details[this.details.length] = {'articulo': this.articleAdd, 'cantidad': post.cantidad, 'grupo': this.groupAdd,
                                        'iva': post.iva, 'porIva': post.porIva, 'total': this.total, 'valor': post.valor}
  }

  removeDetail() {
    this.auxArray = [];
    let j = 0;
    for (let i = 0; i < this.details.length; i++) {
      if(this.detailEdit['id'] != this.details[i]['id']){
        console.log('entro detail')
        this.auxArray[j] = this.details[i]
        j++;
      }
    }
    this.details = this.auxArray;
    console.log(this.details)
  }

  changeData(){
    this.valorSinIva = 0;
    this.valorIva = 0;
    this.valorSinIva = Number(this.valor / (this.porIva / 100 + 1));
    this.valorIva = Math.round(this.valor - this.valorSinIva);
  }

  validateDetail() {
    jQuery('#btn-detail').prop('disabled', false);    
    if (this.rForm.valid == true) {
      jQuery('#btn-detail').prop('disabled', false);
      console.log('btn dis')
    } else {
      jQuery('#btn-detail').prop('disabled', true)      
    }
  }

  deleteOrder() {
    swal({
      title: '¿Desea anular la orden?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.techEdit) {
          this._techservice.deleteOrder(this.techEdit.id).subscribe(
            data => {
              console.log(data)
              if ( data.status == "anulado") {
                swal({
                  title: 'Orden anulada con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else if ( data.error == "no se pudo anular orden") {
                swal(
                  'No se pudo anular la orden',
                  '',
                  'warning'
                )
              }
            },
          error =>{
            swal(
              'No se pudo anular el pago',
              '',
              'warning'
            )
          })
        } 
      }
    })
  }
  
  selectArticle() {
    for (let i = 0; i < this.articles.length ; i++) {
      if(jQuery('#articles').val() == this.articles[i]['id']){
        this.valor = Number(this.articles[i]['costo']);
        this.porIva = Number(this.articles[i]['porcentajeIva']);
        console.log(this.valor);
        console.log(this.porIva);
      }
    }
    this.valorSinIva = Number(this.valor / (this.porIva / 100 + 1));
    console.log(this.valorSinIva)
    this.valorIva = Math.round(this.valor - this.valorSinIva);
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    
    if (radios[0].checked){
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = false;
        rows[i].setAttribute("style", "background-color : none");
      }
    }
  }

  selectRow() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');

    if (this.toogleDelete == true) {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        this.toogleDelete = true;
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  selectRowDetail() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows-detail');
    var check = <HTMLInputElement><any>document.getElementsByName('group3');
    var cantidad = document.getElementsByName('group3');

    if (this.toogleArticle == true) {
      document.getElementById('btn-remove-detail').setAttribute('style', 'visibility: hidden');
      this.toogleArticle = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        this.toogleArticle = true;
        document.getElementById('btn-remove-detail').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  edit () {
    jQuery('.select-edit').prop('disabled', false);
    this.editDetail = 1;
    this.disabled2 = false;
  }

}
