import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tipo_RemocaoComponent } from './tipo_remocao/tipo_remocao.component';
import { Tipo_RemocaoUpdateComponent } from './tipo_remocao_update/tipo_remocao_update.component';
import { Tipo_RemocaoNewComponent } from './tipo_remocao_new/tipo_remocao_new.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tipo_RemocaoComponent },
        { path: 'create', component: Tipo_RemocaoNewComponent},
        { path: 'update/:id', component: Tipo_RemocaoUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class Tipos_RemocaoRoutingModule { }