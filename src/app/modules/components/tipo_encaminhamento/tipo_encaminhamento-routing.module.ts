import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tipo_EncaminhamentoComponent } from './tipo_encaminhamento/tipo_encaminhamento.component';
import { Tipo_EncaminhamentoNewComponent } from './tipo_encaminhamento_new/tipo_encaminhamento_new.component';
import { Tipo_EncaminhamentoUpdateComponent }  from './tipo_encaminhamento_update/tipo_encaminhamento_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tipo_EncaminhamentoComponent },
        { path: 'create', component: Tipo_EncaminhamentoNewComponent },
        { path: 'update/:id', component: Tipo_EncaminhamentoUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class Tipo_EncaminhamentoRoutingModule { }