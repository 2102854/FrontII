import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadosComponent } from './estados/estados.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstadosComponent },
        //{ path: 'create', component: PaisesNewComponent },
        //{ path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class EstadosRoutingModule { }