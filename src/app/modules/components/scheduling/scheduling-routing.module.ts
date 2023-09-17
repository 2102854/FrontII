import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
//import { PaisesNewComponent } from './paises_new/paises_new.component';
//import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SchedulingComponent },
        //{ path: 'create', component: PaisesNewComponent },
        //{ path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class SchedulingRoutingModule { }