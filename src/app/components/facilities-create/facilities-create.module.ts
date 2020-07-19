import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';
import { FacilitiesCreateComponent } from './facilities-create.component';

const routesConfig: Routes = [
  { path: 'them-thiet-bi', component: FacilitiesCreateComponent, canActivate: [AuthAdminGuard] },
  { path: 'thiet-bi/:id', component: FacilitiesCreateComponent, canActivate: [AuthAdminGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [FacilitiesCreateComponent]
})

export class FacilitiesCreateModule { }
