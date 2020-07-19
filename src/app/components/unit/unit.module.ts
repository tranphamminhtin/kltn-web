import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';
import { UnitComponent } from './unit.component';

const routesConfig: Routes = [
  { path: 'don-vi', component: UnitComponent, canActivate: [AuthAdminGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [UnitComponent]
})

export class UnitModule { }
