import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tipos_DoencaComponent } from './tipo_doenca/tipo_doenca.component';
//import { PaisesNewComponent } from './paises_new/paises_new.component';
//import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tipos_DoencaComponent },
        //{ path: 'create', component: PaisesNewComponent },
        //{ path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class Tipos_DoencaRoutingModule { }