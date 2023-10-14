import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tipos_DoencaComponent } from './tipo_doenca/tipo_doenca.component';
import { Tipos_DoencaNewComponent } from './tipo_doenca_new/tipo_doenca_new.component';
import { Tipos_DoencaUpdateComponent }  from './tipo_doenca_update/tipo_doenca_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: Tipos_DoencaComponent },
        { path: 'create', component: Tipos_DoencaNewComponent },
        { path: 'update/:id', component: Tipos_DoencaUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class Tipos_DoencaRoutingModule { }