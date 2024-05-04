import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculosNewComponent } from './veiculos_new/veiculos_new.component';
import { VeiculosUpdateComponent }  from './veiculos_update/veiculos_update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VeiculosComponent },
        { path: 'create', component: VeiculosNewComponent },
        { path: 'update/:id', component: VeiculosUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class VeiculosRoutingModule { }