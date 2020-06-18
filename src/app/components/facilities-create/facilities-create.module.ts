import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { FacilitiesCreateComponent } from './facilities-create.component';

const routesConfig: Routes = [
  // { path: 'tao-thiet-bi', component: FacilitiesCreateComponent, canActivate: [AuthGuard]}
  { path: 'them-thiet-bi', component: FacilitiesCreateComponent },
  { path: 'thiet-bi/:id', component: FacilitiesCreateComponent }
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
