import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';
import { FacilitiesComponent } from './facilities.component';

const routesConfig: Routes = [
    // { path: 'thiet-bi', component: FacilitiesComponent, canActivate: [AuthGuard]}
    { path: 'thiet-bi', component: FacilitiesComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FacilitiesComponent]
})

export class FacilitiesModule {}
