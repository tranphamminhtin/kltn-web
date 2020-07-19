import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';
import { RoomComponent } from './room.component';

const routesConfig: Routes = [
  { path: 'phong', component: RoomComponent, canActivate: [AuthAdminGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [RoomComponent]
})

export class RoomModule { }
