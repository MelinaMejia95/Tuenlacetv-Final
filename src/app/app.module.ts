import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { SubsFilterPipe } from './subscriber/subs-filter.pipe';
import { CountriesFilterPipe } from './countries/countries-filter.pipe';
import { DepartmentsFilterPipe } from './departments/deps-filter.pipe';
import { CitiesFilterPipe } from './cities/cities-filter.pipe';
import { CompaniesFilterPipe } from './company/company-filter.pipe';
import { BanksFilterPipe } from './banks/banks-filter.pipe';
import { ZonesFilterPipe } from './zones/zones-filter.pipe';
import { NeighsFilterPipe } from './neighborhoods/neighs-filter.pipe';
import { ConceptsFilterPipe } from './concepts/concepts-filter.pipe';
import { PlansFilterPipe } from './plans/plans-filter.pipe';
import { RatesFilterPipe } from './rates/rates-filter.pipe';
import { BillsFilterPipe } from './bills/bills-filter.pipe';
import { UsersFilterPipe } from './users/users-filter.pipe';
import { PaymentsFilterPipe } from './payment/payments-filter.pipe';
import { TechsFilterPipe } from './technicians/technicians-filter.pipe';
import { AdPaymentsFilterPipe } from './advancepayments/adpayments-filter.pipe';
import { GBillingsFilterPipe } from './gbillings/gbillings-filter.pipe';

//import swal from 'sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { ZonesService } from './services/zones.service';
import { NeighborhoodsService } from './services/neighborhoods.service';
import { BanksService } from './services/banks.service';
import { RatesService } from './services/rates.service';
import { ConceptsService } from './services/concepts.service';
import { PlansService } from './services/plan.service';
import { UsersService } from './services/users.service';
import { SubscribersService } from './services/subscribers.service';
import { BillService } from './services/bills.service';
import { ExcelService } from './services/excel.service';
import { CompaniesService } from './services/companies.service';
import { DepartmentsService } from './services/departments.service';
import { GBillingsService } from './services/gbillings.service';
import { AutoBillsService } from './services/autobills.service';
import { PaymentsService } from './services/payment.service';
import { TechniciansService } from './services/technicians.service';
import { AppGlobals } from './shared/app.global';
import { NavbarComponent } from './navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';
import { NavbarPrincipalComponent } from './navbar-principal/navbar-principal.component';
import { CitiesComponent } from './cities/cities.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { FooterComponent } from './footer/footer.component';
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { BanksComponent } from './banks/banks.component';
import { CompanyComponent } from './company/company.component';
import { RatesComponent } from './rates/rates.component';
import { ConceptsComponent } from './concepts/concepts.component';
import { PlansComponent } from './plans/plans.component';
import { UsersComponent } from './users/users.component';
import { BillsComponent } from './bills/bills.component';
import { DepartmentsComponent } from './departments/departments.component';
import { GbillingsComponent } from './gbillings/gbillings.component';
import { AutomaticbillsComponent } from './automaticbills/automaticbills.component';
import { PaymentComponent } from './payment/payment.component';
import { AdvancepaymentsComponent } from './advancepayments/advancepayments.component';
import { TechniciansComponent } from './technicians/technicians.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PrincipalComponent,
    NavbarPrincipalComponent,
    CitiesComponent,
    SubscriberComponent,
    FooterComponent,
    CountriesComponent,
    ZonesComponent,
    NeighborhoodsComponent,
    BanksComponent,
    CompanyComponent,
    RatesComponent,
    ConceptsComponent,
    PlansComponent,
    UsersComponent,
    BillsComponent,
    DepartmentsComponent,
    GbillingsComponent,
    AutomaticbillsComponent,
    PaymentComponent,
    AdvancepaymentsComponent,
    TechniciansComponent,
    SubsFilterPipe,
    CountriesFilterPipe,
    DepartmentsFilterPipe,
    CitiesFilterPipe,
    CompaniesFilterPipe,
    BanksFilterPipe,
    ZonesFilterPipe,
    NeighsFilterPipe,
    ConceptsFilterPipe,
    PlansFilterPipe,
    RatesFilterPipe,
    BillsFilterPipe,
    UsersFilterPipe,
    PaymentsFilterPipe,
    TechsFilterPipe,
    AdPaymentsFilterPipe,
    GBillingsFilterPipe
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  AppRoutingModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  MyDatePickerModule,
  NgxPaginationModule,
  LoadingModule.forRoot({
    backdropBackgroundColour: 'rgba(255, 255, 255, 0.2)', 
    //backdropBorderRadius: '4px',
    primaryColour: '#468EBC', 
    secondaryColour: '#468EBC', 
    tertiaryColour: '#468EBC'
})
  ],
  providers: [ LoginService, AppGlobals, CountriesService, CitiesService, ZonesService, NeighborhoodsService,
              BanksService, RatesService, ConceptsService, PlansService, UsersService, SubscribersService, BillService,
              CompaniesService, ExcelService, DepartmentsService, GBillingsService, AutoBillsService, PaymentsService,
              TechniciansService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
