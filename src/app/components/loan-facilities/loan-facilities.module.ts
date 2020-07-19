import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { LoanFacilitiesComponent } from './loan-facilities.component';

const routesConfig: Routes = [
    { path: 'thiet-bi-cap-phat', component: LoanFacilitiesComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [LoanFacilitiesComponent]
})

export class LoanFacilitiesModule {}
