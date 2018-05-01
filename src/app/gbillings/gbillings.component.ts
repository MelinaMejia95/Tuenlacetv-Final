import { Component, OnInit } from '@angular/core';
import { GBillingsService } from '../services/gbillings.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import swal from 'sweetalert2';
import { ExcelService } from '../services/excel.service';
import { GBillings } from './gbillings';

declare let jQuery:any;

@Component({
  selector: 'app-gbillings',
  templateUrl: './gbillings.component.html',
  styleUrls: ['./gbillings.component.css']
})
export class GbillingsComponent implements OnInit {

  toogleDelete:boolean = false;
  gbillings: any[] = [];
  gbillingEdit: any; model1: any; model2: any;

  printForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {GBillings[]} 
   */
  count: GBillings[];

  /**
   * @type {GBillings} 
   */

  filter: GBillings = new GBillings();

  /**
   * @type {number} 
   */
  numberOfGBillings: number;

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

  constructor(private _gbillingservice: GBillingsService, private fb: FormBuilder, private excelService: ExcelService) {

    this.printForm = fb.group({
      'fechainicio': [null, Validators.required],
      'fechafin': [null, Validators.required],           
    })

   }

  ngOnInit() {
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
        console.log('entro')
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      }
      console.log(jQuery( window ).width());
    })
    this._gbillingservice.getGbillings().subscribe(data => {
      this.gbillings = data.facturaciones;
    });
    this._gbillingservice.getGBillingsFilter().subscribe(
      (count: GBillings[]) => {
        this.count = count;
        this.numberOfGBillings = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#registros').on('change', () => {
      this.config.itemsPerPage = Number(jQuery('#registros').val()); 
      console.log(jQuery('#registros').val());
      if (jQuery('#registros').val() == '10') {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      } else {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      }
    })
    jQuery('#modal-imprimir').modal();    
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  onDatePrint(event) {
    this.model1 = event.formatted ;
  }

  onDatePrint2(event) {
    this.model2 = event.formatted ;
  }

  resetForms() {
    this.printForm.reset();
  }

  exportToExcel(post){
    this._gbillingservice.downloadGBillings({'fechaini': this.model1, 'fechafin': this.model2 ,
                                             'db': localStorage.getItem('db')}).subscribe(data => {
        this.excelService.exportAsExcelFile(data, 'Facturaciones');
      });
      this.printForm.reset();
    }

  selectData(bill){
    this.gbillingEdit = bill;
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    
    if (radios[0].checked){
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
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
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        console.log('false');
        this.toogleDelete = true;
        //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }


}
