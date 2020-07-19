import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';
import { UserComponent } from './user.component';

const routesConfig: Routes = [
  { path: 'tai-khoan', component: UserComponent, canActivate: [AuthAdminGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [UserComponent]
})

export class UserModule { }
