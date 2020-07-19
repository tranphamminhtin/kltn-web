import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';
import { FacilitiesTypeComponent } from './facilities-type.component';

const routesConfig: Routes = [
  { path: 'loai-thiet-bi', component: FacilitiesTypeComponent, canActivate: [AuthAdminGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [FacilitiesTypeComponent]
})

export class FacilitiesTypeModule { }
