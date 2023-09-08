import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadosComponent } from './estados/estados.component';
import { EstadosNewComponent } from './estados_new/estados_new.component';
import { EstadosUpdateComponent} from './estados_update/estados_update.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstadosComponent },
        { path: 'create', component: EstadosNewComponent },
        { path: 'update/:id', component: EstadosUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class EstadosRoutingModule { }