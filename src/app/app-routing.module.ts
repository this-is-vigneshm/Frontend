import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetCreateComponent } from './components/asset-create/asset-create.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { CreateFacilityComponent } from './components/create-facility/create-facility.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RaiseRequestComponent } from './components/raise-request/raise-request.component';
import ReportsComponent from './components/reports/reports.component';
import { ReportsComponent1 } from './components/reports1/reports1.component';
import { ReportsComponent2 } from './components/reports2/reports2.component';
import { BubbleReportComponent } from './components/bubble-report/bubble-report.component';
import { ReportsTableComponent } from './components/reports-table/reports-table.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { KnowledgeRepoComponent } from './components/knowledge-repo/knowledge-repo.component';
import { CreateRepoComponent } from './components/create-repo/create-repo.component';
import { ResourcelistComponent } from './components/resourcelist/resourcelist.component';
import { ResourceplannerComponent } from './components/resourceplanner/resourceplanner.component';
import { CreateresourceComponent } from './components/createresource/createresource.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { WorkorderComponent } from './components/workorder/workorder.component';
import { MyworkorderComponent } from './components/myworkorder/myworkorder.component';
import { CreateWorkorderComponent } from './components/create-workorder/create-workorder.component';
import { ViewWorkorderComponent } from './components/view-workorder/view-workorder.component';
import { LocationComponent } from './components/location/location.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { BuildingCreateComponent } from './components/building-create/building-create.component';
import { FloorCreateComponent } from './components/floor-create/floor-create.component';
import { RoomCreateComponent } from './components/room-create/room-create.component';
import { AreaCreateComponent } from './components/area-create/area-create.component';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { FloorListComponent } from './components/floor-list/floor-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { UpdateResourceComponent } from './components/update-resource/update-resource.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'assets/create', component: AssetCreateComponent },
  { path: 'assets', component: AssetListComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/open', component: TicketsComponent },
  { path: 'tickets/self', component: TicketsComponent },
  { path: 'tickets/create', component: CreateTicketComponent },
  {path:'workorder/create', component: CreateWorkorderComponent},
  {path:'view-workorder', component: ViewWorkorderComponent},
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'facilities/create', component: CreateFacilityComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: UserRegisterComponent },
  { path: 'users', component: EmployeeListComponent },
  { path: 'raise-issue', component: RaiseRequestComponent },
  { path: 'knowledge-repos', component: KnowledgeRepoComponent },
  { path: 'create-repo', component: CreateRepoComponent },
  { path: 'resourcelist', component: ResourcelistComponent },
  { path: 'resourceplanner', component: ResourceplannerComponent },
  { path: 'createresource', component: CreateresourceComponent },
  { path: 'reports', component: ReportsComponent },
  {path:'inventory/create', component: InventoryCreateComponent},
  {path:'inventory', component: InventoryListComponent},
  { path:'myworkorder',component:MyworkorderComponent},
  { path:'workorder', component: WorkorderComponent},
  {path:'reports', component: ReportsComponent},
  {path:'reports1', component: ReportsComponent1},
  {path:'reports2', component: ReportsComponent2},
  {path:'bubble-report', component: BubbleReportComponent},
  {path:'reports-table', component: ReportsTableComponent},
  {path:'create-location', component: LocationComponent},
  {path:'location-list', component: LocationListComponent},
  {path:'floor-create', component:FloorCreateComponent},
  {path:'building-create', component:BuildingCreateComponent},
  {path:'room-create', component:RoomCreateComponent},
  {path:'area-create', component:AreaCreateComponent},
  {path:'building-list',component: BuildingListComponent},
  {path:'floor-list',component: FloorListComponent},
  {path:'room-list' ,component:RoomListComponent},
  {path:'area-list',component:AreaListComponent},
  {path:'resource-list', component : ResourceListComponent},
  { path :'update-resource', component : UpdateResourceComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
