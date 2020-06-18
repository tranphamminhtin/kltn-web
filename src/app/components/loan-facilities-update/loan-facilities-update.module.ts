import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { LoanFacilitiesUpdateComponent } from './loan-facilities-update.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

const routesConfig: Routes = [
    // { path: 'them-cap-phat/:id', component: LoanFacilitiesCreateComponent, canActivate: [AuthGuard]}
    { path: 'sua-cap-phat/:id', component: LoanFacilitiesUpdateComponent},
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgxQRCodeModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [LoanFacilitiesUpdateComponent]
})

export class LoanFacilitiesUpdateModule {}
