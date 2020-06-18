import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { UnitComponent } from './unit.component';

const routesConfig: Routes = [
  // { path: 'don-vi', component: UnitComponent, canActivate: [AuthGuard] }
  { path: 'don-vi', component: UnitComponent }
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
