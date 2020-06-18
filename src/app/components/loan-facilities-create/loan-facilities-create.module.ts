import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { LoanFacilitiesCreateComponent } from './loan-facilities-create.component';

const routesConfig: Routes = [
    // { path: 'them-cap-phat/:id', component: LoanFacilitiesCreateComponent, canActivate: [AuthGuard]}
    { path: 'them-cap-phat/:id', component: LoanFacilitiesCreateComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [LoanFacilitiesCreateComponent]
})

export class LoanFacilitiesCreateModule {}
