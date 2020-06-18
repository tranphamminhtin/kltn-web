import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { VoteComponent } from './vote.component';

const routesConfig: Routes = [
  // { path: 'danh-gia/:id', component: VoteComponent, canActivate: [AuthGuard]}
  { path: 'danh-gia/:id', component: VoteComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routesConfig)
  ],
  declarations: [VoteComponent]
})

export class VoteModule { }
