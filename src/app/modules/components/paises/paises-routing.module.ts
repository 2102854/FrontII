import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaisesComponent } from './paises/paises.component';
import { PaisesNewComponent } from './paises_new/paises_new.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PaisesComponent },
        { path: 'novo', component: PaisesNewComponent }

    ])],
    exports: [RouterModule]
})
export class PaisesRoutingModule { }
