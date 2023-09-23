import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tipo_RemocaoComponent } from './tipo_remocao/tipo_remocao.component';
//import { PaisesNewComponent } from './paises_new/paises_new.component';
//import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tipo_RemocaoComponent },
        //{ path: 'create', component: PaisesNewComponent },
        //{ path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class Tipos_RemocaoRoutingModule { }