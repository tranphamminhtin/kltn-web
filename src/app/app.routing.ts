import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformationModule } from './components/information/information.module';
import { LoginComponent } from './components/login/login.component';
import { FacilitiesModule } from './components/facilities/facilities.module';
import { FacilitiesCreateModule } from './components/facilities-create/facilities-create.module';
import { FacilitiesTypeModule } from './components/facilities-type/facilities-type.module';
import { RoomModule } from './components/room/room.module';
import { UnitModule } from './components/unit/unit.module';
import { UserCreateModule } from './components/user-create/user-create.module';
import { UserModule } from './components/user/user.module';
import { LoanFacilitiesCreateModule } from './components/loan-facilities-create/loan-facilities-create.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanFacilitiesModule } from './components/loan-facilities/loan-facilities.module';
import { LoanFacilitiesUpdateModule } from "./components/loan-facilities-update/loan-facilities-update.module";
// import { LoginModule } from "./components/login/login.module";
import { VoteModule } from './components/vote/vote.module';

const routesConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '/information', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FacilitiesModule,
    FacilitiesCreateModule,
    FacilitiesTypeModule,
    LoanFacilitiesModule,
    LoanFacilitiesCreateModule,
    LoanFacilitiesUpdateModule,
    RoomModule,
    UnitModule,
    UserModule,
    UserCreateModule,
    InformationModule,
    VoteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routesConfig),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
