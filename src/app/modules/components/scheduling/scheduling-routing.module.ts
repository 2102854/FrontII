import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { SchedulingNewComponent } from './scheduling-new/scheduling_new.component';
//import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SchedulingComponent },
        { path: 'create', component: SchedulingNewComponent },
        //{ path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class SchedulingRoutingModule { }