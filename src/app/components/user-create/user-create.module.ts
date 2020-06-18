import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { UserCreateComponent } from './user-create.component';

const routesConfig: Routes = [
  // { path: 'tao-tai-khoan', component: UserCreateComponent, canActivate: [AuthGuard]}
  { path: 'tao-tai-khoan', component: UserCreateComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [UserCreateComponent]
})

export class UserCreateModule { }
