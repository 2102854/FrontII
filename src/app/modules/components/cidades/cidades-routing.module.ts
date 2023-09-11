import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CidadesComponent } from './cidades/cidades.component';
//import { CidadesNewComponent } from './cidades_new/cidades_new.component';
//import { CidadesUpdateComponent }  from './cidades_update/cidades_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CidadesComponent },
        //{ path: 'create', component: CidadesNewComponent },
        //{ path: 'update/:id', component: CidadesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class CidadesRoutingModule { }