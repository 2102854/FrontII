import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { HospitalsListComponent } from './hospitals-list/hospitals-list.component';

//import { PaisesNewComponent } from './paises_new/paises_new.component';
//import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HospitalsComponent },
        { path: '', component: HospitalsListComponent },
      //  { path: 'create', component: PaisesNewComponent },
      //  { path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class HospitalsRoutingModule { }