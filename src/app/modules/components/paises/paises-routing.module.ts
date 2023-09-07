import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaisesComponent } from './paises/paises.component';
import { PaisesNewComponent } from './paises_new/paises_new.component';
import { PaisesUpdateComponent }  from './paises_update/paises_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PaisesComponent },
        { path: 'create', component: PaisesNewComponent },
        { path: 'update/:id', component: PaisesUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class PaisesRoutingModule { }