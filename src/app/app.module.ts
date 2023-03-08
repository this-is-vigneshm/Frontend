import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { DemoNgZorroAntdModule } from '../../src/app/ng-zorro-antd.module';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetCreateComponent } from './components/asset-create/asset-create.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { CreateFacilityComponent } from './components/create-facility/create-facility.component';
import { RaiseRequestComponent } from './components/raise-request/raise-request.component';
import { KnowledgeRepoComponent } from './components/knowledge-repo/knowledge-repo.component';
import { UpdateTicketStatusComponent } from './components/update-ticket-status/update-ticket-status.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { ResourcelistComponent } from './components/resourcelist/resourcelist.component';
import { ResourceplannerComponent } from './components/resourceplanner/resourceplanner.component';
import { CreateresourceComponent } from './components/createresource/createresource.component';
import { WorkorderComponent } from './components/workorder/workorder.component';
import { CreateWorkorderComponent } from './components/create-workorder/create-workorder.component';
import { MyworkorderComponent } from './components/myworkorder/myworkorder.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import ReportsComponent from './components/reports/reports.component';
import { ReportsComponent1 } from './components/reports1/reports1.component';
import { ReportsComponent2 } from './components/reports2/reports2.component';
import { BubbleReportComponent } from './components/bubble-report/bubble-report.component';
import { ReportsTableComponent } from './components/reports-table/reports-table.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { UpdatewostatusComponent } from './components/updatewostatus/updatewostatus.component';
import { ViewWorkorderComponent } from './components/view-workorder/view-workorder.component';
import { LocationComponent } from './components/location/location.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { BuildingCreateComponent } from './components/building-create/building-create.component';
import { FloorCreateComponent } from './components/floor-create/floor-create.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { FloorListComponent } from './components/floor-list/floor-list.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    AssetListComponent,
    AssetCreateComponent,
    UserRegisterComponent,
    CreateTicketComponent,
    EmployeeListComponent,
    HomeComponent,
    NavigatorComponent,
    TicketsComponent,
    FacilitiesComponent,
    CreateFacilityComponent,
    RaiseRequestComponent,
    KnowledgeRepoComponent,
    UpdateTicketStatusComponent,
    CreateRepoComponent,
    ResourcelistComponent,
    ResourceplannerComponent,
    CreateresourceComponent,
    WorkorderComponent,
    CreateWorkorderComponent,
    MyworkorderComponent,
    InventoryCreateComponent,
    InventoryListComponent,
    CreateRepoComponent,
    ReportsComponent, 
    ReportsComponent1, 
    ReportsComponent2, 
    ReportsTableComponent,
    BubbleReportComponent,
    UpdatewostatusComponent,
    ViewWorkorderComponent,
    LocationComponent,
    LocationListComponent,
    BuildingCreateComponent,
    FloorCreateComponent,
    RoomCreateComponent,
    AreaCreateComponent,
    BuildingListComponent,
    FloorListComponent,
    AreaListComponent,
    RoomListComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzBreadCrumbModule,
    DemoNgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    // { provide: HTTP_INTERCEPTORS, useClass: RestInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
