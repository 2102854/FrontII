import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientsNewComponent } from './patients_new/patients_new.component';
import { PatientsUpdateComponent }  from './patients_update/patients_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PatientsComponent },
        { path: 'create', component: PatientsNewComponent },
        { path: 'update/:id', component: PatientsUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }