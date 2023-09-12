import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotoristasComponent } from './motoristas/motoristas.component';
//import { CidadesNewComponent } from './cidades_new/cidades_new.component';
//import { CidadesUpdateComponent }  from './cidades_update/cidades_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MotoristasComponent },
        //{ path: 'create', component: CidadesNewComponent },
        //{ path: 'update/:id', component: CidadesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class MotoristasRoutingModule { }