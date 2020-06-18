import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { VoteCreateComponent } from './vote-create.component';

const routesConfig: Routes = [
  // { path: 'them-danh-gia/:id', component: VoteComponent, canActivate: [AuthGuard]}
  { path: 'them-danh-gia/:id', component: VoteCreateComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [VoteCreateComponent]
})

export class VoteCreateModule { }
