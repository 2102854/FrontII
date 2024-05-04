import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { MotoristasNewComponent } from './motoristas_new/motoristas_new.component';
import { MotoristasUpdateComponent }  from './motoristas_update/motoristas_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MotoristasComponent },
        { path: 'create', component: MotoristasNewComponent },
        { path: 'update/:id', component: MotoristasUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class MotoristasRoutingModule { }