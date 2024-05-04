import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { HospitalsListComponent } from './hospitals-list/hospitals-list.component';
import { HospitalsNewComponent } from './hospitals_new/hospitals_new.component';
import { HospitalsUpdateComponent }  from './hospitals_update/hospitals_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HospitalsComponent },
        { path: '', component: HospitalsListComponent },
        { path: 'create', component: HospitalsNewComponent },
        { path: 'update/:id', component: HospitalsUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class HospitalsRoutingModule { }