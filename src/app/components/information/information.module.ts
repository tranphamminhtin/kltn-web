import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformationComponent } from './information.component';
import { AuthGuard } from '../../guards/auth.guard';

const routesConfig: Routes = [
    // { path: 'information', component: InformationComponent, canActivate: [AuthGuard]}
    { path: 'information', component: InformationComponent}
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [InformationComponent],
    exports: [RouterModule]
})

export class InformationModule {}
